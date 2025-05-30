import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from '~/services/customize-axios';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { token: authToken, logout } = useContext(AuthContext);
    const [hoaDons, setHoaDons] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(authToken || localStorage.getItem('token') || '');

    useEffect(() => {
        setToken(authToken);
    }, [authToken]);

    const fetchHoaDons = useCallback(async () => {
        if (!token) {
            toast.error('Vui lòng đăng nhập để xem danh sách hóa đơn');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7111/api/Order', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data?.hoaDons) {
                setHoaDons(response.data);
            } else {
                toast.info('Không có hóa đơn nào');
                setHoaDons({ message: 'Không có hóa đơn nào', hoaDons: [] });
            }
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
                logout?.();
            } else if (status === 404) {
                toast.info('Không có hóa đơn nào');
                setHoaDons({ message: 'Không có hóa đơn nào', hoaDons: [] });
            } else {
                toast.error(err.response?.data?.message || 'Lỗi khi lấy danh sách hóa đơn');
            }
            setHoaDons(null);
        } finally {
            setLoading(false);
        }
    }, [token, logout]);

    const value = useMemo(
        () => ({
            hoaDons,
            loading,
            fetchHoaDons,
        }),
        [hoaDons, loading, fetchHoaDons],
    );

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
