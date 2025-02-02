import axios from 'axios';

// URL base da API
axios.defaults.baseURL = 'https://localhost:44309'; // Alterar conforme necessário

// Verifica se há um token no localStorage e adiciona ao cabeçalho Authorization
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default axios;
