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
    const [photoCategories, setPhotoCategories] = useState([]);

    useEffect(() => {
        const fetchPhotoData = async () => {
            try {
                const response = await fetch(`http://localhost:3300/photos/${photoId}`);

                if (response.ok) {
                    const data = await response.json();
                    setPhotoData(prevPhotoData => {
                        console.log("photodata", prevPhotoData);
                        return {
                            ...data,
                            categories: data.categories || [], // Aggiungi questa linea
                        };
                    });
                } else {
                    console.error('Error fetching photo data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching photo data:', error.message);
            }
        };

        fetchPhotoData();
    }, [userId, photoId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategoriesResponse = await fetch('http://localhost:3300/categories');

                if (allCategoriesResponse.ok) {
                    const allCategoriesData = await allCategoriesResponse.json();
                    const categories = allCategoriesData.filter(category => photoData.categories.includes(category.id));
                    setPhotoCategories(categories);
                } else {
                    console.error('Error fetching all categories:', allCategoriesResponse.statusText);
                }
            } catch (error) {
                console.error('Error fetching all categories:', error.message);
            }
        };

        if (photoData && photoData.categories) {
            fetchCategories();
        }
    }, [photoData]);

    return (
        <div>
            {photoData && (
                <PhotoForm
                    token={userToken}
                    userId={userId}
                    photoData={photoData}
                    photoCategories={photoCategories}
                />
            )}
        </div>
    );
};

export default EditPhoto;