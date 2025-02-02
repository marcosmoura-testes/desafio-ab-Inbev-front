import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import EmployeeRegister from './pages/employeeRegister';
import Employees from './pages/employeeList';
import Layout from './layout';  // Importe o Layout
import './App.css';

function App() {
    const isLoggedIn = localStorage.getItem('token');  // Verifique se o usuário está logado

    return (
        <Router>
            <Routes>
                {/* Página de Login (não usa o Layout com Navbar) */}
                <Route path="/login" element={<Login />} />

                {/* Rotas protegidas (com Layout e Navbar) */}
                <Route
                    path="/home"
                    element={isLoggedIn ? (
                        <Layout><Home /></Layout>  // Envolva a página Home com o Layout
                    ) : (
                        <Navigate to="/login" />
                    )}
                />
                <Route
                    path="/employeeRegister"
                    element={isLoggedIn ? (
                        <Layout><EmployeeRegister /></Layout>  // Envolva a página de registro com o Layout
                    ) : (
                        <Navigate to="/login" />
                    )}
                />

                <Route path="/employees"
                       element={isLoggedIn ? (
                           <Layout><Employees /></Layout>
                       ): (
                           <Navigate to="/login" />
                       )}
                />

                {/* Redireciona para /login se a URL não corresponder a nenhuma rota existente */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
