import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('http://localhost:3300/photos');
                if (response.ok) {
                    const data = await response.json();
                    const visiblePhotos = data.filter(photo => photo.visible === true);
                    setPhotos(visiblePhotos);
                } else {
                    console.error('Error fetching photos:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching photos:', error.message);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div>
            <h2>Photo List</h2>
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

export default Home;
