// import React, { useContext, useEffect, useState } from 'react';
// import { HoaDonContext } from '~/api/HoaDonContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import Pagination from '~/components/Pagination';
// const HoaDonDaGiao = () => {
//     const { invoices, loading, fetchHoaDons } = useContext(HoaDonContext);

//     const [pageNumber, setPageNumber] = useState(1);
//     const [pageSize, setPageSize] = useState(8);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         fetchHoaDons(pageNumber, pageSize, 'DaGiao');
//         if (invoices?.totalItems) {
//             setTotalPages(Math.ceil(invoices.totalItems / pageSize) || 1);
//         } else {
//             setTotalPages(1);
//         }
//     }, [fetchHoaDons, pageNumber, pageSize]);

//     if (loading) {
//         return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
//     }

//     if (!invoices || !invoices.data) {
//         return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;
//     }

//     const handleEditStatus_Hdb = async (maHdb, endpoint, newstatus) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 toast.error('Vui lòng đăng nhập để thực hiện hành động này.');
//                 return;
//             }
//             const response = await axios.put(`https://localhost:7111/api/Hdb/${endpoint}?maHdb=${maHdb}`, null, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             console.log(maHdb, endpoint);
//             if (response.status === 200) {
//                 // Refresh the invoice list after successful update
//                 fetchHoaDons(pageNumber, pageSize, 'DaGiao');
//                 toast.success(` ${newstatus}`);
//             }
//         } catch (error) {
//             console.error('Error updating status:', error);
//             const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái.';
//             toast.error(errorMessage);
//         }
//     };
//     const handleChangePage = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPageNumber(newPage);
//         }
//     };

//     const handleChangePageSize = (e) => {
//         const newSize = parseInt(e.target.value) || 8;
//         setPageSize(newSize);
//         setPageNumber(1);
//     };
//     return (
//         <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
//             {/* Page Size Selector */}
//             <div className="flex items-center gap-2 w-full sm:w-52 sm:ml-auto">
//                 <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Hiển thị:</span>
//                 <select
//                     value={pageSize}
//                     onChange={handleChangePageSize}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
//                 >
//                     {[8, 12, 16, 20].map((size) => (
//                         <option key={size} value={size}>
//                             {size} Sản phẩm
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Danh sách hóa đơn đã giao</h2>
//             {invoices.data.length === 0 ? (
//                 <p className="text-center text-gray-600 text-xl">{invoices.message}</p>
//             ) : (
//                 <div className="space-y-8">
//                     {invoices.data.map((hoaDon) => (
//                         <div
//                             key={hoaDon.maHdb}
//                             className="bg-white shadow-md rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
//                         >
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                                 <div className="space-y-2">
//                                     <p className="text-lg font-semibold text-gray-800">
//                                         Mã HĐ: <span className="font-normal text-gray-600">{hoaDon.maHdb}</span>
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
//                                 <div className="space-y-2">
//                                     <p className="text-lg font-semibold text-gray-800">
//                                         Tổng tiền:{' '}
//                                         <span className="font-normal text-green-600">
//                                             {hoaDon.tongTienHdb.toLocaleString()} VNĐ
//                                         </span>
//                                     </p>
//                                     <p className="text-gray-600">
//                                         Trạng thái:{' '}
//                                         <span
//                                             className={`font-normal ${
//                                                 hoaDon.status === 'Đã Giao' ? 'text-green-600' : 'text-blue-600'
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
//                             <p className="text-gray-600 mb-6">
//                                 Địa chỉ nhận: <span className="font-normal">{hoaDon.diaChi}</span>
//                             </p>
//                             <div className="flex space-x-4 mb-6">
//                                 {/* <button
//                                     className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
//                                     onClick={() =>
//                                         handleEditStatus_Hdb(hoaDon.maHdb, 'UpdateDaHuy', 'Đã Hủy Thành Công')
//                                     }
//                                 >
//                                     Chuyển Trạng Thái Hủy
//                                 </button> */}
//                             </div>
//                             <h3 className="text-2xl font-semibold text-gray-900 mb-4">Chi tiết hóa đơn</h3>
//                             <div className="overflow-x-auto rounded-lg border border-gray-200">
//                                 <table className="w-full text-left border-collapse">
//                                     <thead>
//                                         <tr className="bg-gray-100">
//                                             <th className="p-4 text-gray-700 font-semibold">Ảnh sản phẩm</th>
//                                             <th className="p-4 text-gray-700 font-semibold">Sản phẩm</th>
//                                             <th className="p-4 text-gray-700 font-semibold">Số lượng</th>
//                                             <th className="p-4 text-gray-700 font-semibold">Thành tiền</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {hoaDon.chiTietHoaDon.map((chiTiet) => (
//                                             <tr
//                                                 key={chiTiet.maSanPham}
//                                                 className="border-b hover:bg-gray-50 transition-colors"
//                                             >
//                                                 <td className="p-4">
//                                                     <img
//                                                         src={
//                                                             chiTiet.anhSp
//                                                                 ? `/assets/images/${chiTiet.anhSp}`
//                                                                 : '/assets/images/fallback.jpg'
//                                                         }
//                                                         alt={chiTiet.tenSanPham}
//                                                         className="w-12 h-12 object-cover rounded-md border border-gray-200"
//                                                         onError={(e) => (e.target.src = '/assets/images/fallback.jpg')}
//                                                     />
//                                                 </td>
//                                                 <td className="p-4 text-gray-600">{chiTiet.tenSanPham}</td>
//                                                 <td className="p-4 text-gray-600">{chiTiet.sl}</td>
//                                                 <td className="p-4 text-gray-600">
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
//             <div className="flex justify-center mt-8">
//                 <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
//             </div>
//         </div>
//     );
// };

