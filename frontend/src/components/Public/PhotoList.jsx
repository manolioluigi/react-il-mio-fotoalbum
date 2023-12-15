// components/Public/PhotoList.jsx
import React, { useState, useEffect } from 'react';

const PhotoList = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('http://localhost:3300/photos');
                if (response.ok) {
                    const data = await response.json();
                    setPhotos(data);
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
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PhotoList;
