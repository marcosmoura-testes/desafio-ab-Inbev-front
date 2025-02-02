import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Importe o Axios configurado

function EmployeeRegister() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [managerId, setManagerId] = useState('');
    const [managerName, setManagerName] = useState(''); // Armazene o nome do gerente
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
                alert('Falha ao carregar gerentes');
            }
        }
        fetchManagers();
    }, []);

    // Atualiza o nome do gerente automaticamente quando o gerenteId muda
    useEffect(() => {
        const manager = managers.find((m) => m.id === managerId);
        setManagerName(manager ? manager.name : ''); // Atualiza o nome do gerente
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifique se o managerName está sendo corretamente atualizado
        console.log("accessLevel:", accessLevel);
        console.log("Manager Name:", managerName);

        try {
            let jsonEmployee = {
                name,
                email,
                documentNumber,
                birthDate,
                address,
                city,
                state,
                zip,
                managerId, // Agora enviaremos o ID do gerente
                managerName, // Enviamos o nome do gerente
                password,
                accessLevel,
                contacts: phoneNumbers.map((phone, index) => ({
                    phoneNumber: phone,
                    contactName: contactNames[index],
                })),
            };

            // Descomente para fazer a chamada real ao backend
            const response = await axios.post('/employee', jsonEmployee);
            // alert('Funcionário registrado com sucesso');
        } catch (error) {
            alert('Falha ao registrar funcionário');
        }
    };


    return (
        <div className="container">
            <h1 className="my-4">Registrar Funcionário</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Data Nascimento</label>
                            <input type="date" className="form-control" placeholder="Data Nascimento" value={birthDate}
                                   onChange={(e) => setBirthDate(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Documento</label>
                            <input type="text" className="form-control" placeholder="Documento" value={documentNumber}
                                   onChange={(e) => setDocumentNumber(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label>Endereço</label>
                            <input type="text" className="form-control" placeholder="Endereço" value={address}
                                   onChange={(e) => setAddress(e.target.value)} required/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" className="form-control" placeholder="Cidade" value={city}
                                   onChange={(e) => setCity(e.target.value)} required/>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>Estado</label>
                            <input type="text" className="form-control" placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label>CEP</label>
                            <input type="text" className="form-control" placeholder="CEP" value={zip} onChange={(e) => setZip(e.target.value)} required />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Gerente</label>
                            <select className="form-control" value={managerId} onChange={handlerChangeManager} required>
                                <option value="">Selecione o Gerente</option>
                                {managers.map((manager) => (
                                    <option key={manager.id} value={manager.id}>{manager.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Nível de Acesso</label>
                    <select className="form-control" value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
                        <option value="Employee">Funcionário</option>
                        <option value="Leader">Líder</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Coordinator">Coordenador</option>
                        <option value="Manager">Gerente</option>
                        <option value="Director">Diretor</option>
                    </select>
                </div>

                <div className="form-group">
                    <h5>Contatos</h5>
                    {phoneNumbers.map((phone, index) => (
                        <div key={index} className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Telefone"
                                    value={phone}
                                    onChange={(e) => handlePhoneNumberChange(index, { phoneNumber: e.target.value, contactName: contactNames[index] })}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome do Contato"
                                    value={contactNames[index]}
                                    onChange={(e) => handlePhoneNumberChange(index, { phoneNumber: phoneNumbers[index], contactName: e.target.value })}
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary mt-2" onClick={handleAddPhoneNumber}>Adicionar Contato</button>
                </div>

                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        </div>
    );
}

export default EmployeeRegister;
