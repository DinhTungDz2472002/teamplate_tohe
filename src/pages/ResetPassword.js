// import React, { useState } from 'react';
// import axios from 'axios';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ResetPassword = () => {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();
//     const token = searchParams.get('token');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');
//         setIsSubmitting(true);

//         if (password.length < 6) {
//             setError('Mật khẩu phải có ít nhất 6 ký tự.');
//             setIsSubmitting(false);
//             return;
//         }

//         if (password !== confirmPassword) {
//             setError('Mật khẩu xác nhận không khớp.');
//             setIsSubmitting(false);
//             return;
//         }

//         try {
//             const response = await axios.post('https://localhost:7111/api/KhachHang/reset-password', {
//                 token,
//                 password,
//             });
//             setMessage(response.data.message);
//             toast.success(response.data.message);
//             setTimeout(() => navigate('/login'), 2000); // Chuyển hướng đến trang đăng nhập sau 2 giây
//         } catch (error) {
//             const errorMessage = error.response?.data?.error || 'Có lỗi xảy ra khi đặt lại mật khẩu.';
//             setError(errorMessage);
//             toast.error(errorMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
//             <div className="max-w-md w-full p-8 bg-white shadow-2xl rounded-xl transform transition-all duration-300 hover:shadow-3xl">
//                 <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Đặt Lại Mật Khẩu</h2>
//                 {message && (
//                     <div className="mb-4 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 animate-fade-in">
//                         {message}
//                     </div>
//                 )}
//                 {error && (
//                     <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-lg border border-green-200 animate-fade-in">
//                         {error}
//                     </div>
//                 )}
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                             Mật khẩu mới *
//                         </label>
//                         <input
//                             type="password"
//                             id="password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
//                             placeholder="Nhập mật khẩu mới"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                             Xác nhận mật khẩu *
//                         </label>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             name="confirmPassword"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
//                             placeholder="Xác nhận mật khẩu"
//                             required
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition duration-200 ease-in-out ${
//                             isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                         }`}
//                     >
//                         {isSubmitting ? (
//                             <div className="flex items-center justify-center">
//                                 <svg
//                                     className="animate-spin h-5 w-5 mr-2 text-white"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <circle
//                                         className="opacity-25"
//                                         cx="12"
//                                         cy="12"
//                                         r="10"
//                                         stroke="currentColor"
//                                         strokeWidth="4"
//                                     ></circle>
//                                     <path
//                                         className="opacity-75"
//                                         fill="currentColor"
//                                         d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
//                                     ></path>
//                                 </svg>
//                                 Đang xử lý...
//                             </div>
//                         ) : (
//                             'Đặt Lại Mật Khẩu'
//                         )}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ResetPassword;

// 2

import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Có lỗi xảy ra khi đặt lại mật khẩu.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-300">
            <div className="max-w-md w-full p-8 bg-white shadow-2xl rounded-xl transform transition-all duration-300 hover:shadow-3xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Đặt Lại Mật Khẩu</h2>
                {message && (
                    <div className="mb-4 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200 animate-fade-in">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200 animate-fade-in">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Mật khẩu mới *
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full py-4 pl-10 pr-12 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-gray-200 focus:bg-white caret-blue-600"
                            placeholder="Nhập mật khẩu mới"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible className="h-5 w-5" />
                            ) : (
                                <AiOutlineEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                            Xác nhận mật khẩu *
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full py-4 pl-10 pr-12 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-gray-200 focus:bg-white caret-blue-600"
                            placeholder="Xác nhận mật khẩu"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6 text-gray-500 hover:text-gray-700"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible className="h-5 w-5" />
                            ) : (
                                <AiOutlineEye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50 transition duration-200 ease-in-out ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="animate-spin h-5 w-5 mr-2 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                                    ></path>
                                </svg>
                                Đang xử lý...
                            </div>
                        ) : (
                            'Đặt Lại Mật Khẩu'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
