// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Pagination from '~/components/Pagination';
// import { DsOrderContext } from '~/api/DsOrderContext';
// import Combobox from './Combobox';

// const OrderDaGiao = () => {
//     const { invoices, loading, fetchOrders } = useContext(DsOrderContext);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [pageSize, setPageSize] = useState(8);
//     const [totalPages, setTotalPages] = useState(1);
//     const [showViewReviewModal, setShowViewReviewModal] = useState(false);
//     const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
//     const [selectedReview, setSelectedReview] = useState(null);
//     const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
//     const [reviewForm, setReviewForm] = useState({ danhGia: 5, binhLuan: '' });

//     useEffect(() => {
//         fetchOrders(pageNumber, pageSize, 'DaGiao');
//         setTotalPages(invoices?.totalItems ? Math.ceil(invoices.totalItems / pageSize) : 1);
//     }, [fetchOrders, pageNumber, pageSize, invoices?.totalItems]);

//     const handleViewReview = async (maChiTietHdb, maSanPham, maKhachHang) => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) return toast.error('Vui lòng đăng nhập để xem đánh giá.');

//             const params = new URLSearchParams({ maChiTietHdb, maSanPham, maKhachHang });
//             const response = await axios.get(`https://localhost:7111/api/DanhGia/list?${params.toString()}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (response.status === 200 && response.data?.length > 0) {
//                 setSelectedReview(response.data[0]);
//                 setShowViewReviewModal(true);
//             } else {
//                 toast.info('Chưa có đánh giá cho sản phẩm này.');
//             }
//         } catch (error) {
//             console.error('Error fetching review:', error);
//             toast.error(error.response?.data?.error || 'Có lỗi khi xem đánh giá.');
//         }
//     };

//     const openCreateReviewModal = (chiTiet, maKhachHang) => {
//         setSelectedOrderDetail({
//             maChiTietHdb: chiTiet.maChiTietHdb || chiTiet.MaChiTietHdb,
//             maSanPham: chiTiet.maSanPham || chiTiet.MaSanPham,
//             maKhachHang,
//             tenSanPham: chiTiet.tenSanPham,
//         });
//         setShowCreateReviewModal(true);
//     };

//     const handleCreateReview = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) return toast.error('Vui lòng đăng nhập để thêm đánh giá.');

//             const { maChiTietHdb, maSanPham, maKhachHang } = selectedOrderDetail || {};
//             if (!maChiTietHdb || !maSanPham || !maKhachHang) {
//                 return toast.error('Thiếu thông tin chi tiết đơn hàng.');
//             }

//             const payload = {
//                 maChiTietHdb,
//                 maSanPham,
//                 maKhachHang,
//                 danhGia: reviewForm.danhGia,
//                 binhLuan: reviewForm.binhLuan || null,
//             };

//             const response = await axios.post('https://localhost:7111/api/DanhGia/create', payload, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (response.status === 200) {
//                 toast.success('Đánh giá đã được thêm thành công!');
//                 setShowCreateReviewModal(false);
//                 setReviewForm({ danhGia: 5, binhLuan: '' });
//                 setSelectedOrderDetail(null);
//                 fetchOrders(pageNumber, pageSize, 'DaGiao');
//             }
//         } catch (error) {
//             console.error('Error creating review:', error);
//             toast.error(error.response?.data?.message || 'Có lỗi khi thêm đánh giá.');
//         }
//     };

//     const handleChangePage = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) setPageNumber(newPage);
//     };

//     const handleChangePageSize = (e) => {
//         setPageSize(parseInt(e.target.value) || 8);
//         setPageNumber(1);
//     };

//     if (loading) return <p className="text-center text-gray-500 text-lg">Đang tải...</p>;
//     if (!invoices?.data) return <p className="text-center text-red-500 text-lg">Không có dữ liệu</p>;

