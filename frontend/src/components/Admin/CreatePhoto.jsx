import React from 'react';
import PhotoForm from '../../components/Admin/PhotoForm';
import { useAuth } from '../../AuthContext';

const CreatePhoto = () => {
    const { user } = useAuth();
    const userId = user.userId;
    const userToken = localStorage.getItem('userToken');
    console.log(userToken)
    return (
        <div>
            <PhotoForm token={userToken} userId={userId}></PhotoForm>
        </div>
    );
}

export default CreatePhoto;