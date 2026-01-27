import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Optional: fetch user profile
            setUser({ token }); // minimal
        }
        setLoading(false);
    }, []);

    const register = async (data, role) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { ...data, role });
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
            return res.data;
        } catch (err) {
            throw err.response?.data || { message: 'Registration failed' };
        }
    };

    const login = async (data, role) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', data);

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            setUser(res.data.user);

            return res.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};