
import { useFormAction } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import './LoginPage.css';
import { useAuthStore, useForm } from '../../hooks';



// Como manejo dos forms en la misma pantalla, voy a manejar dos instancias de useForm
const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName:      '',
    registerEmail:     '',
    registerPassword:  '',
    registerPassword2: '',
}

export const LoginPage = () => {

    // Importo mi custom hook para manejar slice auth del Store
    const { startLogin, startRegister, errorMessage } = useAuthStore();

    // creo el state usado mi custom hook useForm el onInputChange debo renombrarlo xq lo uso para los
    // formularios.
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange} = useForm( loginFormFields)
    const { registerEmail, registerPassword, registerName, registerPassword2, onInputChange: onRegisterInputChange} = useForm( registerFormFields )

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword }); // (1)
    }

    const registerSubmit = ( event ) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Registration Error', 'Passwords do not match', 'error');
            return;
        }
        startRegister({ email: registerEmail, password: registerPassword, name: registerName });
        Swal.fire('User created', 'You are logged in', 'success')
    }

    useEffect(() => { // muestro un error cuando cambie el errorMessage y no sea undefined
        if ( errorMessage !== undefined ) {
            Swal.fire('Authentication Error', errorMessage, 'error');
        }
   
    }, [errorMessage]);

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-5 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange= { onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange= { onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6 login-form-2">
                    <h3>Register</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="registerName"
                                value={ registerName }
                                onChange= { onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="email"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange= { onRegisterInputChange }                              
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange= { onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repeat password" 
                                name="registerPassword2"
                                value={registerPassword2 }
                                onChange= { onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Create Account" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
  )
}

/*
(1)
Devuelvo el objeto de esta forma porque startLogin espera recibor { email y password } por esto es que 
no puedo mandar directamente loginEmail, loginPassword
*/