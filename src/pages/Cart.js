// 5
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '~/api/CartContext';

function Cart() {
    const { cart, loading, fetchCart, removeFromCart, updateCartItemQuantity } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    if (loading) {
        return <div className="text-center py-8">Đang tải giỏ hàng...</div>;
    }

    if (!cart || !cart.chiTietGioHang || cart.chiTietGioHang.length === 0) {
        return <div className="text-center py-8">Giỏ hàng của bạn đang trống</div>;
    }

    const handleSelectItem = (maChiTietGH) => {
        setSelectedItems((prev) =>
            prev.includes(maChiTietGH) ? prev.filter((itemId) => itemId !== maChiTietGH) : [...prev, maChiTietGH],
        );
    };

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setSelectedItems(newSelectAll ? cart.chiTietGioHang.map((item) => item.maChiTietGH) : []);
    };

    const handleQuantityChange = (maChiTietGH, newQuantity) => {
        if (newQuantity >= 1) {
            updateCartItemQuantity(maChiTietGH, newQuantity);
        }
    };

    const totalPrice = cart.chiTietGioHang
        .filter((item) => selectedItems.includes(item.maChiTietGH))
        .reduce((total, item) => total + item.giaSanPham * item.slSP, 0);

    const getImageSrc = (anhSp) => (anhSp ? `/assets/images/${anhSp}.jpg` : '/assets/images/placeholder.jpg');

    return (
        <section>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm/py-12 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <header className="text-center">
                        <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Giỏ Hàng</h1>
                    </header>

                    <div className="mt-8">
                        <div className="flex items-center border-b border-gray-200 py-4 text-sm font-medium text-gray-600">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                                className="mr-4 h-5 w-5"
                            />
                            <span className="flex-1">Sản Phẩm</span>
                            <span className="w-24 text-center">Đơn Giá</span>
                            <span className="w-32 text-center">Số Lượng</span>
                            <span className="w-24 text-center">Thành Tiền</span>
                            <span className="w-16 text-center">Thao Tác</span>
                        </div>

                        <ul className="space-y-4">
                            {cart.chiTietGioHang.map((item, index) => (
                                <li
                                    key={item.maChiTietGH}
                                    className={`flex items-center gap-4 py-4 ${
                                        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(item.maChiTietGH)}
                                        onChange={() => handleSelectItem(item.maChiTietGH)}
                                        className="h-5 w-5"
                                    />
                                    <img
                                        src={getImageSrc(item.anhSp)}
                                        alt={item.sanPham}
                                        loading="lazy"
                                        className="size-16 rounded-sm object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-sm text-gray-900">{item.sanPham}</h3>
                                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                            <div>
                                                <dt className="inline">Mã sản phẩm: </dt>
                                                <dd className="inline">{item.maSanPham}</dd>
                                            </div>
                                        </dl>
                                    </div>

                                    <div className="w-24 text-center text-sm text-gray-900">
                                        {item.giaSanPham.toLocaleString('vi-VN')} VNĐ
                                    </div>

                                    <div className="w-32 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => handleQuantityChange(item.maChiTietGH, item.slSP - 1)}
                                                className="px-2 py-1 bg-gray-200 rounded-sm"
                                                disabled={item.slSP <= 1}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.slSP}
                                                onChange={(e) =>
                                                    handleQuantityChange(item.maChiTietGH, parseInt(e.target.value))
                                                }
                                                className="h-8 w-12 rounded-sm border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                                            />
                                            <button
                                                onClick={() => handleQuantityChange(item.maChiTietGH, item.slSP + 1)}
                                                className="px-2 py-1 bg-gray-200 rounded-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="w-24 text-center text-sm font-medium text-red-600">
                                        {(item.giaSanPham * item.slSP).toLocaleString('vi-VN')} VNĐ
                                    </div>

                                    <div className="w-16 text-center">
                                        <button
                                            onClick={() => removeFromCart(item.maChiTietGH)}
                                            className="text-gray-600 transition hover:text-red-600"
                                        >
                                            <span className="sr-only">Xóa sản phẩm</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="size-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                            <div className="w-screen max-w-lg space-y-4">
                                <dl className="space-y-0.5 text-sm text-gray-700">
                                    <div className="flex justify-between">
                                        <dt>Tổng tiền hàng</dt>
                                        <dd>{totalPrice.toLocaleString('vi-VN')} VNĐ</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt>Phí vận chuyển</dt>
                                        <dd>10,000 VNĐ</dd>
                                    </div>
                                    <div className="flex justify-between !text-base font-medium">
                                        <dt>Tổng thanh toán</dt>
                                        <dd>{(totalPrice + 10000).toLocaleString('vi-VN')} VNĐ</dd>
                                    </div>
                                </dl>

                                <div className="flex justify-end">
                                    <Link
                                        to="/checkout"
                                        className="block rounded-sm bg-orange-500 px-5 py-3 text-sm text-white transition hover:bg-orange-600"
                                    >
                                        Thanh Toán ({selectedItems.length})
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;
