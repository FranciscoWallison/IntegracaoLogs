/*
 * 1 - API
 *	° Validar TOKEN
 *	 - Utilizar o "[JwtAuthentication]" do
 *      "using OdontoSystem.Digitacao.WebAPI.Authentication.Filters;"
 *	° Pegando dados do usuario
 *	 -  ClaimsPrincipal principal = Request.GetRequestContext().Principal as ClaimsPrincipal;
 *	    UsuarioSistema useraccess = digitacaoFacade.FindUsuarioByLogin(principal.Identity.Name);
 *	    Dentista dentista = digitacaoFacade.FindDentistaByCpf(useraccess.IdUsuario);
 * 2 - Cliente
 *	° Interceptors filtro para validar token
 *		- import api from '../services/interceptors';
 *	° Pegando dados da api
 *		EX: await api.post('/rota')
 */

 import axios from 'axios';
 import JwtToken from './jwt-token';
 import appConfig from '../config/appConfig';
 
 const SERVER_URL = appConfig.api_url + appConfig.app_vs;
 
 const api = axios.create({
   baseURL: SERVER_URL,
 });
 
 // Add a request interceptor
 api.interceptors.request.use(
   async config => {
     const token = await JwtToken.getAuthorizationHeader();
     if (token) {
       config.headers = {
         Authorization: token,
       };
     }
     return config;
   },
   error => {
     // I cand handle a request with errors here
     return Promise.reject(error);
   },
 );
 
api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
       originalRequest._retry = true;
 
       let token = await JwtToken.getToken().then(reponse => {
         return reponse;
       });
       let tokenPushe = await JwtToken.getTokenPushe().then(reponse => {
         return reponse;
       });
       
        //
        axios
         .post(SERVER_URL + '/Autenticacao/refresh-token', {
           access_token: token,
           refresh_token: tokenPushe,
         })
         .then(res => {
           if (res.status === 200) {
             // 1) put token to LocalStorage
             JwtToken.token = res.data.access_token;
             JwtToken.tokenPushe = res.data.refresh_token;
 
             // 2) Change Authorization header
             axios.defaults.headers.common[
               'Authorization'
             ] = JwtToken.getAuthorizationHeader();
 
             // 3) return originalRequest object with Axios.
             return axios(originalRequest);
           }
         });
     }
     return Promise.reject(error);
   },
 );
 
 export default api;
 