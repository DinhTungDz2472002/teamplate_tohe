// import React, { useContext, useEffect } from 'react';
// import { HoaDonContext } from '~/api/HoaDonContext';

// const Order = () => {
//     const { hoaDons, loading, fetchHoaDons } = useContext(HoaDonContext);

//     useEffect(() => {
//         fetchHoaDons();
//     }, [fetchHoaDons]);

//     if (loading) return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
//     if (!hoaDons) return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Danh sách hóa đơn</h2>
//             {hoaDons.hoaDons.length === 0 ? (
//                 <p className="text-center text-gray-600 text-lg">{hoaDons.message}</p>
//             ) : (
//                 <div className="space-y-6">
//                     {hoaDons.hoaDons.map((hoaDon) => (
//                         <div
//                             key={hoaDon.maHdb}
//                             className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
//                         >
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-700">
//                                         Mã HĐ: <span className="font-normal">{hoaDon.maHdb}</span>
//                                     </p>
//                                     <p className="text-gray-600">
//                                         Ngày lập:{' '}
//                                         <span className="font-normal">
//                                             {new Date(hoaDon.ngayLapHdb).toLocaleDateString()}
//                                         </span>
//                                     </p>
//                                     <p className="text-gray-600">
//                                         Tên khách hàng: <span className="font-normal">{hoaDon.tenKhachHang}</span>
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p className="text-lg font-semibold text-gray-700">
//                                         Tổng tiền:{' '}
//                                         <span className="font-normal text-green-600">
//                                             {hoaDon.tongTienHdb.toLocaleString()} VNĐ
//                                         </span>
//                                     </p>
//                                     <p className="text-gray-600">
//                                         Trạng thái:{' '}
//                                         <span
//                                             className={`font-normal ${
//                                                 hoaDon.status === 'Chờ xác nhận' ? 'text-yellow-500' : 'text-blue-500'
//                                             }`}
//                                         >
//                                             {hoaDon.status}
//                                         </span>
//                                     </p>
//                                     <p className="text-gray-600">
//                                         Số điện thoại: <span className="font-normal">{hoaDon.sdt}</span>
//                                     </p>
//                                 </div>
//                             </div>
//                             <p className="text-gray-600 mb-4">
//                                 Địa chỉ nhận: <span className="font-normal">{hoaDon.diaChi}</span>
//                             </p>
//                             <h3 className="text-xl font-semibold text-gray-800 mb-3">Chi tiết hóa đơn</h3>
//                             <div className="overflow-x-auto">
//                                 <table className="w-full text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-200">
//                                             <th className="p-3 text-gray-700 font-semibold">Sản phẩm</th>
//                                             <th className="p-3 text-gray-700 font-semibold">Số lượng</th>
//                                             <th className="p-3 text-gray-700 font-semibold">Thành tiền</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {hoaDon.chiTietHoaDon.map((chiTiet) => (
//                                             <tr key={chiTiet.maSanPham} className="border-b hover:bg-gray-50">
//                                                 <td className="p-3 text-gray-600">{chiTiet.tenSanPham}</td>
//                                                 <td className="p-3 text-gray-600">{chiTiet.sl}</td>
//                                                 <td className="p-3 text-gray-600">
//                                                     {chiTiet.thanhTien.toLocaleString()} VNĐ
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Order;
import React, { useContext, useEffect } from 'react';
import { OrderContext } from '~/api/OrderContext';

const Order = () => {
    const { hoaDons, loading, fetchHoaDons } = useContext(OrderContext);

    useEffect(() => {
        fetchHoaDons();
    }, [fetchHoaDons]);

    if (loading) return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
    if (!hoaDons) return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;

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
