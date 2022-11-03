import axios from 'axios';
import appConfig from '../config/appConfig';

const apiJwt = axios.create({
    baseURL:appConfig.api_url+appConfig.app_vs,
    headers: {
      'Content-Type': 'application/json',
    },
});

export default {
  accessToken(username, password) {
    console.warn('username, password', username, password, appConfig.api_url + appConfig.app_vs + '/Autenticacao/login/');
	return apiJwt.post('/Autenticacao/login', {
		idUsuario: username,
		senha: password,
	}).then(response => { 
		return response
	})
	.catch(error => {
		console.log('REOUCES-accessToken-Erros',error.response, error);
	}); 
  },
  logout() {
    return apiJwt.post('/logout');
  },
  refreshToken(token, tokenPushe) {
    return apiJwt
      .post('refresh_token/', {
        access_token: token,
        refresh_token: tokenPushe,
      })
      .then(response => {
        if (response.status === 200) {
          return response;
        }
      })
      .catch(error => {
        console.log('REOUCES-accessToken-Erros', error);
      });
  },
};
