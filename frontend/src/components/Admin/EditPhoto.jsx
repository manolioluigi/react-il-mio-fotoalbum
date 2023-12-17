import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PhotoForm from '../../components/Admin/PhotoForm';
import { useAuth } from '../../AuthContext';

const EditPhoto = () => {
    const { user } = useAuth();
    const userId = user.userId;
    const userToken = localStorage.getItem('userToken');
    const { photoId } = useParams();
    const [photoData, setPhotoData] = useState(null);

    useEffect(() => {
        const fetchPhotoData = async () => {
            try {
                const response = await fetch(`http://localhost:3300/photos/${photoId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setPhotoData(data);
                    console.log(data)
                } else {
                    console.error('Error fetching photo data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching photo data:', error.message);
            }
        };

        fetchPhotoData();
    }, [userId, userToken, photoId]);

    const handleEditSubmit = async (formData) => {
        try {
            const response = await fetch(`http://localhost:3300/admin/${userId}/photos/${photoId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log('Photo updated successfully:', updatedData);
            } else {
                console.error('Error updating photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating photo:', error.message);
        }
    };

    return (
        <div>
            <h2>Edit Photo</h2>
            {photoData && (
                <PhotoForm
                    token={userToken}
                    userId={userId}
                    photoData={photoData}
                />
            )}
        </div>
    );
};

export default EditPhoto;
