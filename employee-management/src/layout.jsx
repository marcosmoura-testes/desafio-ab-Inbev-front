import React from 'react';
import Navbar from './components/nav-bar'; // Importe a Navbar

function Layout({ children }) {
    return (
        <div>
            {/* Exibir Navbar apenas se o usuário estiver logado */}
            {localStorage.getItem('token') && <Navbar />}
            <div className="container mt-4">
                {children} {/* Renderiza o conteúdo da página dentro do layout */}
            </div>
        </div>
    );
}

export default Layout;
