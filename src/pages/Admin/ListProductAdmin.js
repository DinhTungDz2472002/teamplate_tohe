// import { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SanPhamApi from '~/api/SanPhamApi';
// import Pagination from '~/components/Pagination';
// import axios from 'axios';

// export default function ListProductAdmin() {
//     const [products, setProducts] = useState([]);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [pageSize, setPageSize] = useState(5);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);

//     const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false); // Quản lý modal thêm/sửa
//     const [isAdding, setIsAdding] = useState(false); // Xác định trạng thái thêm hay sửa
//     const [productData, setProductData] = useState({
//         maSanPham: null,
//         tenSanPham: '',
//         giaSanPham: 0,
//         maLoai: '',
//         sltonKho: 0,
//         moTaSp: '',
//         anhSp: '',
//     });
//     const [file, setFile] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [loaiList, setLoaiList] = useState([]); // Danh sách thể loại
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Lấy danh sách sản phẩm
//     const fetchProducts = async (page = pageNumber, size = pageSize) => {
//         setLoading(true);
//         try {
//             const res = await SanPhamApi.getList(page, size);
//             setProducts(res.items);
//             setTotalPages(Math.ceil(res.totalItems / size));
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi tải danh sách sản phẩm!');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Lấy danh sách thể loại
//     const fetchLoai = async () => {
//         try {
//             const response = await axios.get('https://localhost:7111/api/Loai');
//             setLoaiList(response.data);
//         } catch (error) {
//             toast.error('Lỗi khi lấy danh sách thể loại: ' + error.message);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//         fetchLoai(); // Lấy danh sách thể loại khi component mount
//     }, [pageNumber, pageSize]);

//     // Xử lý xóa sản phẩm
//     const handleDelete = async (id) => {
//         try {
//             await SanPhamApi.delete(id);
//             toast.success('Xóa sản phẩm thành công!');
//             fetchProducts();
//         } catch (error) {
//             console.error(error);
//             toast.error('Xóa thất bại!');
//         } finally {
//             setConfirmDeleteId(null);
//         }
//     };

//     // Xử lý mở modal thêm
//     const handleAddProduct = () => {
//         setProductData({
//             maSanPham: null,
//             tenSanPham: '',
//             giaSanPham: 0,
//             maLoai: '',
//             sltonKho: 0,
//             moTaSp: '',
//             anhSp: '',
//         });
//         setFile(null);
//         setPreviewUrl(null);
//         setIsAdding(true);
//         setModalOpen(true);
//     };

//     // Xử lý mở modal sửa
//     const handleEditProduct = (product) => {
//         setProductData({
//             maSanPham: product.maSanPham,
//             tenSanPham: product.tenSanPham,
//             giaSanPham: product.giaSanPham,
//             maLoai: product.maLoai || '',
//             sltonKho: product.sltonKho || 0,
//             moTaSp: product.moTaSp || '',
//             anhSp: product.anhSp || '',
//         });
//         setPreviewUrl(product.anhSp ? `/assets/images/${product.anhSp}` : null);
//         setFile(null);
//         setIsAdding(false);
//         setModalOpen(true);
//     };

//     // Xử lý thay đổi input
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProductData({ ...productData, [name]: value });
//     };

//     // Xử lý chọn file ảnh
//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
//             if (!validTypes.includes(selectedFile.type)) {
//                 toast.error('Vui lòng chọn file ảnh (.jpg, .png, .gif)');
//                 setFile(null);
//                 setPreviewUrl(null);
//                 return;
//             }
//             if (selectedFile.size > 5 * 1024 * 1024) {
//                 toast.error('File ảnh quá lớn (tối đa 5MB)');
//                 setFile(null);
//                 setPreviewUrl(null);
//                 return;
//             }
//             setFile(selectedFile);
//             setPreviewUrl(URL.createObjectURL(selectedFile));
//         } else {
//             setFile(null);
//             setPreviewUrl(null);
//         }
//     };

