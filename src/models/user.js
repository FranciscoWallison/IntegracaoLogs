import LocalStorage from '../services/localStorage';
import JwtToken from '../services/jwt-token';
const USER = 'User';

// Ao criar objeto definir o tipo e valor
// { x: 5, y: 6 }
// TODO: Criar class com os bjetos definidos

export default {
  async getObject() {
    let value = await LocalStorage.getObject(USER).then(reponse => {
      return reponse;
    });
    return JSON.parse(value);
  },
  setObject(value) {
    return value
      ? LocalStorage.setObject(USER, value)
      : LocalStorage.remove(USER);
  },
  async login(login, password) {
    let returnValue = await JwtToken.accessToken(login, password);


    console.log('returnValue', returnValue)
    // if (returnValue) {
    //   LocalStorage.setObject(USER, {
    //     login: login,
    //     nome: returnValue.data.name_user,
    //     id: returnValue.data.id_user,
    //     modelo: returnValue.data.modelo,
    //     id_modelo: returnValue.data.id_modelo,
    //   });
    //   return true;
    // }
    // return false;
  },
  logout() {
    LocalStorage.remove(USER);
  },
  async updateObject(data) {
    let arrayA = await this.getObject().then(reponse => {
      return reponse;
    });
    let arrayB = data;
    let arrayC = Object.assign(arrayA, arrayB); //unindo objetos
    return this.setObject(arrayC);
  },
};
