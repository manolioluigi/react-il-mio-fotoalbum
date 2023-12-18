import React, { useState, useEffect } from 'react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3300/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    console.error('Error fetching categories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className='page'>
            <div className="container">
                <div className="row">
                    <div className="col width-full">
                        <h2 className='py-5'>Categorie disponibili</h2>
                        <ul className='list-unstyled width-full'>
                            {categories.map((category) => (
                                <li key={category.id}><h4>{category.name}</h4><hr /></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CategoryList;
