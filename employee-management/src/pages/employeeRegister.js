import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Importe o Axios configurado
import {useNavigate, useParams} from 'react-router-dom';
import Swal from 'sweetalert2';

function EmployeeRegister() {
    const navigate = useNavigate();
    const { id } = useParams(); // Captura o ID da URL

    const [idEmployee, setIdEmployee] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [managerId, setManagerId] = useState('');
    const [managerName, setManagerName] = useState('');
    const [password, setPassword] = useState('');
    const [accessLevel, setAccessLevel] = useState('');
    const [managers, setManagers] = useState([]);

    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [contactNames, setContactNames] = useState([]);

    useEffect(() => {
        async function fetchManagers() {
            try {
                const response = await axios.get(`/employee?page=1&limit=1000`);
                setManagers(response.data.list);
            } catch (error) {
                console.error('Erro ao carregar gerentes', error);
            }
        }
        fetchManagers();
    }, []);


    useEffect(() => {
        if (id) {
            async function fetchEmployee() {
                try {
                    const response = await axios.get(`/employee/${id}`);
                    const employee = response.data;

                    setIdEmployee(employee.id);
                    setName(employee.name);
                    setEmail(employee.email);
                    setBirthDate(employee.birthDate);
                    setDocumentNumber(employee.documentNumber);
                    setAddress(employee.address);
                    setCity(employee.city);
                    setState(employee.state);
                    setZip(employee.zip);
                    setManagerId(employee.managerId);
                    setManagerName(employee.managerName);
                    setAccessLevel(employee.accessLevel);

                    setPhoneNumbers(employee.contacts.map(contact => contact.phoneNumber));
                    setContactNames(employee.contacts.map(contact => contact.contactName));
                } catch (error) {
                    console.error('Erro ao carregar funcionário', error);
                }
            }
            fetchEmployee();
        }
    }, [id]);

    useEffect(() => {
        const manager = managers.find((m) => m.id === managerId);
        setManagerName(manager ? manager.name : '');
    }, [managerId, managers]);

    const handleAddPhoneNumber = () => {
        setPhoneNumbers([...phoneNumbers, '']);
        setContactNames([...contactNames, '']);
    };

    const handlePhoneNumberChange = (index, value) => {
        const updatedPhoneNumbers = [...phoneNumbers];
        const updatedContactNames = [...contactNames];
        updatedPhoneNumbers[index] = value.phoneNumber;
        updatedContactNames[index] = value.contactName;
        setPhoneNumbers(updatedPhoneNumbers);
        setContactNames(updatedContactNames);
    };

    const handlerChangeManager = (e) => {
        const selectedManagerId = e.target.value;
        setManagerId(selectedManagerId);
    }

    const handlerBack = async (e) =>{
        navigate("/employees")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let jsonEmployee = {
                id: idEmployee,
                name,
                email,
                documentNumber,
                birthDate,
                address,
                city,
                state,
                zip,
                managerId,
                managerName,
                password,
                accessLevel,
                contacts: phoneNumbers.map((phone, index) => ({
                    phoneNumber: phone,
                    contactName: contactNames[index],
                })),
            };

            if (id) {
                await axios.put(`/employee/${id}`, jsonEmployee);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Registration Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate(`/employeeRegister/${id}`);
            } else {
                await axios.post('/employee', jsonEmployee);
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Registration Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }

        } catch (error) {
        }
    };
    return (
        <div className="container">
            <h1 className="my-4">Registrar Funcionário</h1>
            <form onSubmit={handleSubmit}>
                <input type="hidden" name="idEmployee" value={idEmployee}/>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" placeholder="Nome" value={name}
                                   onChange={(e) => setName(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Birth Date</label>
                            <input type="date" className="form-control" placeholder="Data Nascimento" value={birthDate}
                                   onChange={(e) => setBirthDate(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Document Number</label>
                            <input type="text" className="form-control" placeholder="Documento" value={documentNumber}
                                   onChange={(e) => setDocumentNumber(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Adress</label>
                            <input type="text" className="form-control" placeholder="Endereço" value={address}
                                   onChange={(e) => setAddress(e.target.value)} required/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" className="form-control" placeholder="Cidade" value={city}
                                   onChange={(e) => setCity(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" className="form-control" placeholder="Estado" value={state}
                                   onChange={(e) => setState(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Zip code</label>
                            <input type="text" className="form-control" placeholder="CEP" value={zip}
                                   onChange={(e) => setZip(e.target.value)} required/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Manager</label>
                            <select className="form-control" value={managerId} onChange={handlerChangeManager} required>
                                <option value="">Selecione o Gerente</option>
                                {managers.map((manager) => (
                                    <option key={manager.id} value={manager.id}>{manager.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {id === 0 && (
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                </div>

                <div className="form-group">
                    <label>Access Level</label>
                    <select className="form-control" value={accessLevel}
                            onChange={(e) => setAccessLevel(e.target.value)}>
                        <option value="Employee">Funcionário</option>
                        <option value="Leader">Líder</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Coordinator">Coordenador</option>
                        <option value="Manager">Gerente</option>
                        <option value="Director">Diretor</option>
                    </select>
                </div>
                <br/>
                <div className="card">
                    <div className="card-header">
                        <button type="button" className="btn btn-secondary mt-2"
                                onClick={handleAddPhoneNumber}>Adicionar
                            Contato
                        </button>
                    </div>
                    <div className="card-body">
                        <h5>Contacts</h5>
                        {phoneNumbers.map((phone, index) => (
                            <div key={index} className="row" style={{ paddingTop: '10px' }}>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Telefone"
                                        value={phone}
                                        onChange={(e) => handlePhoneNumberChange(index, {
                                            phoneNumber: e.target.value,
                                            contactName: contactNames[index]
                                        })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome do Contato"
                                        value={contactNames[index]}
                                        onChange={(e) => handlePhoneNumberChange(index, {
                                            phoneNumber: phoneNumbers[index],
                                            contactName: e.target.value
                                        })}
                                    />
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
                <br/><br/>
                <div className="form-group">

                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
                <button type="button" className="btn btn-default" onClick={handlerBack}>Voltar</button>
            </form>
        </div>
    );
}

export default EmployeeRegister;
