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
        <div className='header d-flex align-items-center width-100'>
            <div className="container">
                <div className="row">
                    <div className="col d-flex align-items-center">
                        <Link className='decoration-none' to={"/"}>
                            <div className="d-flex align-items-center">
                                <i className="logo fa-solid fa-camera fa-flip"></i>
                                <h2>Il mio fotoalbum</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <div className="d-flex gap-3 align-items-center">
                            <Link className='decoration-none' to="/"><h5 className='no-margin'>Home</h5></Link>
                            <Link className='decoration-none' to="admin/photos"><h5 className='no-margin'>Foto</h5></Link>
                            <Link className='decoration-none' to="categories"><h5 className='no-margin'>Categorie</h5></Link>
                            <Link className='decoration-none' to="admin/contact-form"><h5 className='no-margin'>Contattaci</h5></Link>
                            {user ? (
                                <button className='btn btn-yellow' onClick={handleLogout}><h5 className='no-margin'>Logout</h5></button>
                            ) : (
                                <Link to="login"><button className='btn btn-yellow'><h5 className='no-margin'>Login</h5></button></Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;