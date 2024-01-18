import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function SignUp() {
    const navigate = useNavigate();

    const [dataUsuario, setDataUsuario] = useState({
        name: "",
        email: "",
        password: "",
    });

    const changeVeiculoFieldHandler = (e) => {
        setDataUsuario({
            ...dataUsuario,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://127.0.0.1:5000/sign-up/", dataUsuario)
            navigate("/cria_token/")
        }
        catch (err) {
            console.log('algo errado')
        }

    }

    const clickToBackHandler = () => {
        navigate("/")
    }

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3 mt-4'>Cadastro de Usuário</h2>
                <div className="row">
                    <div className='col-md-12'>
                        <form>
                            <div className="mb-3 mt-3">
                                <label className="form-label"> Nome</label>
                                <input onChange={e => changeVeiculoFieldHandler(e)} type="text" value={dataUsuario.name}  className="form-control" id="name" name="name" />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label"> Email</label>
                                <input onChange={e => changeVeiculoFieldHandler(e)} type="email" value={dataUsuario.email} className="form-control" id="email" name="email" />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Senha</label>
                                <input onChange={e => changeVeiculoFieldHandler(e)} type="password" value={dataUsuario.password} className="form-control" id="password" name="password" />
                            </div>
                             
                            <button onClick={e => onSubmitChange(e)} type="button" className="btn btn-success">Cadastrar</button>
                        </form>  
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                    <div>
                        <button onClick={clickToBackHandler} className="btn btn-primary">Voltar para o catálogo</button>
                    </div>
                </div>
        </div>
    )
}

export default SignUp;