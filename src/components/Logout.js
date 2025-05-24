import React, { useContext, useEffect } from 'react';
import { AuthContext } from '~/api/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Logout() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const doLogout = async () => {
            try {
                await logout();
                toast.success('Đăng xuất thành công');
                window.location.reload();
                navigate('/login'); // chuyển hướng về trang đăng nhập
            } catch (error) {
                toast.error('Lỗi khi đăng xuất');
                console.error(error);
            }
        };
        doLogout();
    }, [logout, navigate]);

    return null; // Không cần hiển thị gì
}

export default Logout;
