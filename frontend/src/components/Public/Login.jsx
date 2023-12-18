import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { user } = useAuth();
    if (user) {
        navigate('/photos');
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3300/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Credenziali non valide');
            }

            const userData = await response.json();
            const { token } = userData;

            login(token);
            console.log('Login eseguito con successo');
            navigate('/admin/photos');
        } catch (error) {
            console.error('Errore durante il login:', error);
        }
    };

    return (
        <div className='page'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className='my-5'>Login</h2>
                        <form className='d-flex flex-column' onSubmit={handleLogin}>
                            <label>Username:</label>
                            <input
                                type="text"
                                className='form-control'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <br />
                            <label>Password:</label>
                            <input
                                type="password"
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <br />
                            <button className='btn btn-purple' type="submit">Login</button>
                        </form>
                        <hr className='my-5' />
                        <div>
                            <h4>Non hai un'account?</h4>
                            <Link to={"/register"}>
                                <button className='btn btn-purple'><h5>Registrati</h5></button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
