import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.baseURL = 'https://localhost:44309';

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1); // Página atual
    const [limit, setLimit] = useState(10); // Limite de itens por página
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEmployees(page, limit);
    }, [page, limit]); // Chama a função sempre que a página ou o limite mudar

    const fetchEmployees = async (page, limit) => {
        setLoading(true);
        try {
            const response = await axios.get(`/employee`, {
                params: { page, limit }
            });
            setEmployees(response.data.list); // Ajuste conforme o formato da resposta
            setTotalPages(Math.ceil(response.data.total / limit)); // Calcular o total de páginas
        } catch (error) {
            console.error("Erro ao carregar os funcionários", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return; // Garantir que a página esteja dentro do intervalo
        setPage(newPage);
    };

    return (
        <div>
            <h2>Employee List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.city}</td>
                                <td>{employee.state}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Paginação */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination">
                            <li className="page-item" onClick={() => handlePageChange(page - 1)}>
                                <span className="page-link">Previous</span>
                            </li>
                            {[...Array(totalPages)].map((_, idx) => (
                                <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`} onClick={() => handlePageChange(idx + 1)}>
                                    <span className="page-link">{idx + 1}</span>
                                </li>
                            ))}
                            <li className="page-item" onClick={() => handlePageChange(page + 1)}>
                                <span className="page-link">Next</span>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
}

export default EmployeeList;
