// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import SanPhamApi from '~/api/SanPhamApi';
// import Product from '~/components/Product';
// import Pagination from '~/components/Pagination';

// function ListProducts() {
//     const [products, setProducts] = useState([]);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [pageSize, setPageSize] = useState(8);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [modalLoading, setModalLoading] = useState(false);
//     const [mainImage, setMainImage] = useState('');
//     const [selectedDetail, setSelectedDetail] = useState(null);
//     const [loaiList, setLoaiList] = useState([]);
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

//     const fetchProductDetails = async (id) => {
//         setModalLoading(true);
//         try {
//             const productDetails = await SanPhamApi.getById(id);
//             setSelectedProduct(productDetails);
//             setMainImage(productDetails.anhSp);
//             setSelectedDetail(productDetails.chiTietSps?.[0] || null);
//             setIsModalOpen(true);
//         } catch (error) {
//             console.error('Lỗi khi tải chi tiết sản phẩm:', error);
//             toast.error('Lỗi khi tải chi tiết sản phẩm!');
//         } finally {
//             setModalLoading(false);
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

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedProduct(null);
//         setMainImage('');
//         setSelectedDetail(null);
//     };

//     const handleThumbnailClick = (image, detail) => {
//         setMainImage(image);
//         setSelectedDetail(detail);
//     };

//     const handleOverlayClick = (e) => {
//         if (e.target === e.currentTarget) {
//             closeModal();
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, [pageNumber, pageSize]);

