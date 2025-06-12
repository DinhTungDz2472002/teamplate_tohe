import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SanPhamApi from '~/api/SanPhamApi';
import Pagination from '~/components/Pagination';
import axios from 'axios';

export default function ListProductAdmin() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedMaLoai, setSelectedMaLoai] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [productData, setProductData] = useState({
        maSanPham: null,
        tenSanPham: '',
        giaSanPham: '',
        maLoai: '',
        sltonKho: 100000,
        moTaSp: '',
        anhSp: '',
        chiTietSps: [{ maMau: '', maCl: '', giamGiaSp: 0, anhChiTietSp: null, previewUrl: null }],
    });
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loaiList, setLoaiList] = useState([]);
    const [mauList, setMauList] = useState([]);
    const [chatlieuList, setChatlieuList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch products
    const fetchProducts = async (page = pageNumber, size = pageSize, search = searchTerm, maLoai = selectedMaLoai) => {
        setLoading(true);
        try {
            let filteredProducts = [];
            let totalItems = 0;

            if (search || maLoai) {
                // Call search API with s and/or maLoai
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
                // Client-side pagination for search results
                const startIndex = (page - 1) * size;
                filteredProducts = filteredProducts.slice(startIndex, startIndex + size);
            } else {
                // Fetch all products
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
        fetchLoai();
        fetchMau();
        fetchChatLieu();
    }, []);

    useEffect(() => {
        fetchProducts(pageNumber, pageSize, searchTerm, selectedMaLoai);
    }, [pageNumber, pageSize, searchTerm, selectedMaLoai]);

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setPageNumber(1); // Reset to first page on search
    };

    // Handle product type selection
    const handleMaLoaiChange = (e) => {
        const value = e.target.value;
        setSelectedMaLoai(value);
        setPageNumber(1); // Reset to first page on type change
        setProductData({ ...productData, maLoai: value });
    };

    // Handle add product
    const handleAddProduct = () => {
        setProductData({
            maSanPham: null,
            tenSanPham: '',
            giaSanPham: '',
            maLoai: '',
            sltonKho: 100000,
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
            const response = await SanPhamApi.getById(product.maSanPham);
            const fullProduct = response;
            setProductData({
                maSanPham: fullProduct.maSanPham,
                tenSanPham: fullProduct.tenSanPham,
                giaSanPham: fullProduct.giaSanPham,
                maLoai: fullProduct.maLoai || '',
                sltonKho: fullProduct.sltonKho || 100000,
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

    // Handle delete product
    const handleDelete = async (id) => {
        try {
            await SanPhamApi.delete(id);
            toast.success('Xóa sản phẩm thành công!');
            fetchProducts(pageNumber, pageSize, searchTerm, selectedMaLoai);
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
            fetchProducts(pageNumber, pageSize, searchTerm, selectedMaLoai);
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
        const newSize = parseInt(e.target.value) || 8;
        setPageSize(newSize);
        setPageNumber(1);
    };

    return (
        <div className="p-4 sm:p-5 bg-gray-50 min-h-screen">
            {/* Filter Bar with Horizontal Scroll on Small Screens */}
            <div className="mb-6 bg-white rounded-xl shadow-sm overflow-x-auto">
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 p-4 min-w-[600px] sm:min-w-0">
                    {/* Add Product Button */}
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-200 w-full sm:w-40 shrink-0"
                        onClick={handleAddProduct}
                    >
                        Thêm sản phẩm
                    </button>

                    {/* Product Type Filter */}
                    <div className="w-full sm:max-w-40 shrink">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Loại sản phẩm</label>
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
                    <div className="w-full sm:max-w-72 shrink">
                        <label htmlFor="search_sanpham" className="sr-only">
                            Tìm kiếm
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
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
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 placeholder-gray-500 text-gray-900 text-sm"
                                placeholder="Tìm kiếm sản phẩm hoặc loại"
                            />
                        </div>
                    </div>

                    {/* Page Size Selector */}
                    <div className="flex items-center gap-2 w-full sm:max-w-52 shrink">
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Hiển thị:</span>
                        <select
                            value={pageSize}
                            onChange={handleChangePageSize}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white text-gray-900 text-sm"
                        >
                            {[8, 10, 20, 30].map((size) => (
                                <option key={size} value={size}>
                                    {size} Sản phẩm
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table with Horizontal Scroll */}
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
                <table className="min-w-[700px] w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[30px]">ID</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[150px]">
                                Tên sản phẩm
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                                Giá (VND)
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                                Ảnh
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[100px]">
                                Loại
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[50px]">
                                Lượt bán
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900 min-w-[150px]">
                                Mô tả
                            </th>
                            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-900 min-w-[120px]">
                                Hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500 text-sm">
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : products.length ? (
                            products.map((product) => (
                                <tr key={product.maSanPham} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="py-3 px-4 text-sm text-gray-900">{product.maSanPham}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 truncate max-w-[150px]">
                                        {product.tenSanPham}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">
                                        {product.giaSanPham?.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4">
                                        {product.anhSp ? (
                                            <img
                                                className="w-12 h-12 object-cover rounded-md"
                                                src={`/assets/images/${product.anhSp}`}
                                                alt={product.tenSanPham}
                                                onError={(e) => {
                                                    e.target.src = '/assets/images/default.png';
                                                }}
                                            />
                                        ) : (
                                            <span className="text-sm text-gray-500">No image</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">
                                        {product.loaiSanPham?.toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-900">{product.luotBan}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 truncate max-w-[150px]">
                                        {product.moTaSp || '-'}
                                    </td>
                                    <td className="py-3 px-4 flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-3 rounded-lg transition-colors duration-200"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-lg transition-colors duration-200"
                                            onClick={() => setConfirmDeleteId(product.maSanPham)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-10 text-gray-500 text-sm">
                                    Không có sản phẩm.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
            </div>

            {/* Add/Edit Product Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-[95%] sm:max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
                            {isAdding ? 'Thêm Sản Phẩm' : 'Sửa Sản Phẩm'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        name="tenSanPham"
                                        value={productData.tenSanPham}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                        placeholder="Nhập tên sản phẩm"
                                    />
                                </div>
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                        placeholder="Nhập giá sản phẩm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Loại sản phẩm
                                    </label>
                                    <select
                                        name="maLoai"
                                        value={productData.maLoai}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                    >
                                        <option value="">Chọn loại sản phẩm</option>
                                        {loaiList.map((loai) => (
                                            <option key={loai.maLoai} value={loai.maLoai}>
                                                {loai.tenLoai}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                        placeholder="Nhập số lượng tồn kho"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                    <textarea
                                        name="moTaSp"
                                        value={productData.moTaSp}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm resize-y"
                                        placeholder="Nhập mô tả sản phẩm"
                                        rows="4"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors duration-200">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <p className="text-gray-500 text-sm">
                                            {file ? file.name : 'Kéo thả hoặc nhấn để chọn ảnh'}
                                        </p>
                                    </div>
                                    {previewUrl && (
                                        <div className="mt-4">
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                className="w-24 h-24 object-cover rounded-md mx-auto"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Chi tiết sản phẩm
                                    </label>
                                    {productData.chiTietSps.map((ct, index) => (
                                        <div
                                            key={index}
                                            className="border border-gray-200 p-4 rounded-lg mb-4 relative"
                                        >
                                            <h3 className="text-base font-semibold text-gray-800 mb-3">
                                                Chi tiết sản phẩm {index + 1}
                                            </h3>
                                            <button
                                                type="button"
                                                className="absolute top-2 right-2 text-red-500 hover:text-red-600 text-sm"
                                                onClick={() => removeChiTietSp(index)}
                                                aria-label="Xóa chi tiết sản phẩm"
                                            >
                                                Xóa
                                            </button>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                                    >
                                                        <option value="">Chọn màu sắc</option>
                                                        {mauList.map((mau) => (
                                                            <option key={mau.maMau} value={mau.maMau}>
                                                                {mau.tenMau}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
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
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                                    >
                                                        <option value="">Chọn chất liệu</option>
                                                        {chatlieuList.map((cl) => (
                                                            <option key={cl.maCl} value={cl.maCl}>
                                                                {cl.tenCl}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
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
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-sm"
                                                        placeholder="Nhập % giảm giá"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Ảnh chi tiết sản phẩm
                                                    </label>
                                                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors duration-200">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleChiTietSpFileChange(index, e)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        />
                                                        <p className="text-gray-500 text-sm">
                                                            {ct.anhChiTietSp
                                                                ? ct.anhChiTietSp.name || ct.anhChiTietSp
                                                                : 'Kéo hoặc nhấn để chọn ảnh'}
                                                        </p>
                                                    </div>
                                                    {ct.previewUrl && (
                                                        <div className="mt-2">
                                                            <img
                                                                src={ct.previewUrl}
                                                                alt={`Chi tiết ${index + 1}`}
                                                                className="w-16 h-16 object-cover rounded"
                                                                mx-auto
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                        onClick={addChiTietSp}
                                    >
                                        Thêm chi tiết sản phẩm
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                    onClick={() => setModalOpen(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`py-2 px-4 rounded-lg text-white font-medium text-sm transition-colors duration-200 ${
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

            {/* Delete Confirmation Modal */}
            {confirmDeleteId && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-[90%] sm:max-w-[300px] text-center">
                        <h2 className="text-base sm:text-lg font-bold mb-4 text-gray-800">Bạn có chắc muốn xóa?</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                                onClick={() => setConfirmDeleteId(null)}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
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
