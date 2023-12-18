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

    return (
        <div>
            <h2>Your Photo List</h2>
            <Link to={"/admin/create-photo"}>
                <button className='btn btn-primary'>Aggiungi una foto</button>
            </Link>
            <ul>
                {photos.map((photo) => (
                    <li key={photo.id}>
                        <p>{photo.title}</p>
                        <Link to={`/admin/edit-photo/${photo.id}`}>
                            <button className='btn btn-sm btn-warning'>edit</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PhotoList;