//     return (
//         <section className="py-12 bg-white sm:py-16 lg:py-20">
//             <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//                 <div className="max-w-md mx-auto text-center">
//                     <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">SẢN PHẨM</h2>
//                     <p className="mt-4 text-base font-normal leading-7 text-gray-600"></p>
//                 </div>
//                 <div className="flex items-center gap-2 mb-6">
//                     <span>Hiển thị:</span>
//                     <select value={pageSize} onChange={handleChangePageSize} className="border px-2 py-1 rounded">
//                         {[8, 12, 16, 20].map((size) => (
//                             <option key={size} value={size}>
//                                 {size} Sản phẩm
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 {loading ? (
//                     <div className="text-center">Đang tải...</div>
//                 ) : products.length === 0 ? (
//                     <div className="text-center">Không có sản phẩm nào</div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
//                         {products.map((product) => (
//                             <Product key={product.id} product={product} openModal={fetchProductDetails} />
//                         ))}
//                     </div>
//                 )}
//                 <div className="flex justify-center mt-8">
//                     <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
//                 </div>
//             </div>

//             {isModalOpen && selectedProduct && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                     onClick={handleOverlayClick}
//                 >
//                     <div
//                         className="bg-white rounded-lg p-4 sm:p-6 w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto relative"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full p-2 sm:p-3 z-10 transition-colors duration-200"
//                             onClick={closeModal}
//                         >
//                             <svg
//                                 className="w-6 h-6 sm:w-8 sm:h-8"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M6 18L18 6M6 6l12 12"
//                                 />
//                             </svg>
//                         </button>
//                         {modalLoading ? (
//                             <div className="text-center">Đang tải chi tiết...</div>
//                         ) : (
//                             <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//                                 {/* Product Images */}
//                                 <div className="w-full md:w-1/2">
//                                     <div className="relative aspect-[4/3]">
//                                         <img
//                                             src={`/assets/images/${mainImage}`}
//                                             alt={selectedProduct.tenSanPham}
//                                             className="w-full h-full object-cover rounded-lg"
//                                             onError={(e) => (e.target.src = '/assets/images/placeholder.jpg')}
//                                         />
//                                         <button className="absolute top-2 right-2 bg-white rounded-full p-1">
//                                             <svg
//                                                 className="w-6 h-6"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="M5 13l4 4L19 7"
//                                                 />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="flex gap-2 mt-4 overflow-x-auto">
//                                         {selectedProduct.chiTietSps?.map(
//                                             (ct, index) =>
//                                                 ct?.anhChiTietSp && (
//                                                     <img
//                                                         key={index}
//                                                         src={`/assets/images/${ct.anhChiTietSp}`}
//                                                         alt={`${selectedProduct.tenSanPham} ${index + 1}`}
//                                                         className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md cursor-pointer hover:opacity-75 flex-shrink-0"
//                                                         onClick={() => handleThumbnailClick(ct.anhChiTietSp, ct)}
//                                                     />
//                                                 ),
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Product Details */}
//                                 <div className="w-full md:w-1/2 flex flex-col justify-between">
//                                     <div>
//                                         <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//                                             {selectedProduct.tenSanPham}
//                                         </h1>
//                                         <p className="text-gray-600 mb-4 text-lg sm:text-xl">
//                                             {selectedProduct.giaSanPham.toLocaleString('vi-VN')} VNĐ
//                                         </p>
//                                         <p className="text-gray-500 mb-6 text-sm sm:text-base">
//                                             {selectedProduct.moTaSp}
//                                         </p>
//                                         {selectedDetail && (
//                                             <div className="mb-4">
//                                                 <p className="text-sm sm:text-base font-medium text-gray-700">
//                                                     Màu sắc:{' '}
//                                                     <span className="text-gray-900">
//                                                         {selectedDetail.tenMau || 'Không xác định'}
//                                                     </span>
//                                                 </p>
//                                                 <p className="text-sm sm:text-base font-medium text-gray-700">
//                                                     Chất liệu:{' '}
//                                                     <span className="text-gray-900">
//                                                         {selectedDetail.tenCl || 'Không xác định'}
//                                                     </span>
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default ListProducts;

// 2 được nhưng k có đánh giá
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import SanPhamApi from '~/api/SanPhamApi';
// import Product from '~/components/Product';
// import Pagination from '~/components/Pagination';
// import axios from 'axios';

// function ListProducts() {
//     const [products, setProducts] = useState([]);

//     const [pageNumber, setPageNumber] = useState(1);
//     const [pageSize, setPageSize] = useState(8);
//     const [totalPages, setTotalPages] = useState(1);

//     const [loading, setLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [modalLoading, setModalLoading] = useState(false);
//     const [mainImage, setMainImage] = useState('');
//     const [selectedDetail, setSelectedDetail] = useState(null);
//     const [selectedMaLoai, setSelectedMaLoai] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [loaiList, setLoaiList] = useState([]);

//     // Fetch product categories
//     const fetchLoai = async () => {
//         try {
//             const response = await axios.get('https://localhost:7111/api/Loai');
//             setLoaiList(response.data);
//         } catch (error) {
//             console.error('Lỗi khi lấy danh sách thể loại:', error);
//             toast.error('Lỗi khi lấy danh sách thể loại!');
//         }
//     };

//     // Fetch products with filters
//     const fetchProducts = async (page = pageNumber, size = pageSize, search = searchTerm, maLoai = selectedMaLoai) => {
//         setLoading(true);
//         try {
//             let filteredProducts = [];
//             let totalItems = 0;

//             if (search || maLoai) {
//                 const response = await axios.post(
//                     'https://localhost:7111/SanPham/Search',
//                     {},
//                     {
//                         params: {
//                             s: search || undefined,
//                             maLoai: maLoai || undefined,
//                         },
//                     },
//                 );
//                 filteredProducts = response.data;
//                 totalItems = filteredProducts.length;
//                 const startIndex = (page - 1) * size;
//                 filteredProducts = filteredProducts.slice(startIndex, startIndex + size);
//             } else {
//                 const res = await SanPhamApi.getList(page, size);
//                 filteredProducts = res.items;
//                 totalItems = res.totalItems;
//             }

//             setProducts(filteredProducts);
//             setTotalPages(Math.ceil(totalItems / size) || 1);
//         } catch (error) {
//             console.error(error);
//             toast.error('Lỗi khi tải danh sách sản phẩm!');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const fetchProductDetails = async (id) => {
//         setModalLoading(true);
//         try {
//             const productDetails = await SanPhamApi.getById(id);
//             setSelectedProduct(productDetails);
//             setMainImage(productDetails.anhSp);
//             setSelectedDetail(productDetails.chiTietSps?.[0] || null);
//             setIsModalOpen(true);
//         } catch (error) {
//             console.error('Lỗi khi tải chi tiết sản phẩm:', error);
//             toast.error('Lỗi khi tải chi tiết sản phẩm!');
//         } finally {
//             setModalLoading(false);
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

//     const handleMaLoaiChange = (e) => {
//         setSelectedMaLoai(e.target.value);
//         setPageNumber(1);
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         setPageNumber(1);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setSelectedProduct(null);
//         setMainImage('');
//         setSelectedDetail(null);
//     };

//     const handleThumbnailClick = (image, detail) => {
//         setMainImage(image);
//         setSelectedDetail(detail);
//     };

//     const handleOverlayClick = (e) => {
//         if (e.target === e.currentTarget) {
//             closeModal();
//         }
//     };

//     useEffect(() => {
//         fetchLoai();
//     }, []);

//     useEffect(() => {
//         fetchProducts(pageNumber, pageSize, searchTerm, selectedMaLoai);
//     }, [pageNumber, pageSize, searchTerm, selectedMaLoai]);

//     return (
//         <section className="py-12 bg-white sm:py-16 lg:py-20">
//             <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//                 <div className="max-w-md mx-auto text-center">
//                     <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">SẢN PHẨM</h2>
//                     <p className="mt-4 text-base font-normal leading-7 text-gray-600"></p>
//                 </div>

//                 {/* Filter Bar */}
//                 <div className="mb-6 bg-white rounded-xl shadow-sm">
//                     <div className="flex flex-col sm:flex-row sm:items-end gap-2 p-2 sm:p-3">
//                         {/* Product Type Filter */}
//                         <div className="w-full sm:w-52">
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Loại sản phẩm</label>
//                             <select
//                                 name="maLoai"
//                                 value={selectedMaLoai}
//                                 onChange={handleMaLoaiChange}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
//                             >
//                                 <option value="">Tất cả loại sản phẩm</option>
//                                 {loaiList.map((loai) => (
//                                     <option key={loai.maLoai} value={loai.maLoai}>
//                                         {loai.tenLoai}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Search Input */}
//                         <div className="w-full sm:w-64 relative">
//                             <label htmlFor="search_sanpham" className="sr-only">
//                                 Tìm kiếm
//                             </label>
//                             <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
//                                 <svg
//                                     className="w-4 h-4 text-gray-400"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                     />
//                                 </svg>
//                             </div>
//                             <input
//                                 type="search"
//                                 name="search"
//                                 id="search_sanpham"
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 placeholder-gray-500 text-gray-900 text-sm"
//                                 placeholder="Tìm kiếm sản phẩm"
//                             />
//                         </div>

//                         {/* Page Size Selector */}
//                         <div className="flex items-center gap-2 w-full sm:w-52 sm:ml-auto">
//                             <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Hiển thị:</span>
//                             <select
//                                 value={pageSize}
//                                 onChange={handleChangePageSize}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
//                             >
//                                 {[8, 12, 16, 20].map((size) => (
//                                     <option key={size} value={size}>
//                                         {size} Sản phẩm
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Product Grid */}
//                 {loading ? (
//                     <div className="text-center">Đang tải...</div>
//                 ) : products.length === 0 ? (
//                     <div className="text-center">Không có sản phẩm nào</div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
//                         {products.map((product) => (
//                             <Product key={product.id} product={product} openModal={fetchProductDetails} />
//                         ))}
//                     </div>
//                 )}

