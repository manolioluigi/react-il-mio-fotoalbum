import React, { useState, useEffect } from 'react';

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
        // Impostare lo stato iniziale dei campi del modulo quando photoData cambia
        if (photoData) {
            setTitle(photoData.title || '');
            setDescription(photoData.description || '');
            setVisible(photoData.visible || true);
            setSelectedCategories(photoData.categories || []);
            // Aggiungi eventuali altri campi che vuoi gestire
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

            const response = await fetch(`http://localhost:3300/admin/${userId}/photos`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Photo created successfully:', data);
            } else {
                console.error('Error creating photo:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating photo:', error.message);
        }
    };

    return (
        <div>
            <h2>Photo Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <label>Visible:</label>
                <input
                    type="checkbox"
                    checked={visible}
                    onChange={(e) => setVisible(e.target.checked)}
                />

                <label>Categories:</label>
                <select
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

                <label>Image:</label>
                <input type="file" onChange={handleFileChange} accept="image/*" />

                <label>or Image URL:</label>
                <input type="text" value={imageUrl} onChange={handleUrlChange} />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PhotoForm;
