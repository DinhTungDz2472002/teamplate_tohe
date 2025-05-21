import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setIsSubmitting(true);

        if (!email.includes('@')) {
            setError('Vui lòng nhập email hợp lệ.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('https://localhost:7111/api/KhachHang/forgot-password', {
                email,
            });
            setMessage(response.data.message);
            toast.success(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Có lỗi xảy ra khi gửi yêu cầu.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Quên Mật Khẩu</h2>
            {message && <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">{message}</div>}
            {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    {isSubmitting ? 'Đang gửi...' : 'Gửi Liên Kết Khôi Phục'}
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
