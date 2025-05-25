import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SanPhamApi from '~/api/SanPhamApi';
import Product from '~/components/Product';
import Pagination from '~/components/Pagination';

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

    const fetchProductDetails = async (id) => {
        setModalLoading(true);
        try {
            const productDetails = await SanPhamApi.getById(id);
            setSelectedProduct(productDetails);
            setMainImage(productDetails.anhSp);
            setSelectedDetail(productDetails.chiTietSps?.[0] || null);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Lỗi khi tải chi tiết sản phẩm:', error);
            toast.error('Lỗi khi tải chi tiết sản phẩm!');
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
        const newSize = parseInt(e.target.value) || 5;
        setPageSize(newSize);
        setPageNumber(1);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        setMainImage('');
        setSelectedDetail(null);
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
        fetchProducts();
    }, [pageNumber, pageSize]);

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">SẢN PHẨM</h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600"></p>
                </div>
                <div className="flex items-center gap-2 mb-6">
                    <span>Hiển thị:</span>
                    <select value={pageSize} onChange={handleChangePageSize} className="border px-2 py-1 rounded">
                        {[8, 12, 16, 20].map((size) => (
                            <option key={size} value={size}>
                                {size} Sản phẩm
                            </option>
                        ))}
                    </select>
                </div>
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
                <div className="flex justify-center mt-8">
                    <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
                </div>
            </div>

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
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default ListProducts;
