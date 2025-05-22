// import Product from '~/components/Product';
// import Pagination from '~/components/Pagination';
// import { useState, useEffect } from 'react';

// function ListProducts() {
//     return (
//         <section className="py-12 bg-white sm:py-16 lg:py-20">
//             <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
//                 <div className="max-w-md mx-auto text-center">
//                     <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">SẢN PHẨM</h2>
//                     <p className="mt-4 text-base font-normal leading-7 text-gray-600"></p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
//                     <Product />
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default ListProducts;

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import SanPhamApi from '~/api/SanPhamApi';
import Product from '~/components/Product';
import Pagination from '~/components/Pagination';

function ListProducts() {
    const [products, setProducts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

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

    const handleChangePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPageNumber(newPage);
        }
    };

    const handleChangePageSize = (e) => {
        const newSize = parseInt(e.target.value) || 5;
        setPageSize(newSize);
        setPageNumber(1); // Reset to first page
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
                                {size} dòng
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
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handleChangePage} />
                </div>
            </div>
        </section>
    );
}

export default ListProducts;