//                 {/* Pagination */}
//                 <div className="flex justify-center mt-8">
//                     <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
//                 </div>
//             </div>

//             {/* Product Detail Modal */}
//             {isModalOpen && selectedProduct && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//                     onClick={handleOverlayClick}
//                 >
//                     <div
//                         className="bg-white rounded-lg p-4 sm:p-6 w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto relative"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         <button
//                             className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full p-2 sm:p-3 z-10 transition-colors duration-200"
//                             onClick={closeModal}
//                         >
//                             <svg
//                                 className="w-6 h-6 sm:w-8 sm:h-8"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M6 18L18 6M6 6l12 12"
//                                 />
//                             </svg>
//                         </button>
//                         {modalLoading ? (
//                             <div className="text-center">Đang tải chi tiết...</div>
//                         ) : (
//                             <div className="flex flex-col md:flex-row gap-6 md:gap-8">
//                                 {/* Product Images */}
//                                 <div className="w-full md:w-1/2">
//                                     <div className="relative aspect-[4/3]">
//                                         <img
//                                             src={`/assets/images/${mainImage}`}
//                                             alt={selectedProduct.tenSanPham}
//                                             className="w-full h-full object-cover rounded-lg"
//                                             onError={(e) => (e.target.src = '/assets/images/placeholder.jpg')}
//                                         />
//                                         <button className="absolute top-2 right-2 bg-white rounded-full p-1">
//                                             <svg
//                                                 className="w-6 h-6"
//                                                 fill="none"
//                                                 stroke="currentColor"
//                                                 viewBox="0 0 24 24"
//                                             >
//                                                 <path
//                                                     strokeLinecap="round"
//                                                     strokeLinejoin="round"
//                                                     strokeWidth="2"
//                                                     d="M5 13l4 4L19 7"
//                                                 />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     <div className="flex gap-2 mt-4 overflow-x-auto">
//                                         {selectedProduct.chiTietSps?.map(
//                                             (ct, index) =>
//                                                 ct?.anhChiTietSp && (
//                                                     <img
//                                                         key={index}
//                                                         src={`/assets/images/${ct.anhChiTietSp}`}
//                                                         alt={`${selectedProduct.tenSanPham} ${index + 1}`}
//                                                         className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md cursor-pointer hover:opacity-75 flex-shrink-0"
//                                                         onClick={() => handleThumbnailClick(ct.anhChiTietSp, ct)}
//                                                     />
//                                                 ),
//                                         )}
//                                     </div>
//                                 </div>
//                                 {/* Product Details */}
//                                 <div className="w-full md:w-1/2 flex flex-col justify-between">
//                                     <div>
//                                         <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//                                             {selectedProduct.tenSanPham}
//                                         </h1>
//                                         <p className="text-gray-600 mb-4 text-lg sm:text-xl">
//                                             {selectedProduct.giaSanPham.toLocaleString('vi-VN')} VNĐ
//                                         </p>
//                                         <p className="text-gray-500 mb-6 text-sm sm:text-base">
//                                             {selectedProduct.moTaSp}
//                                         </p>
//                                         {selectedDetail && (
//                                             <div className="mb-4">
//                                                 <p className="text-sm sm:text-base font-medium text-gray-700">
//                                                     Màu sắc:{' '}
//                                                     <span className="text-gray-900">
//                                                         {selectedDetail.tenMau || 'Không xác định'}
//                                                     </span>
//                                                 </p>
//                                                 <p className="text-sm sm:text-base font-medium text-gray-700">
//                                                     Chất liệu:{' '}
//                                                     <span className="text-gray-900">
//                                                         {selectedDetail.tenCl || 'Không xác định'}
//                                                     </span>
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default ListProducts;

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SanPhamApi from '~/api/SanPhamApi';
import Product from '~/components/Product';
import Pagination from '~/components/Pagination';
import axios from 'axios';

