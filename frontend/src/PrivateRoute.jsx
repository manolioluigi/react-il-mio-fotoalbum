import React, { useState, useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, ...props }) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return loading ? null : user ? (
        children
    ) : (
        <Navigate to="/login" replace />
    );
};


export default PrivateRoute;
