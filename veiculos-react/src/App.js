import React from "react";

import { BrowserRouter as Router, Route, Routes, Redirect } from "react-router-dom";

import Header from "./components/Header";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import useToken from "./components/auth/useToken";

import Lista from "./components/Lista";
import Novo from "./components/Novo";
import Detalhes from "./components/Detalhes";
import Atualiza from "./components/Atualiza";

function App(){
    const { token, removeToken, setToken } = useToken();
    
    return (
        <div className="App">
            <Router>
                <Header token={removeToken} />
                <Routes>
                    {/* Rota que pode ser acessada independentemente do estado do token */}
                    <Route exact path="/cria_token/" element={<Login setToken={setToken} />} />
                    <Route exact path="/sign_up/" element={<SignUp />} />
                    <Route exact path="/" element={<Lista />} />
                    
                    {token && token !== "" && token !== undefined ? (
                        <>
                            <Route exact path="/novo_veiculo/" element={<Novo />} />
                            <Route exact path="/detalhes_veiculo/:id/" element={<Detalhes />} />
                            <Route exact path="/atualiza_veiculo/:id/" element={<Atualiza />} />
                        </>
                    ) : (
                        <Route exact path="/" element={<Lista />} />
                    )}
                </Routes>
            </Router>
        </div>
    );
}

export default App;