import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { isAuthenticated, userRole, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (!isAuthenticated || userRole !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;