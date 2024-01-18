import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const Detalhes = () => {
    const {id} = useParams();
    const [veiculo, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () =>{
        try {
            const result = await axios.get("http://127.0.0.1:5000/detalhes-veiculo/"+id+"/")
            setData(result.data.veiculo_data)
        }
        catch (err) {
            console.log("algo errado não está certo.")
        }
    }

    const clickToBackHandler = () => {
        navigate("/")
    }

    return (
        <div className="container">
            <h2 className='w-100 d-flex justify-content-center p-3 mt-4'>Detalhes do Veículo</h2>
                <div className='row'>
                    <div className='col-md-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                                <tr>
                                    <td>{veiculo.id}</td>
                                    <td>{veiculo.nome}</td>
                                    <td>{veiculo.marca}</td>
                                    <td>{veiculo.modelo}</td>
                                    <td>R$ {veiculo.valor}</td>
                                </tr>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="container d-flex justify-content-center mt-4">
                    <div>
                        <button onClick={clickToBackHandler} className="btn btn-primary">Voltar para o catálogo</button>
                    </div>
                </div>
        </div>
    )
};

export default Detalhes;