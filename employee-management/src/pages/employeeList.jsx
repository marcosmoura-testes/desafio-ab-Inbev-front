import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Se você estiver usando react-router-dom v6+
axios.defaults.baseURL = 'https://localhost:44309';

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees(page, limit);
    }, [page, limit]);

    const fetchEmployees = async (page, limit) => {
        setLoading(true);
        try {
            const response = await axios.get(`/employee`, {
                params: { page, limit }
            });
            setEmployees(response.data.list);
            setTotalPages(Math.ceil(response.data.total / limit));
        } catch (error) {
            console.error("Erro ao carregar os funcionários", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'Você não poderá reverter essa ação!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/employee/${id}`);
                    Swal.fire('Deletado!', 'O funcionário foi removido.', 'success');
                    fetchEmployees(page, limit);
                } catch (error) {
                    Swal.fire('Erro!', 'Não foi possível deletar o funcionário.', 'error');
                }
            }
        });
    };

    const handleEdit = (id) => {
        navigate(`/employeeRegister/${id}`);
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
                            <th>Access Level</th>
                            <th>Manager Name</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.accessLevel}</td>
                                <td>{employee.managerName}</td>
                                <td>{employee.state}</td>
                                <td>
                                    <button className="btn btn-primary me-2"
                                            onClick={() => handleEdit(employee.id)}>Edit
                                    </button>
                                    <button className="btn btn-danger"
                                            onClick={() => handleDelete(employee.id)}>Delete
                                    </button>
                                </td>
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
