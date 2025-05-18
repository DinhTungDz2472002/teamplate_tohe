// 1 chưa thêm tạo hóa đơn khớp với cái 3 ở checkout
// import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
// import axios from 'axios';
// import { AuthContext } from './AuthContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const { token: authToken, logout } = useContext(AuthContext);
//     const [cart, setCart] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [token, setToken] = useState(authToken || localStorage.getItem('token') || '');

//     useEffect(() => {
//         setToken(authToken);
//     }, [authToken]);

//     const fetchCart = useCallback(async () => {
//         if (!token) {
//             toast.error('Vui lòng đăng nhập để xem giỏ hàng');
//             return;
//         }
//         setLoading(true);
//         try {
//             const response = await axios.get('https://localhost:7111/api/GioHang', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (response.data?.chiTietGioHang) {
//                 setCart(response.data);
//             } else {
//                 toast.error('Dữ liệu giỏ hàng không hợp lệ');
//                 setCart(null);
//             }
//         } catch (err) {
//             const status = err.response?.status;
//             if (status === 401) {
//                 toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
//                 logout?.();
//             } else if (status === 404) {
//                 toast.error('Giỏ hàng không tồn tại');
//             } else {
//                 toast.error(err.response?.data?.message || 'Lỗi khi lấy giỏ hàng');
//             }
//             setCart(null);
//         } finally {
//             setLoading(false);
//         }
//     }, [token, logout]);

//     const addToCart = useCallback(
//         async (productId, quantity) => {
//             if (!token) {
//                 toast.error('Vui lòng đăng nhập');
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const response = await axios.post(
//                     'https://localhost:7111/api/GioHang/them-san-pham',
//                     { maSanPham: productId, slSP: quantity },
//                     { headers: { Authorization: `Bearer ${token}` } },
//                 );
//                 await fetchCart();
//                 toast.success('Đã thêm sản phẩm vào giỏ hàng');
//                 return response.data;
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Lỗi khi thêm sản phẩm');
//                 throw err;
//             } finally {
//                 setLoading(false);
//             }
//         },
//         [token, fetchCart],
//     );

//     const removeFromCart = useCallback(
//         async (cartItemId) => {
//             if (!token) {
//                 toast.error('Vui lòng đăng nhập');
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const response = await axios.delete(`https://localhost:7111/api/GioHang/xoa-san-pham/${cartItemId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 await fetchCart();
//                 toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
//                 return response.data;
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Lỗi khi xóa sản phẩm');
//                 throw err;
//             } finally {
//                 setLoading(false);
//             }
//         },
//         [token, fetchCart],
//     );

//     const updateCartItemQuantity = useCallback(
//         async (cartItemId, quantity) => {
//             if (!token || quantity < 1) {
//                 toast.error('Số lượng không hợp lệ');
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const response = await axios.put(
//                     `https://localhost:7111/api/GioHang/cap-nhat-so-luong/${cartItemId}`,
//                     { slSP: quantity },
//                     { headers: { Authorization: `Bearer ${token}` } },
//                 );
//                 await fetchCart();
//                 toast.success('Đã cập nhật số lượng');
//                 return response.data;
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Lỗi khi cập nhật số lượng');
//                 throw err;
//             } finally {
//                 setLoading(false);
//             }
//         },
//         [token, fetchCart],
//     );

//     const value = useMemo(
//         () => ({ cart, loading, fetchCart, addToCart, removeFromCart, updateCartItemQuantity }),
//         [cart, loading, fetchCart, addToCart, removeFromCart, updateCartItemQuantity],
//     );

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

// 2

import React, { createContext, useState, useContext, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token: authToken, logout } = useContext(AuthContext);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(authToken || localStorage.getItem('token') || '');

    useEffect(() => {
        setToken(authToken);
    }, [authToken]);

    const fetchCart = useCallback(async () => {
        if (!token) {
            toast.error('Vui lòng đăng nhập để xem giỏ hàng');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get('https://localhost:7111/api/GioHang', {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data?.chiTietGioHang) {
                setCart(response.data);
            } else {
                toast.error('Dữ liệu giỏ hàng không hợp lệ');
                setCart(null);
            }
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                toast.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
                logout?.();
            } else if (status === 404) {
                toast.error('Giỏ hàng không tồn tại');
            } else {
                toast.error(err.response?.data?.message || 'Lỗi khi lấy giỏ hàng');
            }
            setCart(null);
        } finally {
            setLoading(false);
        }
    }, [token, logout]);

    const addToCart = useCallback(
        async (productId, quantity) => {
            if (!token) {
                toast.error('Vui lòng đăng nhập');
                return;
            }
            setLoading(true);
            try {
                const response = await axios.post(
                    'https://localhost:7111/api/GioHang/them-san-pham',
                    { maSanPham: productId, slSP: quantity },
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                await fetchCart();
                toast.success('Đã thêm sản phẩm vào giỏ hàng');
                return response.data;
            } catch (err) {
                toast.error(err.response?.data?.message || 'Lỗi khi thêm sản phẩm');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [token, fetchCart],
    );

    const removeFromCart = useCallback(
        async (cartItemId) => {
            if (!token) {
                toast.error('Vui lòng đăng nhập');
                return;
            }
            setLoading(true);
            try {
                const response = await axios.delete(`https://localhost:7111/api/GioHang/xoa-san-pham/${cartItemId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await fetchCart();
                toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
                return response.data;
            } catch (err) {
                toast.error(err.response?.data?.message || 'Lỗi khi xóa sản phẩm');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [token, fetchCart],
    );

    const updateCartItemQuantity = useCallback(
        async (cartItemId, quantity) => {
            if (!token || quantity < 1) {
                toast.error('Số lượng không hợp lệ');
                return;
            }
            setLoading(true);
            try {
                const response = await axios.put(
                    `https://localhost:7111/api/GioHang/cap-nhat-so-luong/${cartItemId}`,
                    { slSP: quantity },
                    { headers: { Authorization: `Bearer ${token}` } },
                );
                await fetchCart();
                toast.success('Đã cập nhật số lượng');
                return response.data;
            } catch (err) {
                toast.error(err.response?.data?.message || 'Lỗi khi cập nhật số lượng');
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [token, fetchCart],
    );
    // tạo đơn hàng
    const createOrder = useCallback(
        async (orderData) => {
            if (!token) {
                toast.error('Vui lòng đăng nhập để đặt hàng');
                throw new Error('Chưa đăng nhập');
            }
            setLoading(true);
            try {
                const response = await axios.post('https://localhost:7111/api/Order/tao-hoa-don', orderData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                await fetchCart(); // Cập nhật giỏ hàng sau khi tạo hóa đơn
                toast.success(`Tạo hóa đơn thành công! Mã hóa đơn: ${response.data.hoaDon.maHdb}`);
                return response.data;
            } catch (err) {
                const status = err.response?.status;
                let errorMessage = err.response?.data?.message || 'Lỗi khi tạo hóa đơn';
                if (status === 401) {
                    errorMessage = 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại';
                    logout?.();
                } else if (status === 400) {
                    errorMessage = err.response?.data?.message || 'Dữ liệu không hợp lệ';
                }
                toast.error(errorMessage);
                throw new Error(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [token, fetchCart, logout],
    );

    const value = useMemo(
        () => ({
            cart,
            loading,
            fetchCart,
            addToCart,
            removeFromCart,
            updateCartItemQuantity,
            createOrder,
        }),
        [cart, loading, fetchCart, addToCart, removeFromCart, updateCartItemQuantity, createOrder],
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
