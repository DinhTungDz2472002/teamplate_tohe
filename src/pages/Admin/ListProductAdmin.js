// const products = [
//     {
//         id: 1,
//         name: 'Sản phẩm A',
//         price: 120,
//         image: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg',
//         detail: 'Chi tiết sản phẩm A',
//     },
//     {
//         id: 2,
//         name: 'Sản phẩm B',
//         price: 80,
//         image: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg',
//         detail: 'Chi tiết sản phẩm B',
//     },
// ];

// export default function ListProductAdmin() {
//     return (
//         <div className="p-5">
//             <div className="flex justify-end mb-4">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
//                     Thêm sản phẩm
//                 </button>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-3 px-6 text-left">ID</th>
//                             <th className="py-3 px-6 text-left">Tên Sản phẩm</th>
//                             <th className="py-3 px-6 text-left">Giá (VND)</th>
//                             <th className="py-3 px-6 text-left">Ảnh</th>
//                             <th className="py-3 px-6 text-left">Chi tiết sản phẩm</th>
//                             <th className="py-3 px-6 text-center">Hành động</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map((product) => (
//                             <tr key={product.id} className="border-b hover:bg-gray-50 even:bg-gray-100">
//                                 <td className="py-3 px-6">{product.id}</td>
//                                 <td className="py-3 px-6 ">{product.name}</td>
//                                 <td className="py-3 px-6">{product.price.toLocaleString()}</td>
//                                 <td className="py-3 px-6">
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="w-16 h-16 object-cover rounded"
//                                     />
//                                 </td>
//                                 <td className="py-3 px-6 ">{product.detail}</td>
//                                 <td className="py-3 px-6 flex items-center justify-center gap-2">
//                                     <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded">
//                                         Sửa
//                                     </button>
//                                     <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded">
//                                         Xóa
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SanPhamApi from '~/api/SanPhamApi';
import Pagination from '~/components/Pagination';
export default function ListProductAdmin() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [editProduct, setEditProduct] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const fetchProducts = async (page = pageNumber, size = pageSize) => {
        try {
            setLoading(true);
            const res = await SanPhamApi.getList(page, size);
            // Cập nhật sản phẩm và tổng số trang
            setProducts(res.items);
            setTotalPages(Math.ceil(res.totalItems / size)); // Tính toán lại totalPages
            console(res.items);
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi tải danh sách sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [pageNumber, pageSize]);

    const handleUpdate = async () => {
        try {
            await SanPhamApi.update(editProduct);
            toast.success('Cập nhật sản phẩm thành công!');
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error('Cập nhật thất bại!');
        }
        setEditProduct(null);
    };

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPageNumber(newPage);
        }
    };

    const handleChangePageSize = (e) => {
        const newSize = parseInt(e.target.value);
        setPageSize(newSize);
        setPageNumber(1); // reset về trang 1 khi thay đổi kích thước trang
        fetchProducts(1, newSize); // Gọi lại API khi thay đổi pageSize
    };
    const handleLocalImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ''); // bỏ phần đuôi .jpg .png .jpeg
            setEditProduct({ ...editProduct, anhSp: fileNameWithoutExtension });
        }
    };

    const handleDelete = async (id) => {
        try {
            await SanPhamApi.delete(id);
            toast.success('Xóa sản phẩm thành công!');
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error('Xóa thất bại!');
        }
        setConfirmDeleteId(null);
    };
    return (
        <div className="p-5">
            <div className="flex justify-between mb-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Thêm sản phẩm
                </button>
                <div className="flex items-center gap-2">
                    <span>Hiển thị:</span>
                    <select value={pageSize} onChange={handleChangePageSize} className="border px-2 py-1 rounded">
                        {[5, 10, 20, 30].map((size) => (
                            <option key={size} value={size}>
                                {size} dòng
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Tên Sản phẩm</th>
                            <th className="py-3 px-6 text-left">Giá (VND)</th>
                            <th className="py-3 px-6 text-left">Ảnh</th>
                            <th className="py-3 px-6 text-left">Chi tiết sản phẩm</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10">
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.maSanPham} className="border-b hover:bg-gray-50 even:bg-gray-100">
                                    <td className="py-3 px-6">{product.maSanPham}</td>
                                    <td className="py-3 px-6">{product.tenSanPham}</td>
                                    <td className="py-3 px-6">{product.giaSanPham?.toLocaleString()}</td>
                                    <td className="py-3 px-6">
                                        {product.anhSp ? (
                                            <>
                                                {/* Kiểm tra với các đuôi ảnh khác nhau */}
                                                <img
                                                    className="w-16 h-16 object-cover rounded"
                                                    src={`/assets/images/${product.anhSp}.jpg`}
                                                    alt={product.tenSanPham}
                                                    onError={(e) =>
                                                        (e.target.src = `/assets/images/${product.anhSp}.png`)
                                                    } // Nếu không tìm thấy ảnh jpg, thử png
                                                />
                                            </>
                                        ) : (
                                            <span>Không có ảnh</span> // Hoặc ảnh mặc định
                                        )}
                                    </td>

                                    <td className="py-3 px-6">{product.moTaSp}</td>
                                    <td className="py-3 px-6 flex items-center justify-center gap-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded"
                                            onClick={() => setEditProduct(product)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                                            onClick={() => setConfirmDeleteId(product.maSanPham)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Phân trang
            <div className="flex justify-center items-center mt-4 gap-4">
                <button
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                    onClick={() => handleChangePage(pageNumber - 1)}
                    disabled={pageNumber === 1}
                >
                    Trang trước
                </button>
                <span>
                    Trang {pageNumber}/{totalPages}
                </span>
                <button
                    className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded"
                    onClick={() => handleChangePage(pageNumber + 1)}
                    disabled={pageNumber === totalPages}
                >
                    Trang sau
                </button>
            </div> */}
            {/* phân trang */}
            <div className="flex justify-center items-center mt-4 gap-4">
                {/* Hiển thị phân trang */}
                <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>

            {/* Modal Sửa */}
            {editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg w-[400px]">
                        <h2 className="text-xl font-bold mb-4">Sửa sản phẩm</h2>
                        <input
                            className="w-full border p-2 mb-3 rounded"
                            value={editProduct.tenSanPham}
                            onChange={(e) => setEditProduct({ ...editProduct, tenSanPham: e.target.value })}
                            placeholder="Tên sản phẩm"
                        />
                        <input
                            className="w-full border p-2 mb-3 rounded"
                            type="number"
                            value={editProduct.giaSanPham}
                            onChange={(e) => setEditProduct({ ...editProduct, giaSanPham: parseInt(e.target.value) })}
                            placeholder="Giá sản phẩm"
                        />
                        {/* Ảnh sản phẩm */}
                        {editProduct.anhSp && (
                            <img
                                src={`/assets/images/${editProduct.anhSp}.jpg`}
                                alt={editProduct.tenSanPham}
                                className="w-16 h-16 object-cover rounded"
                                onError={(e) => (e.target.src = `/assets/images/${editProduct.anhSp}.png`)} // Nếu không tìm thấy ảnh jpg, thử png
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border p-2 mb-3 rounded"
                            onChange={handleLocalImageChange}
                        />
                        {/* hết ảnh sp */}
                        <textarea
                            className="w-full border p-2 mb-3 rounded"
                            value={editProduct.moTaSp}
                            onChange={(e) => setEditProduct({ ...editProduct, moTaSp: e.target.value })}
                            placeholder="Mô tả sản phẩm"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                                onClick={() => setEditProduct(null)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                                onClick={handleUpdate}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal xác nhận Xóa */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
                    <div className="bg-white p-6 rounded-lg w-[300px] text-center">
                        <h2 className="text-lg font-bold mb-4">Xác nhận xóa?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                onClick={() => handleDelete(confirmDeleteId)}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
