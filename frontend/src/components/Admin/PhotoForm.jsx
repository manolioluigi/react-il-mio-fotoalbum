import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PhotoForm = ({ token, userId, photoData }) => {
    const [title, setTitle] = useState(photoData ? photoData.title : '');
    const [description, setDescription] = useState(photoData ? photoData.description : '');
    const [categories, setCategories] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(photoData ? photoData.image : '');
    const [visible, setVisible] = useState(photoData ? photoData.visible : true);
    const [selectedCategories, setSelectedCategories] = useState(
        photoData ? photoData.categories.map(category => category.id) : []
    );
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3300/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCategories(Array.isArray(data) ? data : []);
                } else {
                    console.error('Error fetching categories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, [token]);

    useEffect(() => {
        if (photoData) {
            setTitle(photoData.title || '');
            setDescription(photoData.description || '');
            setVisible(photoData.visible || true);
            setSelectedCategories(photoData.categories ? photoData.categories.map(category => category.id) : []);
        }
    }, [photoData]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setImageUrl('');
    };

    const handleUrlChange = (e) => {
        setImageUrl(e.target.value);
        setSelectedFile(null);
    };

    const handleCategoryChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedCategories(selectedOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('visible', visible);

            selectedCategories.forEach((categoryId) => {
                formData.append(`categories[]`, categoryId);
            });

            if (selectedFile) {
                formData.append('image', selectedFile);
            } else if (imageUrl) {
                formData.append('image', imageUrl);
            }

            formData.append('userId', userId);

            const url = photoData ? `http://localhost:3300/admin/${userId}/photos/${photoData.id}` : `http://localhost:3300/admin/${userId}/photos`;

            const method = photoData ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Photo created/updated successfully:', data);
                navigate("/admin/photos");
            } else {
                console.error('Error creating/updating photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating/updating photo:', error.message);
        }
    };


    return (
        <div className='page'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className='py-5'>{photoData ? "Modifica una foto" : "Inserisci una nuova foto"}</h2>
                        <form className='d-flex flex-column' onSubmit={handleSubmit}>
                            <label>Titolo:</label>
                            <input className='form-control' type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                            <label>Descrizione:</label>
                            <textarea className='form-control' value={description} onChange={(e) => setDescription(e.target.value)} />
                            <div>
                                <label>Immagine pubblica: </label>
                                <input
                                    className='mx-2'
                                    type="checkbox"
                                    checked={visible}
                                    onChange={(e) => setVisible(e.target.checked)}
                                />
                            </div>
                            <label>Categorie:</label>
                            <select
                                className='form-control'
                                multiple
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                            >
                                {Array.isArray(categories) && categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>


                            <label>Carica un'immagine:</label>
                            <input className='form-control' type="file" onChange={handleFileChange} accept="image/*" />

                            <label>oppure inseriscila tramite URL:</label>
                            <input className='form-control' type="text" value={imageUrl} onChange={handleUrlChange} />

                            <button className='btn btn-purple' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoForm;
