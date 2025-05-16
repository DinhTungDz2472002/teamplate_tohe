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
    const [isAdding, setIsAdding] = useState(false);

    const fetchProducts = async (page = pageNumber, size = pageSize) => {
        setLoading(true);
        try {
            const res = await SanPhamApi.getList(page, size);
            setProducts(res.items);
            setTotalPages(Math.ceil(res.totalItems / size));
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

    const handleSave = async () => {
        if (!editProduct?.tenSanPham || !editProduct?.giaSanPham) {
            toast.error('Vui lòng nhập tên và giá sản phẩm!');
            return;
        }
        if (editProduct.giaSanPham < 0) {
            toast.error('Giá sản phẩm phải lớn hơn 0!');
            return;
        }

        try {
            const payload = {
                tenSanPham: editProduct.tenSanPham,
                giaSanPham: editProduct.giaSanPham,
                moTaSp: editProduct.moTaSp || '',
                anhSp: editProduct.anhSp || '',
                maLoai: editProduct.maLoai || 1,
                sltonKho: editProduct.sltonKho || 10000,
                ngayThemSp: new Date(),
            };

            if (isAdding) {
                await SanPhamApi.create(payload);
                toast.success('Thêm sản phẩm thành công!');
            } else {
                await SanPhamApi.update({ ...editProduct });
                toast.success('Cập nhật sản phẩm thành công!');
            }
            setEditProduct(null);
            setIsAdding(false);
            fetchProducts();
        } catch (error) {
            console.error(error);
            toast.error(isAdding ? 'Thêm sản phẩm thất bại!' : 'Cập nhật thất bại!');
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
        } finally {
            setConfirmDeleteId(null);
        }
    };

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPageNumber(newPage);
        }
    };

    const handleChangePageSize = (e) => {
        const newSize = parseInt(e.target.value) || 5;
        setPageSize(newSize);
        setPageNumber(1);
    };

    const handleLocalImageChange = (e) => {
        const file = e.target.files[0];
        if (file && editProduct) {
            const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, '');
            setEditProduct({ ...editProduct, anhSp: fileNameWithoutExtension });
        }
    };

    return (
        <div className="p-5">
            {/* Header */}
            <div className="flex justify-between mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => {
                        setEditProduct({
                            tenSanPham: '',
                            giaSanPham: '',
                            moTaSp: '',
                            anhSp: '',
                            maLoai: 1,
                            sltonKho: 0,
                        });
                        setIsAdding(true);
                    }}
                >
                    Thêm sản phẩm
                </button>
                <div className="flex items-center gap-2">
                    <span>Hiển thị:</span>
                    <select value={pageSize} onChange={handleChangePageSize} className="border px-2 py-1 rounded">
                        {[8, 10, 20, 30].map((size) => (
                            <option key={size} value={size}>
                                {size} dòng
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Tên sản phẩm</th>
                            <th className="py-3 px-6 text-left">Giá (VND)</th>
                            <th className="py-3 px-6 text-left">Ảnh</th>
                            <th className="py-3 px-6 text-left">Chi tiết</th>
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
                        ) : products.length ? (
                            products.map((product) => (
                                <tr key={product.maSanPham} className="border-b hover:bg-gray-50 even:bg-gray-100">
                                    <td className="py-3 px-6">{product.maSanPham}</td>
                                    <td className="py-3 px-6">{product.tenSanPham}</td>
                                    <td className="py-3 px-6">{product.giaSanPham?.toLocaleString()}</td>
                                    <td className="py-3 px-6">
                                        {product.anhSp ? (
                                            <img
                                                src={`/assets/images/${product.anhSp}.jpg`}
                                                alt={product.tenSanPham}
                                                className="w-16 h-16 object-cover rounded"
                                                onError={(e) => {
                                                    if (e.target) e.target.src = `/assets/images/${product.anhSp}.png`;
                                                }}
                                            />
                                        ) : (
                                            <span>Không có ảnh</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6">{product.moTaSp}</td>
                                    <td className="py-3 px-6 flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
                                            onClick={() => {
                                                setEditProduct(product);
                                                setIsAdding(false);
                                            }}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                                            onClick={() => setConfirmDeleteId(product.maSanPham)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10">
                                    Không có sản phẩm.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
                <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>
            {/* Modal thêm / sửa */}
            {editProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg w-[400px]">
                        <h2 className="text-xl font-bold mb-4">{isAdding ? 'Thêm sản phẩm' : 'Sửa sản phẩm'}</h2>
                        <input
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Tên sản phẩm"
                            value={editProduct.tenSanPham}
                            onChange={(e) => setEditProduct({ ...editProduct, tenSanPham: e.target.value })}
                        />
                        <input
                            type="number"
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Giá sản phẩm"
                            value={editProduct.giaSanPham}
                            onChange={(e) => setEditProduct({ ...editProduct, giaSanPham: parseInt(e.target.value) })}
                        />
                        <input
                            type="number"
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Số lượng tồn"
                            value={editProduct.SLtonKho}
                            onChange={(e) => setEditProduct({ ...editProduct, slTonKho: parseInt(e.target.value) })}
                        />
                        {editProduct.anhSp && (
                            <img
                                src={`/assets/images/${editProduct.anhSp}.jpg`}
                                alt={editProduct.tenSanPham}
                                className="w-16 h-16 object-cover rounded mb-3"
                                onError={(e) => {
                                    if (e.target) e.target.src = `/assets/images/${editProduct.anhSp}.png`;
                                }}
                            />
                        )}
                        {/* nếu ảnh lỗi trả về logo */}
                        {/* {editProduct.anhSp && (
                            <img
                                src={
                                    editProduct.anhSp
                                        ? `/assets/images/${editProduct.anhSp}.jpg`
                                        : '/assets/images/logo.png'
                                }
                                alt={editProduct.tenSanPham}
                                className="w-16 h-16 object-cover rounded mb-3"
                                onError={(e) => {
                                    if (e.target) e.target.src = '/assets/images/logo.png';
                                }}
                            />
                        )} */}
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full border p-2 mb-3 rounded"
                            onChange={handleLocalImageChange}
                        />
                        <textarea
                            className="w-full border p-2 mb-3 rounded"
                            placeholder="Mô tả sản phẩm"
                            value={editProduct.moTaSp}
                            onChange={(e) => setEditProduct({ ...editProduct, moTaSp: e.target.value })}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                                onClick={() => {
                                    setEditProduct(null);
                                    setIsAdding(false);
                                }}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                                onClick={handleSave}
                            >
                                {isAdding ? 'Thêm' : 'Lưu'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal xác nhận xóa */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg w-[300px] text-center">
                        <h2 className="text-lg font-bold mb-4">Bạn có chắc muốn xóa?</h2>
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
