import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ThongKeSanPham = () => {
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'luotBan', direction: 'desc' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product data from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://localhost:7111/api/GetAllProductSale');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handle sorting
    const handleSort = (key) => {
        setSortConfig((prevConfig) => {
            const direction = prevConfig.key === key && prevConfig.direction === 'desc' ? 'asc' : 'desc';
            return { key, direction };
        });
    };

    // Sort products based on sortConfig
    const sortedProducts = [...products].sort((a, b) => {
        if (sortConfig.key === 'luotBan') {
            return sortConfig.direction === 'asc' ? a.luotBan - b.luotBan : b.luotBan - a.luotBan;
        } else if (sortConfig.key === 'tongTien') {
            return sortConfig.direction === 'asc' ? a.tongTien - b.tongTien : b.tongTien - a.tongTien;
        }
        return 0;
    });

    // Format currency for display
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    if (loading)
        return <div className="text-center text-base sm:text-lg font-semibold text-gray-600 mt-12">Đang tải...</div>;
    if (error)
        return <div className="text-center text-sm sm:text-base font-medium text-red-500 mt-12">Lỗi: {error}</div>;

    return (
        <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 max-w-full sm:max-w-2xl lg:max-w-4xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-gray-800 text-center">
                Thống Kê Sản Phẩm
            </h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="sticky left-0  bg-white back px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[30px]">
                                Mã SP
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[60px]">
                                Ảnh
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[120px]">
                                Tên Sản Phẩm
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[100px]">
                                Giá
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[150px]">
                                Loại
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[80px]">
                                Tồn Kho
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[100px]">
                                Mô Tả
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[100px]">
                                Ngày Thêm
                            </th>
                            <th
                                className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[80px] cursor-pointer hover:bg-gray-300 transition"
                                onClick={() => handleSort('luotBan')}
                            >
                                Lượt Bán {sortConfig.key === 'luotBan' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th
                                className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[100px] cursor-pointer hover:bg-gray-300 transition"
                                onClick={() => handleSort('tongTien')}
                            >
                                Tổng Tiền{' '}
                                {sortConfig.key === 'tongTien' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold border-b border-gray-300 min-w-[30px]">
                                Đánh Giá
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product, index) => (
                            <tr
                                key={product.maSanPham}
                                className={`border-b ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-gray-100 transition`}
                            >
                                <td className="sticky left-0  bg-white px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.maSanPham}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                                    {product.anhSp ? (
                                        <img
                                            src={`/assets/images/${product.anhSp}`}
                                            alt={product.tenSanPham}
                                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-cover rounded-md border border-gray-200 shadow-sm"
                                        />
                                    ) : (
                                        <span className="text-gray-500">Không có ảnh</span>
                                    )}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.tenSanPham}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {formatCurrency(product.giaSanPham)}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.loaiSanPham}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.sLtonKho}
                                </td>
                                <td className="px-2 truncate  max-w-[150px] sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.moTaSp}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {formatDate(product.ngayThemSp)}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.luotBan}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {formatCurrency(product.tongTien)}
                                </td>
                                <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                                    {product.soSaoTrungBinh.toFixed(1)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ThongKeSanPham;