//     // Xử lý lưu (thêm hoặc sửa)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         // Kiểm tra dữ liệu đầu vào
//         if (productData.giaSanPham <= 0) {
//             toast.error('Giá sản phẩm phải lớn hơn 0');
//             setIsSubmitting(false);
//             return;
//         }
//         if (!productData.maLoai) {
//             toast.error('Vui lòng chọn loại sản phẩm');
//             setIsSubmitting(false);
//             return;
//         }
//         if (productData.sltonKho < 0) {
//             toast.error('Số lượng tồn kho không được âm');
//             setIsSubmitting(false);
//             return;
//         }

//         // Tạo FormData để gửi
//         const formData = new FormData();
//         formData.append('tenSanPham', productData.tenSanPham);
//         formData.append('giaSanPham', Number(productData.giaSanPham));
//         formData.append('maLoai', Number(productData.maLoai));
//         formData.append('sLtonKho', Number(productData.sltonKho));
//         formData.append('moTaSp', productData.moTaSp || '');
//         if (file) {
//             formData.append('file', file);
//         } else if (productData.anhSp) {
//             formData.append('anhSp', productData.anhSp);
//         }

//         try {
//             if (isAdding) {
//                 await SanPhamApi.create(formData);
//                 toast.success('Thêm sản phẩm thành công!');
//             } else {
//                 formData.append('maSanPham', productData.maSanPham);
//                 await SanPhamApi.update(formData);
//                 toast.success('Cập nhật sản phẩm thành công!');
//             }
//             setModalOpen(false);
//             fetchProducts();
//         } catch (error) {
//             console.error('Lỗi:', error);
//             toast.error(isAdding ? 'Thêm sản phẩm thất bại!' : 'Cập nhật thất bại!');
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleChangePage = (newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setPageNumber(newPage);
//         }
//     };

//     const handleChangePageSize = (e) => {
//         const newSize = parseInt(e.target.value) || 5;
//         setPageSize(newSize);
//         setPageNumber(1);
//     };

//     return (
//         <div className="p-5">
//             {/* Header */}
//             <div className="flex justify-between mb-4">
//                 <button
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//                     onClick={handleAddProduct}
//                 >
//                     Thêm sản phẩm
//                 </button>
//                 <div className="flex items-center gap-2">
//                     <span>Hiển thị:</span>
//                     <select value={pageSize} onChange={handleChangePageSize} className="border px-2 py-1 rounded">
//                         {[8, 10, 20, 30].map((size) => (
//                             <option key={size} value={size}>
//                                 {size} dòng
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//             {/* Table */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-3 px-6 text-left">ID</th>
//                             <th className="py-3 px-6 text-left">Tên sản phẩm</th>
//                             <th className="py-3 px-6 text-left">Giá (VND)</th>
//                             <th className="py-3 px-6 text-left">Ảnh</th>
//                             <th className="py-3 px-6 text-left">Chi tiết</th>
//                             <th className="py-3 px-6 text-center">Hành động</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? (
//                             <tr>
//                                 <td colSpan="6" className="text-center py-10">
//                                     Đang tải dữ liệu...
//                                 </td>
//                             </tr>
//                         ) : products.length ? (
//                             products.map((product) => (
//                                 <tr key={product.maSanPham} className="border-b hover:bg-gray-50 even:bg-gray-100">
//                                     <td className="py-3 px-6">{product.maSanPham}</td>
//                                     <td className="py-3 px-6">{product.tenSanPham}</td>
//                                     <td className="py-3 px-6">{product.giaSanPham?.toLocaleString()}</td>
//                                     <td className="py-3 px-6">
//                                         {product.anhSp ? (
//                                             <img
//                                                 src={`/assets/images/${product.anhSp}`}
//                                                 alt={product.tenSanPham}
//                                                 className="w-16 h-16 object-cover rounded"
//                                                 onError={(e) => {
//                                                     if (e.target) e.target.src = `/assets/images/${product.anhSp}.png`;
//                                                 }}
//                                             />
//                                         ) : (
//                                             <span>Không có ảnh</span>
//                                         )}
//                                     </td>
//                                     <td className="py-3 px-6">{product.moTaSp}</td>
//                                     <td className="py-3 px-6 flex justify-center gap-2">
//                                         <button
//                                             className="bg-yellow-400 hover:bg-yellow-500 text-white py-1 px-3 rounded"
//                                             onClick={() => handleEditProduct(product)}
//                                         >
//                                             Sửa
//                                         </button>
//                                         <button
//                                             className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//                                             onClick={() => setConfirmDeleteId(product.maSanPham)}
//                                         >
//                                             Xóa
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="6" className="text-center py-10">
//                                     Không có sản phẩm.
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//             {/* Pagination */}
//             <div className="flex justify-center mt-4">
//                 <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
//             </div>
//             {/* Modal thêm/sửa sản phẩm */}
//             {modalOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//                     onClick={() => setModalOpen(false)}
//                 >
//                     <div
//                         className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//                             {isAdding ? 'Thêm Sản Phẩm' : 'Sửa Sản Phẩm'}
//                         </h2>
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Chia 2 cột */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {/* Cột 1: Tên sản phẩm */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
//                                     <input
//                                         type="text"
//                                         name="tenSanPham"
//                                         value={productData.tenSanPham}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                                         placeholder="Nhập tên sản phẩm"
//                                     />
//                                 </div>

//                                 {/* Cột 2: Giá sản phẩm */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Giá sản phẩm (VND)
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="giaSanPham"
//                                         value={productData.giaSanPham}
//                                         onChange={handleInputChange}
//                                         required
//                                         min="0"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                                         placeholder="Nhập giá sản phẩm"
//                                     />
//                                 </div>

//                                 {/* Cột 1: Combobox thể loại */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Loại sản phẩm
//                                     </label>
//                                     <select
//                                         name="maLoai"
//                                         value={productData.maLoai}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                                     >
//                                         <option value="">Chọn loại sản phẩm</option>
//                                         {loaiList.map((loai) => (
//                                             <option key={loai.maLoai} value={loai.maLoai}>
//                                                 {loai.tenLoai}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 {/* Cột 2: Số lượng tồn kho */}
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Số lượng tồn kho
//                                     </label>
//                                     <input
//                                         type="number"
//                                         name="sltonKho"
//                                         value={productData.sltonKho}
//                                         onChange={handleInputChange}
//                                         required
//                                         min="0"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                                         placeholder="Nhập số lượng tồn kho"
//                                     />
//                                 </div>

//                                 {/* Mô tả: Chiếm cả 2 cột */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
//                                     <textarea
//                                         name="moTaSp"
//                                         value={productData.moTaSp}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
//                                         placeholder="Nhập mô tả sản phẩm"
//                                         rows="4"
//                                     />
//                                 </div>

//                                 {/* Ảnh sản phẩm: Chiếm cả 2 cột */}
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
//                                     <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-blue-500 transition">
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={handleFileChange}
//                                             className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                                         />
//                                         <p className="text-gray-500">
//                                             {file ? file.name : 'Kéo thả hoặc nhấn để chọn ảnh'}
//                                         </p>
//                                     </div>
//                                     {previewUrl && (
//                                         <div className="mt-4">
//                                             <img
//                                                 src={previewUrl}
//                                                 alt="Preview"
//                                                 className="w-32 h-32 object-cover rounded-md mx-auto"
//                                             />
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Nút gửi */}
//                             <div className="flex justify-end gap-2 mt-6">
//                                 <button
//                                     type="button"
//                                     className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
//                                     onClick={() => setModalOpen(false)}
//                                 >
//                                     Hủy
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={isSubmitting}
//                                     className={`py-3 px-4 rounded-md text-white font-semibold transition ${
//                                         isSubmitting
//                                             ? 'bg-blue-400 cursor-not-allowed'
//                                             : 'bg-blue-600 hover:bg-blue-700'
//                                     }`}
//                                 >
//                                     {isSubmitting ? 'Đang xử lý...' : isAdding ? 'Thêm' : 'Lưu'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             {/* Modal xác nhận xóa */}
//             {confirmDeleteId && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
//                     <div className="bg-white p-6 rounded-lg w-[300px] text-center">
//                         <h2 className="text-lg font-bold mb-4">Bạn có chắc muốn xóa?</h2>
//                         <div className="flex justify-center gap-4">
//                             <button
//                                 className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
//                                 onClick={() => setConfirmDeleteId(null)}
//                             >
//                                 Hủy
//                             </button>
//                             <button
//                                 className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
//                                 onClick={() => handleDelete(confirmDeleteId)}
//                             >
//                                 Xóa
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SanPhamApi from '~/api/SanPhamApi';
import Pagination from '~/components/Pagination';
import axios from 'axios';

export default function ListProductAdmin() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [productData, setProductData] = useState({
        maSanPham: null,
        tenSanPham: '',
        giaSanPham: 0,
        maLoai: '',
        sltonKho: 0,
        moTaSp: '',
        anhSp: '',
        chiTietSps: [{ maMau: '', maCl: '', giamGiaSp: 0, anhChiTietSp: null, previewUrl: null }], // Array for TchitietSp
    });
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loaiList, setLoaiList] = useState([]);
    const [mauList, setMauList] = useState([]);
    const [chatlieuList, setChatlieuList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch products
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

    // Fetch categories
    const fetchLoai = async () => {
        try {
            const response = await axios.get('https://localhost:7111/api/Loai');
            setLoaiList(response.data);
        } catch (error) {
            toast.error('Lỗi khi lấy danh sách thể loại: ' + error.message);
        }
    };

    // Fetch colors
    const fetchMau = async () => {
        try {
            const response = await axios.get('https://localhost:7111/api/Mau');
            setMauList(response.data);
        } catch (error) {
            toast.error('Lỗi khi lấy danh sách màu: ' + error.message);
        }
    };

    // Fetch materials
    const fetchChatLieu = async () => {
        try {
            const response = await axios.get('https://localhost:7111/api/ChatLieu');
            setChatlieuList(response.data);
        } catch (error) {
            toast.error('Lỗi khi lấy danh sách chất liệu: ' + error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchLoai();
        fetchMau();
        fetchChatLieu();
    }, [pageNumber, pageSize]);

    // Handle add product
    const handleAddProduct = () => {
        setProductData({
            maSanPham: null,
            tenSanPham: '',
            giaSanPham: '',
            maLoai: '',
            sltonKho: 0,
            moTaSp: '',
            anhSp: '',
            chiTietSps: [{ maMau: '', maCl: '', giamGiaSp: 0, anhChiTietSp: null, previewUrl: null }],
        });
        setFile(null);
        setPreviewUrl(null);
        setIsAdding(true);
        setModalOpen(true);
    };

    // Handle edit product
    const handleEditProduct = async (product) => {
        setLoading(true);
        try {
            // Fetch product details including chiTietSps using getById
            const response = await SanPhamApi.getById(product.maSanPham);
            const fullProduct = response; // Response is the full SanPhamDto

            setProductData({
                maSanPham: fullProduct.maSanPham,
                tenSanPham: fullProduct.tenSanPham,
                giaSanPham: fullProduct.giaSanPham,
                maLoai: fullProduct.maLoai || '',
                sltonKho: fullProduct.sltonKho || 0,
                moTaSp: fullProduct.moTaSp || '',
                anhSp: fullProduct.anhSp || '',
                chiTietSps: fullProduct.chiTietSps?.length
                    ? fullProduct.chiTietSps.map((ct) => ({
                          maChiTietSp: ct.maChiTietSp || null,
                          maMau: ct.maMau || '',
                          maCl: ct.maCl || '',
                          giamGiaSp: ct.giamGiaSp || 0,
                          anhChiTietSp: ct.anhChiTietSp || null,
                          previewUrl: ct.anhChiTietSp ? `/assets/images/${ct.anhChiTietSp}` : null,
                      }))
                    : [{ maChiTietSp: null, maMau: '', maCl: '', giamGiaSp: 0, anhChiTietSp: null, previewUrl: null }],
            });

            setPreviewUrl(fullProduct.anhSp ? `/assets/images/${fullProduct.anhSp}` : null);
            setFile(null);
            setIsAdding(false);
            setModalOpen(true);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết sản phẩm:', error);
            toast.error('Lỗi khi tải chi tiết sản phẩm!');
        } finally {
            setLoading(false);
        }
    };
    // Xử lý xóa sản phẩm
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

    // Handle input change for product fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    // Handle input change for chiTietSp fields
    const handleChiTietSpChange = (index, field, value) => {
        const updatedChiTietSps = [...productData.chiTietSps];
        updatedChiTietSps[index] = { ...updatedChiTietSps[index], [field]: value };
        setProductData({ ...productData, chiTietSps: updatedChiTietSps });
    };

    // Handle file change for product image
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(selectedFile.type)) {
                toast.error('Vui lòng chọn file ảnh (.jpg, .png, .gif)');
                setFile(null);
                setPreviewUrl(null);
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error('File ảnh quá lớn (tối đa 5MB)');
                setFile(null);
                setPreviewUrl(null);
                return;
            }
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    // Handle file change for chiTietSp image
    const handleChiTietSpFileChange = (index, e) => {
        const selectedFile = e.target.files[0];
        const updatedChiTietSps = [...productData.chiTietSps];
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(selectedFile.type)) {
                toast.error('Vui lòng chọn file ảnh (.jpg, .png, .gif) cho chi tiết sản phẩm');
                updatedChiTietSps[index] = { ...updatedChiTietSps[index], anhChiTietSp: null, previewUrl: null };
                setProductData({ ...productData, chiTietSps: updatedChiTietSps });
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error('File ảnh chi tiết quá lớn (tối đa 5MB)');
                updatedChiTietSps[index] = { ...updatedChiTietSps[index], anhChiTietSp: null, previewUrl: null };
                setProductData({ ...productData, chiTietSps: updatedChiTietSps });
                return;
            }
            updatedChiTietSps[index] = {
                ...updatedChiTietSps[index],
                anhChiTietSp: selectedFile,
                previewUrl: URL.createObjectURL(selectedFile),
            };
        } else {
            updatedChiTietSps[index] = { ...updatedChiTietSps[index], anhChiTietSp: null, previewUrl: null };
        }
        setProductData({ ...productData, chiTietSps: updatedChiTietSps });
    };

    // Add new chiTietSp entry
    const addChiTietSp = () => {
        setProductData({
            ...productData,
            chiTietSps: [
                ...productData.chiTietSps,
                { maMau: '', maCl: '', giamGiaSp: 0, anhChiTietSp: null, previewUrl: null },
            ],
        });
    };

    // Remove chiTietSp entry
    const removeChiTietSp = (index) => {
        const updatedChiTietSps = productData.chiTietSps.filter((_, i) => i !== index);
        setProductData({
            ...productData,
            chiTietSps: updatedChiTietSps.length
                ? updatedChiTietSps
                : [{ maMau: '', maCl: '', giamGiaSp: 0, anhChiTietSp: null, previewUrl: null }],
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate product fields
        if (productData.giaSanPham <= 0) {
            toast.error('Giá sản phẩm phải lớn hơn 0');
            setIsSubmitting(false);
            return;
        }
        if (!productData.maLoai) {
            toast.error('Vui lòng chọn loại sản phẩm');
            setIsSubmitting(false);
            return;
        }
        if (productData.sltonKho < 0) {
            toast.error('Số lượng tồn kho không được âm');
            setIsSubmitting(false);
            return;
        }
        // Validate chiTietSp fields
        for (let i = 0; i < productData.chiTietSps.length; i++) {
            const ct = productData.chiTietSps[i];
            if (!ct.maMau) {
                toast.error(`Vui lòng chọn màu sắc cho chi tiết sản phẩm ${i + 1}`);
                setIsSubmitting(false);
                return;
            }
            if (!ct.maCl) {
                toast.error(`Vui lòng chọn chất liệu cho chi tiết sản phẩm ${i + 1}`);
                setIsSubmitting(false);
                return;
            }
            if (ct.giamGiaSp < 0 || ct.giamGiaSp > 100) {
                toast.error(`Giảm giá cho chi tiết sản phẩm ${i + 1} phải từ 0 đến 100%`);
                setIsSubmitting(false);
                return;
            }
        }

        // Create FormData
        const formData = new FormData();
        formData.append('tenSanPham', productData.tenSanPham);
        formData.append('giaSanPham', Number(productData.giaSanPham));
        formData.append('maLoai', Number(productData.maLoai));
        formData.append('sLtonKho', Number(productData.sltonKho));
        formData.append('moTaSp', productData.moTaSp || '');
        if (file) {
            formData.append('file', file);
        } else if (productData.anhSp) {
            formData.append('anhSp', productData.anhSp);
        }
        // Append chiTietSps as JSON string
        productData.chiTietSps.forEach((ct, index) => {
            formData.append(`chiTietSps[${index}].maMau`, Number(ct.maMau));
            formData.append(`chiTietSps[${index}].maCl`, Number(ct.maCl));
            formData.append(`chiTietSps[${index}].giamGiaSp`, Number(ct.giamGiaSp));
            if (ct.anhChiTietSp instanceof File) {
                formData.append(`chiTietSps[${index}].anhChiTietSpFile`, ct.anhChiTietSp);
            } else if (ct.anhChiTietSp) {
                formData.append(`chiTietSps[${index}].anhChiTietSp`, ct.anhChiTietSp);
            }
            if (ct.maChiTietSp) {
                formData.append(`chiTietSps[${index}].maChiTietSp`, ct.maChiTietSp);
            }
        });

        try {
            if (isAdding) {
                await SanPhamApi.create(formData);
                toast.success('Thêm sản phẩm thành công!');
            } else {
                formData.append('maSanPham', productData.maSanPham);
                await SanPhamApi.update(formData);
                toast.success('Cập nhật sản phẩm thành công!');
            }
            setModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Lỗi:', error);
            toast.error(isAdding ? 'Thêm sản phẩm thất bại!' : 'Cập nhật thất bại!');
        } finally {
            setIsSubmitting(false);
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

    return (
        <div className="p-5">
            {/* Header */}
            <div className="flex justify-between mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                    onClick={handleAddProduct}
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
                                                src={`/assets/images/${product.anhSp}`}
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
                                            onClick={() => handleEditProduct(product)}
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
            {/* Modal thêm/sửa sản phẩm */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                            {isAdding ? 'Thêm Sản Phẩm' : 'Sửa Sản Phẩm'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tên sản phẩm */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        name="tenSanPham"
                                        value={productData.tenSanPham}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                </div>
                                {/* Giá sản phẩm */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Giá sản phẩm (VND)
                                    </label>
                                    <input
                                        type="number"
                                        name="giaSanPham"
                                        value={productData.giaSanPham}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Nhập giá sản phẩm"
                                    />
                                </div>
                                {/* Combobox thể loại */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Loại sản phẩm
                                    </label>
                                    <select
                                        name="maLoai"
                                        value={productData.maLoai}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    >
                                        <option value="">Chọn loại sản phẩm</option>
                                        {loaiList.map((loai) => (
                                            <option key={loai.maLoai} value={loai.maLoai}>
                                                {loai.tenLoai}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Số lượng tồn kho */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Số lượng tồn kho
                                    </label>
                                    <input
                                        type="number"
                                        name="sltonKho"
                                        value={productData.sltonKho}
                                        onChange={handleInputChange}
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        placeholder="Nhập số lượng tồn kho"
                                    />
                                </div>
                                {/* Mô tả */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <textarea
                                        name="moTaSp"
                                        value={productData.moTaSp}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                                        placeholder="Nhập mô tả sản phẩm"
                                        rows="4"
                                    />
                                </div>
                                {/* Ảnh sản phẩm */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-blue-500 transition">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <p className="text-gray-500">
                                            {file ? file.name : 'Kéo thả hoặc nhấn để chọn ảnh'}
                                        </p>
                                    </div>
                                    {previewUrl && (
                                        <div className="mt-4">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-md mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                                {/* Chi tiết sản phẩm */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Chi tiết sản phẩm
                                    </label>
                                    {productData.chiTietSps.map((ct, index) => (
                                        <div key={index} className="border p-4 rounded-md mb-4 relative">
                                            {/* Hiển thị số thứ tự */}
                                            <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                                Chi tiết sản phẩm {index + 1}
                                            </h3>
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                                onClick={() => removeChiTietSp(index)}
                                            >
                                                Xóa
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Combobox màu sắc */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Màu sắc
                                                    </label>
                                                    <select
                                                        value={ct.maMau}
                                                        onChange={(e) =>
                                                            handleChiTietSpChange(index, 'maMau', e.target.value)
                                                        }
                                                        required
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                    >
                                                        <option value="">Chọn màu sắc</option>
                                                        {mauList.map((mau) => (
                                                            <option key={mau.maMau} value={mau.maMau}>
                                                                {mau.tenMau}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Combobox chất liệu */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Chất liệu
                                                    </label>
                                                    <select
                                                        value={ct.maCl}
                                                        onChange={(e) =>
                                                            handleChiTietSpChange(index, 'maCl', e.target.value)
                                                        }
                                                        required
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                    >
                                                        <option value="">Chọn chất liệu</option>
                                                        {chatlieuList.map((cl) => (
                                                            <option key={cl.maCl} value={cl.maCl}>
                                                                {cl.tenCl}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                {/* Giảm giá */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Giảm giá (%)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={ct.giamGiaSp}
                                                        onChange={(e) =>
                                                            handleChiTietSpChange(index, 'giamGiaSp', e.target.value)
                                                        }
                                                        min="0"
                                                        max="100"
                                                        step="0.1"
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                                        placeholder="Nhập % giảm giá"
                                                    />
                                                </div>
                                                {/* Ảnh chi tiết sản phẩm */}
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Ảnh chi tiết sản phẩm
                                                    </label>
                                                    <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-blue-500 transition">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleChiTietSpFileChange(index, e)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <p className="text-gray-500">
                                                            {ct.anhChiTietSp
                                                                ? ct.anhChiTietSp.name
                                                                : 'Kéo thả hoặc nhấn để chọn ảnh'}
                                                        </p>
                                                    </div>
                                                    {ct.previewUrl && (
                                                        <div className="mt-4">
                                                            <img
                                                                src={ct.previewUrl}
                                                                alt={`Chi tiết ${index + 1}`}
                                                                className="w-24 h-24 object-cover rounded-md mx-auto"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded mt-2"
                                        onClick={addChiTietSp}
                                    >
                                        Thêm chi tiết sản phẩm
                                    </button>
                                </div>
                            </div>
                            {/* Submit buttons */}
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    className="bg-gray-400 hover:bg-gray-500 text-white py-1 px-3 rounded"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`py-3 px-4 rounded-md text-white font-semibold transition ${
                                        isSubmitting
                                            ? 'bg-blue-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {isSubmitting ? 'Đang xử lý...' : isAdding ? 'Thêm' : 'Lưu'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete confirmation modal */}
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
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
