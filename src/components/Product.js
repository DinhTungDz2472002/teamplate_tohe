import { useContext, useState } from 'react';
import { CartContext } from '~/api/CartContext';

function Product({ product }) {
    const { addToCart, loading } = useContext(CartContext);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault();
        setIsAdding(true);
        try {
            console.log('Thêm sản phẩm:', product.maSanPham);
            await addToCart(product.maSanPham, 1); // Thêm 1 sản phẩm
        } catch (err) {
            console.error('Lỗi khi thêm vào giỏ hàng:', err);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="relative group shadow-lg rounded-2xl overflow-hidden bg-white p-4 hover:shadow-2xl transition-all duration-300">
            <div className="relative rounded-md overflow-hidden w-full pt-[100%]">
                <img
                    className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
                    src={`/assets/images/${product.anhSp}`}
                    alt={product.tenSanPham}
                    onError={(e) => (e.target.src = '/assets/images/placeholder.jpg')}
                />
            </div>
            <div className="line-clamp-1 group-hover:line-clamp-none group-hover:whitespace-normal group-hover:overflow-visible">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    <a href="#" title="" className="relative block">
                        {product.tenSanPham}
                        <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                </h3>
            </div>
            <div className="flex items-start justify-between mt-4 space-x-4">
                <div>
                    <div className="flex items-center mt-2.5 space-x-px">
                        {[...Array(5)].map((_, idx) => (
                            <svg
                                key={idx}
                                className={`w-4 h-4 ${idx < 3 ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                        {product.giaSanPham.toLocaleString('vi-VN')} VNĐ
                    </p>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-700 group-hover:line-clamp-none group-hover:whitespace-normal group-hover:overflow-visible">
                    {product.moTaSp}
                </p>
            </div>
            <form className="mt-4 flex gap-4" onSubmit={handleAddToCart}>
                <button
                    type="submit"
                    disabled={loading || isAdding}
                    className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 disabled:opacity-50"
                >
                    {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ'}
                </button>
                <button
                    type="button"
                    className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                >
                    Mua ngay
                </button>
            </form>
        </div>
    );
}

export default Product;
