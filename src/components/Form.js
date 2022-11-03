import React, { Component, useContext } from 'react';
import ClinicasContext from '../context/ClinicasContext';

export default function  Form() {
// export class Form extends Component {
  
  // render() {

    const {
      login,
      senha,
      setLogin,
      setSenha,
      getLogin
    } = useContext(ClinicasContext);

    const fnHandleSubmit = event => {
      event.preventDefault();
      
      let fornecedor = {
        "login": event.target[0].value,
        "senha": event.target[1].value,
      }

      setLogin(fornecedor.login)
      setSenha(fornecedor.senha)
      getLogin()
    }



    return(

      <div className="container d-flex ">
          <div className="row align-self-center w-100 ">
              <div className="col-6 mx-auto mt-5">
                  <div className="jumbotron mt-5">
                    <form onSubmit={fnHandleSubmit}>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Login</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Login"/>
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                      </div>
                      <div className="form-group">
                        <label for="exampleInputPassword1">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Senha"/>
                      </div>
                      {/* <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                      </div> */}
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-3 ">Logar</button>
                      </div>
                      
                    </form>
                  </div>
              </div>
          </div>
      </div>    
    )
  }

