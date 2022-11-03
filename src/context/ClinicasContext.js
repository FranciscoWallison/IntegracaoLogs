import { createContext, useEffect, useState } from 'react';
import JwtToken from '../services/jwt-token';
import User from '../models/user';
const ClinicasContext = createContext();


export const ClinicasProvider = ({ children }) => {
    //DADOS DE LOGIN
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const getLogin = async () => {

        JwtToken.token = null;
        console.log('getLogin', login, senha )

        let response = await User.login(
            login,
            senha,
          );

        // await axios
        //     .get(API_URL + '/redes/' + paramConsultaRede.codigo)
        //     .then(res => {

        //     })
        //     .catch(e => {

        //     });
    };
return (
    <ClinicasContext.Provider
        value={{
            login,
            senha,
            setLogin,
            setSenha,
            getLogin
        }}
        >
        {children}
    </ClinicasContext.Provider>
    );
};

export default ClinicasContext;