import React, { useContext, useEffect, useState } from 'react';
import { HoaDonContext } from '~/api/HoaDonContext';

const HoaDonDaHuy = () => {
    const { invoices, loading, fetchHoaDons } = useContext(HoaDonContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        fetchHoaDons(pageNumber, pageSize, 'DaHuy');
    }, [fetchHoaDons, pageNumber, pageSize]);

    if (loading) {
        return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
    }

    if (!invoices || !invoices.data) {
        return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;
    }

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= invoices.totalPages) {
            setPageNumber(newPage);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Danh sách hóa đơn đã hủy</h2>
            {invoices.data.length === 0 ? (
                <p className="text-center text-gray-600 text-xl">{invoices.message}</p>
            ) : (
                <div className="space-y-8">
                    {invoices.data.map((hoaDon) => (
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
                                                hoaDon.status === 'Đã Hủy' ? 'text-red-600' : 'text-blue-600'
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
                                                        src={
                                                            chiTiet.anhSp
                                                                ? `/assets/images/${chiTiet.anhSp}`
                                                                : '/assets/images/fallback.jpg'
                                                        }
                                                        alt={chiTiet.tenSanPham}
                                                        className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                                        onError={(e) => (e.target.src = '/assets/images/fallback.jpg')}
                                                    />
                                                </td>
                                                <td className="p-4 text-gray text-gray-600">{chiTiet.tenSanPham}</td>
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
            {invoices.data.length > 0 && (
                <div className="mt-8 flex justify-center space-x-4">
                    <button
                        onClick={() => handlePageChange(pageNumber - 1)}
                        disabled={pageNumber === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label="Trang trước"
                    >
                        Trang trước
                    </button>
                    <span className="px-4 py-2 text-gray-700" aria-current="page">
                        Trang {invoices.currentPage} / {invoices.totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(pageNumber + 1)}
                        disabled={pageNumber === invoices.totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        aria-label="Trang sau"
                    >
                        Trang sau
                    </button>
                </div>
            )}
        </div>
    );
};

export default HoaDonDaHuy;
