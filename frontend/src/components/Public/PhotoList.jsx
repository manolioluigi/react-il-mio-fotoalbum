import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('http://localhost:3300/photos');
                if (response.ok) {
                    const data = await response.json();
                    const userPhotos = data.filter(photo => photo.userId === user.userId);
                    setPhotos(userPhotos);
                } else {
                    console.error('Error fetching photos:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching photos:', error.message);
            }
        };

        if (user && user.userId) {
            fetchPhotos();
        }
    }, [user]);

    const handleDeletePhoto = async (id) => {
        try {
            const response = await fetch(`http://localhost:3300/admin/${user.userId}/photos/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
            });

            if (response.ok) {
                // Rimuovi la foto dalla lista
                setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
                console.log('Photo deleted successfully');
            } else {
                console.error('Error deleting photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting photo:', error.message);
        }
    };

    return (
        <div className='page'>
            <div className="container">
                <div className="row py-5">
                    <div className="col">
                        <h2>Le mie foto</h2>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Link to={"/admin/create-photo"}>
                            <button className='btn btn-purple'>Aggiungi una foto</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8 width-full">
                        <ul className='d-flex list-unstyled flex-column width-full'>
                            {photos.map((photo) => (
                                <li key={photo.id}>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h4>{photo.title}</h4>
                                        <div>
                                            <Link to={`/admin/edit-photo/${photo.id}`}>
                                                <button className='btn btn-warning mx-2'><i className="fa-solid fa-pen-to-square"></i></button>
                                            </Link>
                                            <button className='btn btn-danger' onClick={() => handleDeletePhoto(photo.id)}><i className="fa-solid fa-trash-can"></i></button>                                        </div>
                                    </div>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhotoList;
