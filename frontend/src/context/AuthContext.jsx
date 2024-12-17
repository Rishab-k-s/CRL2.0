// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Add console.log to debug initial load
        console.log('Loading auth state from localStorage');
        
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const storedUsername = localStorage.getItem('username');

        console.log('Retrieved from localStorage:', { token: !!token, role, username: storedUsername });

        if (token && role) {
            setIsAuthenticated(true);
            setUserRole(role);
            setUsername(storedUsername);
        }
        setLoading(false);
    }, []);

    const login = (token, role, username) => {
        console.log('Login called with:', { token: !!token, role, username });
        
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('username', username);
        
        setIsAuthenticated(true);
        setUserRole(role);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');  // Remove username from localStorage

        setIsAuthenticated(false);
        setUserRole(null);
        setUsername("");  // Clear username in state

    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, username, login, logout, loading }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
