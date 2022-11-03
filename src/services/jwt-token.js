import Jwt from "./resources";
import LocalStorage from "./localStorage";

const TOKEN = 'access_token';
const PUSH = 'refresh_token';

export default {
    async getToken(){
        return await LocalStorage.get(TOKEN).then((reponse)=>{return reponse});
    },
    set token(value){
        return value ? LocalStorage.set(TOKEN, value) : LocalStorage.remove(TOKEN);
    },
    async getTokenPushe(){
        return await LocalStorage.get(PUSH).then((reponse)=>{return reponse});
    },
    set tokenPushe(value){
        return value ? LocalStorage.set(PUSH, value) : LocalStorage.remove(PUSH);
    },    
    _events: {
        'updateToken': []
    },
    async accessToken(username, password){

        return Jwt.accessToken(username, password).then((response)=>{
            console.log('response', )
            this.token = response.data.access_token;
            this.tokenPushe = response.data.refresh_token;
           // this._callEventUpdateToken(this.token);
            return response;
        }).catch((response)=>{               
           console.log("error", response)
            return false;
        });
    },
    async refreshToken(){

        return Jwt.refreshToken(
            await this.getToken().then((reponse)=>{return reponse}), 
            await this.getTokenPushe().then((reponse)=>{return reponse})
        ).then((response) => {
            
            this.token = response.data.access_token;
            this.tokenPushe = response.data.refresh_token;
           // this._callEventUpdateToken(this.token);
            return true;
        }).catch((response)=>{               
           
            return false;
        });
    },
    revokeToken(){
        let afterReveokeToken = (response) => {
            this.token = null;
            this.tokenPushe = null;
            return response;
        };

        return Jwt.logout().
            then(afterReveokeToken)
            .catch(afterReveokeToken);
    },
    async getAuthorizationHeader(){
        
        let access = "Bearer "+ await LocalStorage.get(TOKEN).then((reponse)=>{return reponse});
        return access;
    },
    event(name, callback){
        this._events[name].push(callback);
    },
    _callEventUpdateToken(value){
        for(let callback of this._events['updateToken']){
            callback(value);
        }
    }
}