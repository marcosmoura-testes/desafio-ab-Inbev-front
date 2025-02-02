// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate(); // useNavigate ao invés de useHistory

    const handleLogout = () => {
        // Limpar o token (supondo que o token esteja no localStorage)
        localStorage.removeItem('token');

        // Redirecionar para a página de login
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">Employee Management</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/employees">Register Employee</Link>
                        </li>
                    </ul>
                    <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
