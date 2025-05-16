import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios
                .get('https://localhost:7111/api/khachhang/me', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch(() => {
                    setToken(null);
                    localStorage.removeItem('token');
                });
        }
    }, [token]);

    const login = async (Username, password) => {
        try {
            const res = await axios.post('https://localhost:7111/api/khachhang/login', { Username, password });
            setToken(res.data.access_token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.access_token);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const register = async (data) => {
        try {
            const res = await axios.post('https://localhost:7111/api/khachhang/register', data);
            setToken(res.data.token);
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            return res.data;
        } catch (error) {
            throw error.response.data;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                'https://localhost:7111/api/khachhang/logout',
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        } catch (error) {
            console.error(error);
        }
    };

    return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>;
};
