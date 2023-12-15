import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='d-flex'>
            <h1>Header</h1>
            <div className="d-flex gap-3">
                <Link to="/">Home</Link>
                <Link to="photos">Foto</Link>
                <Link to="categories">Categorie</Link>
                <Link to="admin/contact-form">Contattaci</Link>
                {user ? (
                    // Se l'utente è autenticato, mostra il pulsante di logout
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    // Se l'utente non è autenticato, mostra il link di login
                    <Link to="login">Login</Link>
                )}
            </div>
        </div>
    );
}

export default Header;