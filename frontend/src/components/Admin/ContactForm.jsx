import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const ContactForm = () => {
    const [senderName, setSenderName] = useState('');
    const [messageText, setMessageText] = useState('');
    const { user } = useAuth();
    const userId = user.userId;
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await inviaMessaggioAPI({ senderName, messageText });
            console.log('Messaggio inviato con successo:', response);
            navigate("/");
        } catch (error) {
            console.error('Errore durante l\'invio del messaggio:', error);
        }
    };


    const inviaMessaggioAPI = async (formData) => {
        try {
            formData.userId = userId;
            const response = await fetch(`http://localhost:3300/admin/${userId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'invio del messaggio');
            }

            return response.json();
        } catch (error) {
            console.error('Errore durante l\'invio del messaggio:', error);
            throw error;
        }
    };

    return (
        <div className='page'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className='my-5'>Contattaci</h2>
                        <form className='d-flex flex-column' onSubmit={handleSubmit}>
                            <label>Il tuo nome</label>
                            <input className='form-control' type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required />

                            <label>Cosa vuoi farci sapere?</label>
                            <textarea className='form-control' value={messageText} onChange={(e) => setMessageText(e.target.value)} required />

                            <button className='btn btn-purple' type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactForm;
