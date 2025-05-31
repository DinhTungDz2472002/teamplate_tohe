import React, { createContext, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DsOrderContext = createContext();

export const DsOrderProvider = ({ children }) => {
    const { token: authToken, logout } = useContext(AuthContext);
    const [invoices, setInvoices] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOrders = useCallback(
        async (pageNumber = 1, pageSize = 10, status = 'ChoGiaoHang') => {
            if (!authToken) {
                toast.error('Vui lòng đăng nhập để xem danh sách hóa đơn');
                return;
            }
            setLoading(true);
            const endpointMap = {
                ChoGiaoHang: 'GetChoGiaoHang',
                KhachMuonHuy: 'GetKhachMuonHuy',
                DaHuy: 'GetDaHuy',
                DaGiao: 'GetDaGiao',
                ChoXacNhan: 'GetChoXacNhan',
            };
            const endpoint = endpointMap[status] || 'GetChoGiaoHang';
            try {
                const response = await axios.get(`https://localhost:7111/api/DsOrder_User/${endpoint}`, {
                    headers: { Authorization: `Bearer ${authToken}` },
                    params: { pageNumber, pageSize },
                });

                const totalItems = response.data?.totalItems || 0; // Lấy totalItems từ API
                const data = response.data?.hoaDons
                    ? { ...response.data, data: response.data.hoaDons }
                    : { message: 'Không có hóa đơn nào', data: [], currentPage: 1, totalPages: 1, totalItems: 0 };
                setInvoices(data);
                if (!response.data?.hoaDons) {
                    toast.info('Không có hóa đơn nào');
                }
            } catch (err) {
                console.error(`Error fetching invoices for ${status}:`, err);
                const statusCode = err.response?.status;
                if (statusCode === 401) {
                    toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
                    logout?.();
                } else if (statusCode === 404 || statusCode === 400) {
                    toast.info('Không có hóa đơn nào');
                    setInvoices({ message: 'Không có hóa đơn nào', data: [], currentPage: 1, totalPages: 1 });
                } else {
                    toast.error(err.response?.data?.message || 'Lỗi khi lấy danh sách hóa đơn');
                    setInvoices(null);
                }
            } finally {
                setLoading(false);
            }
        },
        [authToken, logout],
    );

    return <DsOrderContext.Provider value={{ invoices, loading, fetchOrders }}>{children}</DsOrderContext.Provider>;
};
