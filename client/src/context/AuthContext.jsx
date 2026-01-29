import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            const parsedUser =JSON.parse(storedUser)
            setUser(parsedUser)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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

    const login = async (data) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', data);

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            const userData = res.data.user;
            setUser(userData);

            localStorage.setItem('user', JSON.stringify(userData))

            return userData;
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        window.location.href = '/'
    };

    return (
        <AuthContext.Provider value={{ user, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};