//     return (
//         <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">
//             <div className="flex justify-between items-center gap-4 mb-8">
//                 <Combobox />
//                 <select
//                     value={pageSize}
//                     onChange={handleChangePageSize}
//                     className="w-[180px] px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
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
//                         <div key={hoaDon.maHdb} className="bg-white shadow-md rounded-xl p-8 border">
//                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//                                 <div>
//                                     <p className="text-lg font-semibold">
//                                         Mã HĐ: <span className="font-normal">{hoaDon.maHdb}</span>
//                                     </p>
//                                     <p>Ngày lập: {new Date(hoaDon.ngayLapHdb).toLocaleDateString()}</p>
//                                     <p>Tên khách hàng: {hoaDon.tenKhachHang}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-lg font-semibold">
//                                         Tổng tiền:{' '}
//                                         <span className="text-green-600">
//                                             {hoaDon.tongTienHdb.toLocaleString()} VNĐ
//                                         </span>
//                                     </p>
//                                     <p>
//                                         Trạng thái:{' '}
//                                         <span
//                                             className={
//                                                 hoaDon.status === 'Chờ xác nhận' ? 'text-yellow-600' : 'text-blue-600'
//                                             }
//                                         >
//                                             {hoaDon.status}
//                                         </span>
//                                     </p>
//                                     <p>Số điện thoại: {hoaDon.sdt}</p>
//                                 </div>
//                             </div>
//                             <p className="mb-6">Địa chỉ nhận: {hoaDon.diaChi}</p>
//                             <h3 className="text-2xl font-semibold mb-4">Chi tiết hóa đơn</h3>
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-gray-100">
//                                         <th className="p-4">Ảnh sản phẩm</th>
//                                         <th className="p-4">Sản phẩm</th>
//                                         <th className="p-4">Số lượng</th>
//                                         <th className="p-4">Thành tiền</th>
//                                         <th className="p-4">Đánh giá</th>
//                                         <th className="p-4">Xem đánh giá</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {hoaDon.chiTietHoaDon.map((chiTiet) => (
//                                         <tr key={chiTiet.maChiTietHdb} className="border-b hover:bg-gray-50">
//                                             <td className="p-4">
//                                                 <img
//                                                     src={
//                                                         chiTiet.anhSp
//                                                             ? `/assets/images/${chiTiet.anhSp}`
//                                                             : '/assets/images/fallback.jpg'
//                                                     }
//                                                     alt={chiTiet.tenSanPham}
//                                                     className="w-12 h-12 object-cover rounded-md border"
//                                                     onError={(e) => (e.target.src = '/assets/images/fallback.jpg')}
//                                                 />
//                                             </td>
//                                             <td className="p-4">{chiTiet.tenSanPham}</td>
//                                             <td className="p-4">{chiTiet.sl}</td>
//                                             <td className="p-4">{chiTiet.thanhTien.toLocaleString()} VNĐ</td>
//                                             <td className="p-4">
//                                                 <button
//                                                     className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
//                                                     onClick={() => openCreateReviewModal(chiTiet, hoaDon.maKhachHang)}
//                                                 >
//                                                     Đánh giá
//                                                 </button>
//                                             </td>
//                                             <td className="p-4">
//                                                 <button
//                                                     className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
//                                                     onClick={() =>
//                                                         handleViewReview(
//                                                             chiTiet.maChiTietHdb,
//                                                             chiTiet.maSanPham,
//                                                             hoaDon.maKhachHang,
//                                                         )
//                                                     }
//                                                 >
//                                                     Xem đánh giá
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {showViewReviewModal && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h3 className="text-xl font-semibold mb-4">Thông tin đánh giá</h3>
//                         {selectedReview ? (
//                             <div className="space-y-4">
//                                 <p>
//                                     <strong>Sản phẩm:</strong> {selectedReview.sanPham?.tenSanPham || 'N/A'} (Mã SP:{' '}
//                                     {selectedReview.sanPham?.maSanPham || 'N/A'})
//                                 </p>
//                                 <img
//                                     src={
//                                         selectedReview.sanPham?.anhSp
//                                             ? `/assets/images/${selectedReview.sanPham.anhSp}`
//                                             : '/assets/images/fallback.jpg'
//                                     }
//                                     alt={selectedReview.sanPham?.tenSanPham || 'Sản phẩm'}
//                                     className="w-24 h-auto rounded-md border"
//                                     onError={(e) => (e.target.src = '/assets/images/fallback.jpg')}
//                                 />
//                                 <p>
//                                     <strong>Mã đánh giá:</strong> {selectedReview.maDg}
//                                 </p>
//                                 <p>
//                                     <strong>Mã khách hàng:</strong> {selectedReview.maKhachHang}
//                                 </p>
//                                 <p>
//                                     <strong>Mã chi tiết HĐB:</strong> {selectedReview.maChiTietHdb}
//                                 </p>
//                                 <p>
//                                     <strong>Đánh giá:</strong> {selectedReview.danhGia} sao
//                                 </p>
//                                 <p>
//                                     <strong>Bình luận:</strong> {selectedReview.binhLuan || 'Không có bình luận'}
//                                 </p>
//                                 <p>
//                                     <strong>Ngày đánh giá:</strong>{' '}
//                                     {new Date(selectedReview.ngayDanhGia).toLocaleDateString('vi-VN')}
//                                 </p>
//                             </div>
//                         ) : (
//                             <p className="text-gray-600">Không tìm thấy đánh giá.</p>
//                         )}
//                         <button
//                             className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg mt-6"
//                             onClick={() => {
//                                 setShowViewReviewModal(false);
//                                 setSelectedReview(null);
//                             }}
//                         >
//                             Đóng
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {showCreateReviewModal && selectedOrderDetail && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg p-6 w-full max-w-md">
//                         <h3 className="text-xl font-semibold mb-4">Thêm đánh giá</h3>
//                         <form onSubmit={handleCreateReview} className="space-y-4">
//                             <div>
//                                 <label className="block font-medium mb-2">Sản phẩm:</label>
//                                 <p>
//                                     {selectedOrderDetail.tenSanPham} (Mã SP: {selectedOrderDetail.maSanPham})
//                                 </p>
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2">Mã chi tiết HĐB:</label>
//                                 <p>{selectedOrderDetail.maChiTietHdb}</p>
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2">Đánh giá (1-5 sao):</label>
//                                 <select
//                                     value={reviewForm.danhGia}
//                                     onChange={(e) =>
//                                         setReviewForm({ ...reviewForm, danhGia: parseInt(e.target.value) })
//                                     }
//                                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                                 >
//                                     {[1, 2, 3, 4, 5].map((star) => (
//                                         <option key={star} value={star}>
//                                             {star} sao
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block font-medium mb-2">Bình luận:</label>
//                                 <textarea
//                                     value={reviewForm.binhLuan}
//                                     onChange={(e) => setReviewForm({ ...reviewForm, binhLuan: e.target.value })}
//                                     className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
//                                     rows="4"
//                                     placeholder="Nhập bình luận của bạn..."
//                                 />
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
//                                     onClick={() => {
//                                         setShowCreateReviewModal(false);
//                                         setSelectedOrderDetail(null);
//                                         setReviewForm({ danhGia: 5, binhLuan: '' });
//                                     }}
//                                 >
//                                     Hủy
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
//                                 >
//                                     Gửi đánh giá
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             <div className="flex justify-center mt-8">
//                 <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
//             </div>
//         </div>
//     );
// };

// export default OrderDaGiao;

// 2
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from '~/components/Pagination';
import { DsOrderContext } from '~/api/DsOrderContext';
import Combobox from './Combobox';

const OrderDaGiao = () => {
    const { invoices, loading, fetchOrders } = useContext(DsOrderContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [showViewReviewModal, setShowViewReviewModal] = useState(false);
    const [showCreateReviewModal, setShowCreateReviewModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);
    const [reviewForm, setReviewForm] = useState({ danhGia: 5, binhLuan: '' });
    const [reviewStatus, setReviewStatus] = useState({}); // Store review status for each maChiTietHdb

    useEffect(() => {
        fetchOrders(pageNumber, pageSize, 'DaGiao');
        setTotalPages(invoices?.totalItems ? Math.ceil(invoices.totalItems / pageSize) : 1);
    }, [fetchOrders, pageNumber, pageSize, invoices?.totalItems]);

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
                        const params = new URLSearchParams({
                            maChiTietHdb: chiTiet.maChiTietHdb || chiTiet.MaChiTietHdb,
                            maSanPham: chiTiet.maSanPham || chiTiet.MaSanPham,
                            maKhachHang: hoaDon.maKhachHang,
                        });
                        const response = await axios.get(
                            `https://localhost:7111/api/DanhGia/list?${params.toString()}`,
                            {
                                headers: { Authorization: `Bearer ${token}` },
                            },
                        );
                        newReviewStatus[chiTiet.maChiTietHdb] = response.data?.length > 0;
                    } catch (error) {
                        console.error('Error checking review status:', error);
                        newReviewStatus[chiTiet.maChiTietHdb] = false;
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

    const openCreateReviewModal = (chiTiet, maKhachHang) => {
        setSelectedOrderDetail({
            maChiTietHdb: chiTiet.maChiTietHdb || chiTiet.MaChiTietHdb,
            maSanPham: chiTiet.maSanPham || chiTiet.MaSanPham,
            maKhachHang,
            tenSanPham: chiTiet.tenSanPham,
        });
        setShowCreateReviewModal(true);
    };

    const handleCreateReview = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) return toast.error('Vui lòng đăng nhập để thêm đánh giá.');

            const { maChiTietHdb, maSanPham, maKhachHang } = selectedOrderDetail || {};
            if (!maChiTietHdb || !maSanPham || !maKhachHang) {
                return toast.error('Thiếu thông tin chi tiết đơn hàng.');
            }

            const payload = {
                maChiTietHdb,
                maSanPham,
                maKhachHang,
                danhGia: reviewForm.danhGia,
                binhLuan: reviewForm.binhLuan || null,
            };

            const response = await axios.post('https://localhost:7111/api/DanhGia/create', payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200) {
                toast.success('Đánh giá đã được thêm thành công!');
                setShowCreateReviewModal(false);
                setReviewForm({ danhGia: 5, binhLuan: '' });
                setSelectedOrderDetail(null);
                setReviewStatus((prev) => ({ ...prev, [maChiTietHdb]: true }));
                fetchOrders(pageNumber, pageSize, 'DaGiao');
            }
        } catch (error) {
            console.error('Error creating review:', error);
            toast.error(error.response?.data?.message || 'Có lỗi khi thêm đánh giá.');
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
                fetchOrders(pageNumber, pageSize, 'DaGiao');
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
            <div className="flex justify-between items-center gap-4 mb-8">
                <Combobox />
                <div className="flex items-center gap-2 w-[180px]">
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
                                            <th className="p-4 text-gray-700 font-semibold">Đánh giá</th>
                                            <th className="p-4 text-gray-700 font-semibold">Xem đánh giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hoaDon.chiTietHoaDon.map((chiTiet) => (
                                            <tr
                                                key={chiTiet.maChiTietHdb} // Fixed key to use maChiTietHdb instead of maSanPham
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
                                                <td className="p-4 text-gray-600">{chiTiet.tenSanPham}</td>
                                                <td className="p-4 text-gray-600">{chiTiet.sl}</td>
                                                <td className="p-4 text-gray-600">
                                                    {chiTiet.thanhTien.toLocaleString()} VNĐ
                                                </td>
                                                <td className="p-4 text-gray-600">
                                                    {!reviewStatus[chiTiet.maChiTietHdb] && (
                                                        <button
                                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                                            onClick={() =>
                                                                openCreateReviewModal(chiTiet, hoaDon.maKhachHang)
                                                            }
                                                        >
                                                            Đánh giá
                                                        </button>
                                                    )}
                                                </td>
                                                <td className="p-4 text-gray-600">
                                                    {reviewStatus[chiTiet.maChiTietHdb] && (
                                                        <button
                                                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                                            onClick={() =>
                                                                handleViewReview(
                                                                    chiTiet.maChiTietHdb,
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
                                        ))}
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
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg"
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

            {showCreateReviewModal && selectedOrderDetail && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4">Thêm đánh giá</h3>
                        <form onSubmit={handleCreateReview} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Sản phẩm:</label>
                                <p>
                                    {selectedOrderDetail.tenSanPhamHdb || selectedOrderDetail.tenSanPham} (Mã SP:{' '}
                                    {selectedOrderDetail.maSanPham})
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Mã chi tiết HĐB:</label>
                                <p>{selectedOrderDetail.maChiTietHdb}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Đánh giá (1-5 sao):</label>
                                <select
                                    value={reviewForm.danhGia}
                                    onChange={(e) =>
                                        setReviewForm({ ...reviewForm, danhGia: parseInt(e.target.value) })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
                                >
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <option key={star} value={star}>
                                            {star} sao
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Bình luận:</label>
                                <textarea
                                    value={reviewForm.binhLuan}
                                    onChange={(e) => setReviewForm({ ...reviewForm, binhLuan: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
                                    rows="4"
                                    placeholder="Nhập bình luận của bạn..."
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                                    onClick={() => {
                                        setShowCreateReviewModal(false);
                                        setSelectedOrderDetail(null);
                                        setReviewForm({ danhGia: 5, binhLuan: '' });
                                    }}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                >
                                    Gửi đánh giá
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex justify-center mt-8">
                <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>
        </div>
    );
};

export default OrderDaGiao;
