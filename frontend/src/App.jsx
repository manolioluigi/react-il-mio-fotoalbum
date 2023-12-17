import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Public/Home';
import ContactForm from './components/Admin/ContactForm';
import PhotoList from './components/Public/PhotoList';
import PhotoDetails from './components/Public/PhotoDetails';
import PhotoForm from './components/admin/PhotoForm';
import CategoryList from './components/Public/CategoryList';
import Login from './components/Public/Login'
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './PrivateRoute';
import CreatePhoto from './components/Admin/CreatePhoto';
import EditPhoto from './components/Admin/EditPhoto';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/photos" element={<PhotoList />} />
                    <Route path="/photos/:id" element={<PhotoDetails />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/admin/photos/photo-form" element={<PrivateRoute><PhotoForm /></PrivateRoute>} />
                    <Route path="/admin/contact-form" element={<PrivateRoute><ContactForm /></PrivateRoute>} />
                    <Route path="/admin/create-photo" element={<PrivateRoute><CreatePhoto /></PrivateRoute>} />
                    <Route path="/admin/edit-photo/:photoId" element={<PrivateRoute><EditPhoto /></PrivateRoute>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
