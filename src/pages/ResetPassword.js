import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsSubmitting(true);

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            setIsSubmitting(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('https://localhost:7111/api/KhachHang/reset-password', {
                token,
                password,
            });
            setMessage(response.data.message);
            toast.success(response.data.message);
            setTimeout(() => navigate('/login'), 2000); // Chuyển hướng đến trang đăng nhập sau 2 giây
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Có lỗi xảy ra khi đặt lại mật khẩu.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Đặt Lại Mật Khẩu</h2>
            {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">{message}</div>}
            {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Mật khẩu mới *
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Xác nhận mật khẩu *
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu'}
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