function ListProducts() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);
    const [mainImage, setMainImage] = useState('');
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [selectedMaLoai, setSelectedMaLoai] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loaiList, setLoaiList] = useState([]);
    const [productReviews, setProductReviews] = useState([]);

    // Fetch product categories
    const fetchLoai = async () => {
        try {
            const response = await axios.get('https://localhost:7111/api/Loai');
            setLoaiList(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách thể loại:', error);
            toast.error('Lỗi khi lấy danh sách thể loại!');
        }
    };

    // Fetch products with filters
    const fetchProducts = async (page = pageNumber, size = pageSize, search = searchTerm, maLoai = selectedMaLoai) => {
        setLoading(true);
        try {
            let filteredProducts = [];
            let totalItems = 0;

            if (search || maLoai) {
                const response = await axios.post(
                    'https://localhost:7111/SanPham/Search',
                    {},
                    {
                        params: {
                            s: search || undefined,
                            maLoai: maLoai || undefined,
                        },
                    },
                );
                filteredProducts = response.data;
                totalItems = filteredProducts.length;
                const startIndex = (page - 1) * size;
                filteredProducts = filteredProducts.slice(startIndex, startIndex + size);
            } else {
                const res = await SanPhamApi.getList(page, size);
                filteredProducts = res.items;
                totalItems = res.totalItems;
            }

            setProducts(filteredProducts);
            setTotalPages(Math.ceil(totalItems / size) || 1);
        } catch (error) {
            console.error(error);
            toast.error('Lỗi khi tải danh sách sản phẩm!');
        } finally {
            setLoading(false);
        }
    };

    // Fetch customer name by maKhachHang
    const fetchCustomerName = async (maKhachHang) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://localhost:7111/api/KhachHang/${maKhachHang}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            return response.data.tenKhachHang || 'Khách hàng ẩn danh';
        } catch (error) {
            console.error(`Lỗi khi lấy tên khách hàng ${maKhachHang}:`, error);
            return 'Khách hàng ẩn danh';
        }
    };

    // Fetch product details and reviews
    const fetchProductDetails = async (id) => {
        setModalLoading(true);
        try {
            // Fetch product details
            const productDetails = await SanPhamApi.getById(id);
            setSelectedProduct(productDetails);
            setMainImage(productDetails.anhSp);
            setSelectedDetail(productDetails.chiTietSps?.[0] || null);

            // Fetch reviews
            const token = localStorage.getItem('token');
            const params = new URLSearchParams({ maSanPham: productDetails.maSanPham });
            const response = await axios.get(`https://localhost:7111/api/DanhGia/list_nologin?${params.toString()}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });

            // If tenKhachHang is missing, fetch it
            const reviews = response.data || [];
            const enrichedReviews = await Promise.all(
                reviews.map(async (review) => {
                    if (!review.tenKhachHang && review.maKhachHang) {
                        const tenKhachHang = await fetchCustomerName(review.maKhachHang);
                        return { ...review, tenKhachHang };
                    }
                    return review;
                }),
            );

            setProductReviews(enrichedReviews);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Lỗi khi tải chi tiết sản phẩm hoặc đánh giá:', error);
            setProductReviews([]);
            setIsModalOpen(true); // Still open modal to show product details
        } finally {
            setModalLoading(false);
        }
    };

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPageNumber(newPage);
        }
    };

    const handleChangePageSize = (e) => {
        const newSize = parseInt(e.target.value) || 8;
        setPageSize(newSize);
        setPageNumber(1);
    };

    const handleMaLoaiChange = (e) => {
        setSelectedMaLoai(e.target.value);
        setPageNumber(1);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPageNumber(1);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setMainImage('');
        setSelectedDetail(null);
        setProductReviews([]);
    };

    const handleThumbnailClick = (image, detail) => {
        setMainImage(image);
        setSelectedDetail(detail);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    useEffect(() => {
        fetchLoai();
    }, []);

    useEffect(() => {
        fetchProducts(pageNumber, pageSize, searchTerm, selectedMaLoai);
    }, [pageNumber, pageSize, searchTerm, selectedMaLoai]);

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">SẢN PHẨM</h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600"></p>
                </div>

                {/* Filter Bar */}
                <div className="mb-6 bg-white rounded-xl shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-2 p-2 sm:p-3">
                        {/* Product Type Filter */}
                        <div className="w-full sm:w-52">
                            <label className="block text-xs font-medium text-gray-700 mb-1">Loại sản phẩm</label>
                            <select
                                name="maLoai"
                                value={selectedMaLoai}
                                onChange={handleMaLoaiChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
                            >
                                <option value="">Tất cả loại sản phẩm</option>
                                {loaiList.map((loai) => (
                                    <option key={loai.maLoai} value={loai.maLoai}>
                                        {loai.tenLoai}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Input */}
                        <div className="w-full sm:w-64 relative">
                            <label htmlFor="search_sanpham" className="sr-only">
                                Tìm kiếm
                            </label>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5">
                                <svg
                                    className="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                name="search"
                                id="search_sanpham"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 placeholder-gray-500 text-gray-900 text-sm"
                                placeholder="Tìm kiếm sản phẩm"
                            />
                        </div>

                        {/* Page Size Selector */}
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
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="text-center">Đang tải...</div>
                ) : products.length === 0 ? (
                    <div className="text-center">Không có sản phẩm nào</div>
                ) : (
                    <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                        {products.map((product) => (
                            <Product key={product.id} product={product} openModal={fetchProductDetails} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-8">
                    <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
                </div>
            </div>

            {/* Product Detail Modal */}
            {isModalOpen && selectedProduct && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleOverlayClick}
                >
                    <div
                        className="bg-white rounded-lg p-4 sm:p-6 w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900 rounded-full p-2 sm:p-3 z-10 transition-colors duration-200"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-6 h-6 sm:w-8 sm:h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        {modalLoading ? (
                            <div className="text-center">Đang tải chi tiết...</div>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {/* Product Images and Details */}
                                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                    {/* Product Images */}
                                    <div className="w-full md:w-1/2">
                                        <div className="relative aspect-[4/3]">
                                            <img
                                                src={`/assets/images/${mainImage}`}
                                                alt={selectedProduct.tenSanPham}
                                                className="w-full h-full object-cover rounded-lg"
                                                onError={(e) => (e.target.src = '/assets/images/placeholder.jpg')}
                                            />
                                            <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex gap-2 mt-4 overflow-x-auto">
                                            {selectedProduct.chiTietSps?.map(
                                                (ct, index) =>
                                                    ct?.anhChiTietSp && (
                                                        <img
                                                            key={index}
                                                            src={`/assets/images/${ct.anhChiTietSp}`}
                                                            alt={`${selectedProduct.tenSanPham} ${index + 1}`}
                                                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md cursor-pointer hover:opacity-75 flex-shrink-0"
                                                            onClick={() => handleThumbnailClick(ct.anhChiTietSp, ct)}
                                                        />
                                                    ),
                                            )}
                                        </div>
                                    </div>
                                    {/* Product Details */}
                                    <div className="w-full md:w-1/2 flex flex-col justify-between">
                                        <div>
                                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                                                {selectedProduct.tenSanPham}
                                            </h1>
                                            <p className="text-gray-600 mb-4 text-lg sm:text-xl">
                                                {selectedProduct.giaSanPham.toLocaleString('vi-VN')} VNĐ
                                            </p>
                                            <p className="text-gray-500 mb-6 text-sm sm:text-base">
                                                {selectedProduct.moTaSp}
                                            </p>
                                            {selectedDetail && (
                                                <div className="mb-4">
                                                    <p className="text-sm sm:text-base font-medium text-gray-700">
                                                        Màu sắc:{' '}
                                                        <span className="text-gray-900">
                                                            {selectedDetail.tenMau || 'Không xác định'}
                                                        </span>
                                                    </p>
                                                    <p className="text-sm sm:text-base font-medium text-gray-700">
                                                        Chất liệu:{' '}
                                                        <span className="text-gray-900">
                                                            {selectedDetail.tenCl || 'Không xác định'}
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* Product Reviews */}
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h2>
                                    {productReviews.length === 0 ? (
                                        <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
                                    ) : (
                                        <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                            {productReviews.map((review) => (
                                                <div key={review.maDg} className="border-b pb-4">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <p className="font-medium text-gray-900 capitalize">
                                                            {review.tenKhachHang || 'Khách hàng ẩn danh'}
                                                        </p>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-4 h-4 ${
                                                                        i < review.danhGia
                                                                            ? 'text-yellow-400'
                                                                            : 'text-gray-300'
                                                                    }`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 text-sm">
                                                        {review.binhLuan || 'Không có bình luận'}
                                                    </p>
                                                    <p className="text-gray-400 text-xs mt-1">
                                                        {new Date(review.ngayDanhGia).toLocaleDateString('vi-VN')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ListProducts;
