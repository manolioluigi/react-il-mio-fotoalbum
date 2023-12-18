import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';

const ContactForm = () => {
    const [senderName, setSenderName] = useState('');
    const [messageText, setMessageText] = useState('');
    const { user } = useAuth();
    const userId = user.userId;
    const token = localStorage.getItem('userToken');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await inviaMessaggioAPI({ senderName, messageText });
            console.log('Messaggio inviato con successo:', response);
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
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <label>Your Name:</label>
                <input type="text" value={senderName} onChange={(e) => setSenderName(e.target.value)} required />

                <label>Message:</label>
                <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} required />

                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default ContactForm;
