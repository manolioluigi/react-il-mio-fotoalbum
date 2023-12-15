import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Public/Home';
import ContactForm from './components/Admin/ContactForm';
import PhotoList from './components/Public/PhotoList';
import PhotoDetails from './components/Public/PhotoDetails';
import PhotoForm from './components/admin/PhotoForm';
import CategoryList from './components/Public/CategoryList';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photos" element={<PhotoList />} />
                <Route path="/photos/:id" element={<PhotoDetails />} />
                <Route path="/categories" element={<CategoryList />} />
                <Route path="/admin/photos/photo-form" element={<PhotoForm />} />
                <Route path="/admin/contact-form" element={<ContactForm />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
