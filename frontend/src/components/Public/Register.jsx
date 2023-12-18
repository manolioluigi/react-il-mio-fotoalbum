import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await registerUserAPI({ username, password });

            console.log('Utente registrato con successo:', response);
            navigate("/login")
        } catch (error) {
            console.error('Errore durante la registrazione:', error.message);
        }
    };

    const registerUserAPI = async (userData) => {
        const response = await fetch('http://localhost:3300/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Errore durante la registrazione');
        }

        return response.json();
    };


    return (
        <div className='page'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className='my-5'>Registrazione</h2>
                        <form className='d-flex flex-column' onSubmit={handleRegister}>
                            <label>Nome utente:</label>
                            <input className='form-control' type="text" value={username} onChange={handleUsernameChange} required />

                            <label>Password:</label>
                            <input className='form-control' type="password" value={password} onChange={handlePasswordChange} required />

                            <button className='btn btn-purple' type="submit">Registrati</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
