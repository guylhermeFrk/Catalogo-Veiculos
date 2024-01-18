import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Novo = () => {
    const navigate = useNavigate();

    const [dataVeiculo, setVeiculoData] = useState({
        nome: "",
        marca: "",
        modelo: "",
        valor: "",
    });

    const changeVeiculoFieldHandler = (e) => {
        setVeiculoData({
            ...dataVeiculo,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post("http://127.0.0.1:5000/novo-veiculo/", dataVeiculo)
            navigate("/")
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
            <h2 className='w-100 d-flex justify-content-center p-3 mt-4'>Cadastrar Veículo</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <form>
                            <div className="mb-3 mt-3">
                                <label className="form-label"> Nome</label>
                                <input type="text" className="form-control" id="nome" name="nome" value={dataVeiculo.nome} onChange={e => changeVeiculoFieldHandler(e)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Marca</label>
                                <input type="text" className="form-control" id="marca" name="marca" value={dataVeiculo.marca} onChange={e => changeVeiculoFieldHandler(e)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Modelo</label>
                                <input type="text" className="form-control" id="modelo" name="modelo" value={dataVeiculo.modelo} onChange={e => changeVeiculoFieldHandler(e)} />
                            </div>
                            <div className="mb-3 mt-3">
                                <label className="form-label">Valor</label>
                                <input type="number" className="form-control" id="valor" name="valor" value={dataVeiculo.valor} onChange={e => changeVeiculoFieldHandler(e)} />
                            </div>
                             
                            <button onClick={e => onSubmitChange(e)} type="submit" className="btn btn-success">Cadastrar veículo</button>
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
};

export default Novo;