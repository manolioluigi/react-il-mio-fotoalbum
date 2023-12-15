import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PhotoDetails = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    function isExternalUrl(url) {
        return url.startsWith('http://') || url.startsWith('https://');
    }

    useEffect(() => {
        const fetchPhotoDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3300/photos/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPhoto(data);
                } else {
                    console.error('Error fetching photo details:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching photo details:', error.message);
            }
        };

        fetchPhotoDetails();
    }, [id]);

    if (!photo) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{photo.title}</h2>
            {isExternalUrl(photo.image) ? (
                <img src={photo.image} alt={photo.title} />
            ) : (
                <img src={`http://localhost:3300/images/${photo.image}`} alt={photo.title} />
            )}
            <p>{photo.description}</p>
        </div>
    );
}

export default PhotoDetails;
