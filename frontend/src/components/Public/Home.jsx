import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [photos, setPhotos] = useState([]);

    function isExternalUrl(url) {
        const trimmedUrl = url.trim();
        console.log(trimmedUrl.split('').map(char => char.charCodeAt(0).toString(16)).join(' '));
        return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
    }

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
        <div className='page'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col py-5">
                        <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-5">
                            {photos.map((photo) => (
                                <li className='photo-card' key={photo.id}>
                                    <Link className='decoration-none' to={`/photos/${photo.id}`}>
                                        <div className="img-box">
                                            {isExternalUrl(photo.image) ? (
                                                <img src={photo.image} alt={photo.title} />
                                            ) : (
                                                <img src={`http://localhost:3300/images/${photo.image}`} alt={photo.title} />
                                            )}
                                        </div>
                                        <div className="content-box d-flex p-5 justify-content-between align-items-center">
                                            <h3>{photo.title}</h3>
                                            <i className="fa-solid fa-up-right-from-square"></i>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div >
                </div >
            </div >
        </div >
    );
}

export default Home;
