import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
    const navigate = useNavigate();

    let imgs = [
        'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
    ]

    const [loginForm, setLoginForm] = useState ({
        email: "",
        password: ""
    })

    function handleChange(event) {
        const {value, name} = event.target

        setLoginForm(prevNote => ({
            ...prevNote, [name]: value
        }))
    }

    function btnLogin(event) {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/login-token/",
            data: {
                email: loginForm.email,
                password: loginForm.password
            }
        })
        .then((response) => {
            alert('login efetuado com sucesso')
            props.setToken(response.data.access_token)
            localStorage.setItem('email', loginForm.email)
            navigate('/')
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 401){
                    alert('credenciais inválidas')
                }
            }
        })

        setLoginForm(({
            email: "",
            password: ""
        }))

        event.preventDefault()
    }

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3 mt-4'>Login</h2>

            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-50">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={imgs[0]} className="img-fluid"></img>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>
                            <div className="mb-3 mt-3">
                                <label className="form-label"> Email</label>
                                <input onChange={handleChange} type="email" value={loginForm.email} text={loginForm.email} className="form-control" id="email" name="email" />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Senha</label>
                                <input onChange={handleChange} type="password" value={loginForm.password} text={loginForm.password} className="form-control" id="password" name="password" />
                            </div>
                             
                            <button onClick={btnLogin} type="button" className="btn btn-success">Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Não tem uma conta? <a href="/sign_up/" className="link-primary">Registre-se</a></p>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;