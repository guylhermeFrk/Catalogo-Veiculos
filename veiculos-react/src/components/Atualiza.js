import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const Atualiza = () => {
    const {id} = useParams();

    const [dataVeiculo, setVeiculoData] = useState({
        nome: "",
        marca: "",
        modelo: "",
        valor: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () =>{
        try {
            const result = await axios.get("http://127.0.0.1:5000/detalhes-veiculo/"+id+"/")
            setVeiculoData(result.data.veiculo_data)
        }
        catch (err) {
            console.log("algo errado não está certo.")
        }
    }

    const changeVeiculoFieldHandler = (e) => {
        setVeiculoData({
            ...dataVeiculo,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitChange = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put("http://127.0.0.1:5000/atualiza-veiculo/"+id+"/", dataVeiculo)
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
            <h2 className='w-100 d-flex justify-content-center p-3 mt-4'>Atualizar Veículo</h2>
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
                             
                            <button onClick={e => onSubmitChange(e)} type="submit" className="btn btn-success">Atualizar veículo</button>
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

export default Atualiza;