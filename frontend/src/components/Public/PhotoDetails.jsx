import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PhotoDetails = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    function isExternalUrl(url) {
        const trimmedUrl = url.trim();
        console.log(trimmedUrl.split('').map(char => char.charCodeAt(0).toString(16)).join(' '));
        return trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://');
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
        <div className='page'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col no-padding">
                        <div className="wide-img">
                            {isExternalUrl(photo.image) ? (
                                <img src={photo.image} alt={photo.title} />
                            ) : (
                                <img src={`http://localhost:3300/images/${photo.image}`} alt={photo.title} />
                            )}
                            <div className='wide-text'>
                                <h2>{photo.title}</h2>
                                <p>{photo.description}</p>
                            </div>
                            <Link to={"/"}>
                                <div className="back"><i class="fa-solid fa-arrow-left fa-beat-fade"></i></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PhotoDetails;
