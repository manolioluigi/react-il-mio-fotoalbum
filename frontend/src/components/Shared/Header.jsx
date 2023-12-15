import React from 'react';

const Header = () => {
    return (
        <div className='d-flex'>
            <h1>Header</h1>
            <div className="d-flex gap-3">
                <a href="/">Home</a>
                <a href="photos">Foto</a>
                <a href="categories">Categorie</a>
                <a href="admin/contact-form">Contattaci</a>
            </div>
        </div>
    );
}

export default Header;