// export default HoaDonDaGiao;

// 2
import React, { useContext, useEffect, useState } from 'react';
import { HoaDonContext } from '~/api/HoaDonContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Pagination from '~/components/Pagination';

const HoaDonDaGiao = () => {
    const { invoices, loading, fetchHoaDons } = useContext(HoaDonContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [showViewReviewModal, setShowViewReviewModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviewStatus, setReviewStatus] = useState({}); // Store review status for each maChiTietHdb

    useEffect(() => {
        fetchHoaDons(pageNumber, pageSize, 'DaGiao');
        setTotalPages(invoices?.totalItems ? Math.ceil(invoices.totalItems / pageSize) : 1);
    }, [fetchHoaDons, pageNumber, pageSize, invoices?.totalItems]);

    // Check review status for each order detail
    useEffect(() => {
        const checkReviews = async () => {
            if (!invoices?.data) return;

            const token = localStorage.getItem('token');
            if (!token) return;

            const newReviewStatus = {};
            for (const hoaDon of invoices.data) {
                for (const chiTiet of hoaDon.chiTietHoaDon) {
                    try {
                        const maChiTietHdb = chiTiet.maChiTietHdb || chiTiet.maSanPham; // Fallback to maSanPham
                        const params = new URLSearchParams({
                            maChiTietHdb,
                            maSanPham: chiTiet.maSanPham,
                            maKhachHang: hoaDon.maKhachHang,
                        });
                        const response = await axios.get(
                            `https://localhost:7111/api/DanhGia/list?${params.toString()}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        );
                        newReviewStatus[maChiTietHdb] = response.data?.length > 0;
                    } catch (error) {
                        console.error('Error checking review status:', error);
                        newReviewStatus[chiTiet.maChiTietHdb || chiTiet.maSanPham] = false;
                    }
                }
            }
            setReviewStatus(newReviewStatus);
        };

        checkReviews();
    }, [invoices?.data]);

    const handleViewReview = async (maChiTietHdb, maSanPham, maKhachHang) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return toast.error('Vui lòng đăng nhập để xem đánh giá.');

            const params = new URLSearchParams({ maChiTietHdb, maSanPham, maKhachHang });
            const response = await axios.get(`https://localhost:7111/api/DanhGia/list?${params.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 && response.data?.length > 0) {
                setSelectedReview(response.data[0]);
                setShowViewReviewModal(true);
            } else {
                toast.info('Chưa có đánh giá cho sản phẩm này.');
            }
        } catch (error) {
            console.error('Error fetching review:', error);
            toast.error(error.response?.data?.error || 'Có lỗi khi xem đánh giá.');
        }
    };

    const handleEditStatus_Hdb = async (maHdb, endpoint, newstatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Vui lòng đăng nhập để thực hiện hành động này.');
                return;
            }
            const response = await axios.put(`https://localhost:7111/api/Hdb/${endpoint}?maHdb=${maHdb}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                fetchHoaDons(pageNumber, pageSize, 'DaGiao');
                toast.success(`${newstatus}`);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái.';
            toast.error(errorMessage);
        }
    };

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) setPageNumber(newPage);
    };

    const handleChangePageSize = (e) => {
        setPageSize(parseInt(e.target.value) || 8);
        setPageNumber(1);
    };

    if (loading) return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
    if (!invoices?.data) return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;

    return (
        <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="flex items-center gap-2 w-full sm:w-52 sm:ml-auto">
                <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Hiển thị:</span>
                <select
                    value={pageSize}
                    onChange={handleChangePageSize}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
                >
                    {[8, 12, 16, 20].map((size) => (
                        <option key={size} value={size}>
                            {size} Sản phẩm
                        </option>
                    ))}
                </select>
            </div>

            <h2 className="text-4xl font-bold text-center text-gray-900 mb-10">Danh sách hóa đơn đã giao</h2>
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
                                    <p className="text-gray-600 mb-6">
                                        Phương thức thanh toán:
                                        <span
                                            className={
                                                hoaDon.pttt === 'Đã thanh toán qua VnPay'
                                                    ? 'text-green-600'
                                                    : hoaDon.pttt === 'Chờ thanh toán'
                                                    ? 'text-orange-600'
                                                    : hoaDon.pttt === 'COD'
                                                    ? 'text-red-600'
                                                    : 'text-blue-600'
                                            }
                                        >
                                            {hoaDon.pttt}
                                        </span>
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
                                                hoaDon.status === 'Đã Giao' ? 'text-green-600' : 'text-blue-600'
                                            }`}
                                        >
                                            {hoaDon.status}
                                        </span>
                                    </p>
                                    <p className="text-gray-600">
                                        Số điện thoại: <span className="font-normal">{hoaDon.sdt}</span>
                                    </p>
                                    <p className="text-gray-600 mb-6">
                                        Địa chỉ nhận: <span className="font-normal">{hoaDon.diaChi}</span>
                                    </p>
                                </div>
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
                                            <th className="p-4 text-gray-700 font-semibold">Xem đánh giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hoaDon.chiTietHoaDon.map((chiTiet) => {
                                            const maChiTietHdb = chiTiet.maChiTietHdb || chiTiet.maSanPham; // Fallback to maSanPham
                                            return (
                                                <tr
                                                    key={maChiTietHdb}
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
                                                            onError={(e) =>
                                                                (e.target.src = '/assets/images/fallback.jpg')
                                                            }
                                                        />
                                                    </td>
                                                    <td className="p-4 text-gray-600">{chiTiet.tenSanPham}</td>
                                                    <td className="p-4 text-gray-600">{chiTiet.sl}</td>
                                                    <td className="p-4 text-gray-600">
                                                        {chiTiet.thanhTien.toLocaleString()} VNĐ
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {reviewStatus[maChiTietHdb] && (
                                                            <button
                                                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                                onClick={() =>
                                                                    handleViewReview(
                                                                        maChiTietHdb,
                                                                        chiTiet.maSanPham,
                                                                        hoaDon.maKhachHang,
                                                                    )
                                                                }
                                                            >
                                                                Xem đánh giá
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showViewReviewModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Thông tin đánh giá</h3>
                        {selectedReview ? (
                            <div className="space-y-4">
                                <p>
                                    <strong>Sản phẩm:</strong> {selectedReview.sanPham?.tenSanPham || 'N/A'} (Mã SP:{' '}
                                    {selectedReview.sanPham?.maSanPham || 'N/A'})
                                </p>
                                <img
                                    src={
                                        selectedReview.sanPham?.anhSp
                                            ? `/assets/images/${selectedReview.sanPham.anhSp}`
                                            : '/assets/images/fallback.jpg'
                                    }
                                    alt={selectedReview.sanPham?.tenSanPham || 'Sản phẩm'}
                                    className="w-24 h-auto rounded-md border border-gray-200"
                                    onError={(e) => (e.target.src = '/assets/images/fallback.jpg')}
                                />
                                <p>
                                    <strong>Mã đánh giá:</strong> {selectedReview.maDg}
                                </p>
                                <p>
                                    <strong>Mã khách hàng:</strong> {selectedReview.maKhachHang}
                                </p>
                                <p>
                                    <strong>Mã chi tiết HĐB:</strong> {selectedReview.maChiTietHdb}
                                </p>
                                <p>
                                    <strong>Đánh giá:</strong> {selectedReview.danhGia} sao
                                </p>
                                <p>
                                    <strong>Bình luận:</strong> {selectedReview.binhLuan || 'Không có bình luận'}
                                </p>
                                <p>
                                    <strong>Ngày đánh giá:</strong>{' '}
                                    {new Date(selectedReview.ngayDanhGia).toLocaleDateString('vi-VN')}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-600">Không tìm thấy đánh giá.</p>
                        )}
                        <div className="flex justify-end mt-6">
                            <button
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                                onClick={() => {
                                    setShowViewReviewModal(false);
                                    setSelectedReview(null);
                                }}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>
        </div>
    );
};

export default HoaDonDaGiao;
