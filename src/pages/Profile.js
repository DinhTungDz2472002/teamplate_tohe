import React, { useContext, useState } from 'react';
import { AuthContext } from '~/api/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Profile = () => {
    const { user, token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: '',
        tenKhachHang: '',
        diaChi: '',
        soDienThoai: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    // Cập nhật formData khi user được load
    React.useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                tenKhachHang: user.tenKhachHang || '',
                diaChi: user.diaChi || '',
                soDienThoai: user.sdt || '',
                email: user.email || '',
            });
        }
    }, [user]);

    // Xử lý thay đổi input cho thông tin người dùng
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi input cho đổi mật khẩu
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý lưu thông tin người dùng
    const handleSave = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.put(
                `https://localhost:7111/api/KhachHang/${user.maKhachHang}`,
                {
                    username: formData.username,
                    tenKhachHang: formData.tenKhachHang,
                    diaChi: formData.diaChi,
                    soDienThoai: formData.soDienThoai,
                    email: formData.email,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setSuccess(response.data.message || 'Cập nhật thông tin thành công!');
            toast.success('Cập nhật thông tin thành công!');
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi khi cập nhật thông tin. Vui lòng thử lại.');
            toast.error(err.response?.data?.message || 'Lỗi khi cập nhật thông tin.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Xử lý đổi mật khẩu
    const handleChangePassword = async () => {
        // Kiểm tra đầu vào
        if (!passwordData.oldPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
            setError('Vui lòng điền đầy đủ các trường mật khẩu.');
            return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await axios.put(
                `https://localhost:7111/api/KhachHang/change-password`,
                {
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );
            setSuccess(response.data.message || 'Đổi mật khẩu thành công!');
            toast.success('Đổi mật khẩu thành công!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setShowPasswordModal(false);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Lỗi khi đổi mật khẩu. Vui lòng thử lại.';
            setError(errorMessage);
            toast.error(errorMessage);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Hàm toggle hiển thị mật khẩu
    const toggleShowPassword = (field) => {
        setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl text-gray-500">Đang tải thông tin...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h1 className="text-3xl font-bold text-center mb-8">Thông Tin Người Dùng</h1>
            <div className="bg-white shadow-md rounded-lg p-6 bg-gradient-to-br from-orange-100 to-blue-300">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Tên Khách Hàng</label>
                    <input
                        type="text"
                        name="tenKhachHang"
                        value={formData.tenKhachHang}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập tên khách hàng"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Địa Chỉ</label>
                    <input
                        type="text"
                        name="diaChi"
                        value={formData.diaChi}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập địa chỉ"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Số Điện Thoại</label>
                    <input
                        type="text"
                        name="soDienThoai"
                        value={formData.soDienThoai}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập số điện thoại"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập email"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <div className="flex space-x-4">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className={`flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Đang lưu...' : 'Lưu'}
                    </button>
                    <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Đổi Mật Khẩu
                    </button>
                </div>
            </div>

            {/* Modal đổi mật khẩu */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Đổi Mật Khẩu</h2>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-semibold mb-2">Mật Khẩu Cũ</label>
                            <input
                                type={showPasswords.oldPassword ? 'text' : 'password'}
                                name="oldPassword"
                                value={passwordData.oldPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Nhập mật khẩu cũ"
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('oldPassword')}
                                className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
                            >
                                {showPasswords.oldPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-semibold mb-2">Mật Khẩu Mới</label>
                            <input
                                type={showPasswords.newPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Nhập mật khẩu mới"
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('newPassword')}
                                className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
                            >
                                {showPasswords.newPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="mb-4 relative">
                            <label className="block text-gray-700 font-semibold mb-2">Xác Nhận Mật Khẩu Mới</label>
                            <input
                                type={showPasswords.confirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                placeholder="Xác nhận mật khẩu mới"
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('confirmPassword')}
                                className="absolute right-3 top-10 text-gray-600 hover:text-gray-800"
                            >
                                {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        {success && <p className="text-green-500 mb-4">{success}</p>}
                        <div className="flex space-x-4">
                            <button
                                onClick={handleChangePassword}
                                disabled={loading}
                                className={`flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    loading ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {loading ? 'Đang đổi...' : 'Xác Nhận'}
                            </button>
                            <button
                                onClick={() => {
                                    setShowPasswordModal(false);
                                    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                    setError(null);
                                    setSuccess(null);
                                }}
                                className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
