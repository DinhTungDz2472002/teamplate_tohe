import React, { useContext, useEffect } from 'react';
import { OrderContext } from '~/api/OrderContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Order = () => {
    const { hoaDons, loading, fetchHoaDons } = useContext(OrderContext);

    useEffect(() => {
        fetchHoaDons();
    }, [fetchHoaDons]);

    if (loading) return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
    if (!hoaDons) return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;
    const handleEditStatus_Hdb = async (maHdb, endpoint, newstatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Vui lòng đăng nhập để thực hiện hành động này.');
                return;
            }
            const response = await axios.put(`https://localhost:7111/api/Hdb/${endpoint}?maHdb=${maHdb}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchHoaDons();
            toast.success(` ${newstatus}`);
        } catch (error) {
            console.error('Error updating status:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Danh sách hóa đơn</h2>
            {hoaDons.hoaDons.length === 0 ? (
                <p className="text-center text-gray-600 text-xl">{hoaDons.message}</p>
            ) : (
                <div className="space-y-8">
                    {hoaDons.hoaDons.map((hoaDon) => (
                        <div
                            key={hoaDon.maHdb}
                            className="bg-white shadow-md rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <p className="text-lg font-semibold text-gray-800">
                                        Mã HĐ: <span className="font-normal text-gray-600">{hoaDon.maHdb}</span>
                                    </p>
                                    <p className="text-gray-600">
                                        Ngày lập:{' '}
                                        <span className="font-normal">
                                            {new Date(hoaDon.ngayLapHdb).toLocaleDateString()}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Tên khách hàng: <span className="font-normal">{hoaDon.tenKhachHang}</span>
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-lg font-semibold text-gray-800">
                                        Tổng tiền:{' '}
                                        <span className="font-normal text-green-600">
                                            {hoaDon.tongTienHdb.toLocaleString()} VNĐ
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Trạng thái:{' '}
                                        <span
                                            className={`font-normal ${
                                                hoaDon.status === 'Chờ xác nhận' ? 'text-yellow-600' : 'text-blue-600'
                                            }`}
                                        >
                                            {hoaDon.status}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Số điện thoại: <span className="font-normal">{hoaDon.sdt}</span>
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Địa chỉ nhận: <span className="font-normal">{hoaDon.diaChi}</span>
                            </p>
                            <div className="flex space-x-4 mb-6">
                                <button
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    onClick={() =>
                                        handleEditStatus_Hdb(hoaDon.maHdb, 'UpdateKhachMuonHuy', 'Đã Hủy Thành Công')
                                    }
                                >
                                    Hủy Đơn
                                </button>
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Chi tiết hóa đơn</h3>
                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="p-4 text-gray-700 font-semibold">Ảnh sản phẩm</th>
                                            <th className="p-4 text-gray-700 font-semibold">Sản phẩm</th>
                                            <th className="p-4 text-gray-700 font-semibold">Số lượng</th>
                                            <th className="p-4 text-gray-700 font-semibold">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hoaDon.chiTietHoaDon.map((chiTiet) => (
                                            <tr
                                                key={chiTiet.maSanPham}
                                                className="border-b hover:bg-gray-50 transition-colors"
                                            >
                                                <td className="p-4">
                                                    <img
                                                        src={`/assets/images/${chiTiet.anhSp}`}
                                                        alt={chiTiet.tenSanPham}
                                                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                                    />
                                                </td>
                                                <td className="p-4 text-gray-600">{chiTiet.tenSanPham}</td>
                                                <td className="p-4 text-gray-600">{chiTiet.sl}</td>
                                                <td className="p-4 text-gray-600">
                                                    {chiTiet.thanhTien.toLocaleString()} VNĐ
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
