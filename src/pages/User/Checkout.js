// import { useLocation, useNavigate } from 'react-router-dom';
// import { useState, useEffect, useContext } from 'react';
// import { CartContext } from '~/api/CartContext';
// import { toast } from 'react-toastify';

// const CartItem = ({ item }) => (
//     <div className="flex items-center p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm">
//         <img
//             src={item.anhSp ? `/assets/images/${item.anhSp}` : '/assets/images/placeholder.jpg'}
//             alt={item.sanPham}
//             className="w-20 h-20 object-cover rounded-md mr-4 border border-gray-100"
//         />
//         <div className="flex-1">
//             <h3 className="text-lg font-semibold text-gray-900 truncate">{item.sanPham}</h3>
//             <p className="text-sm text-gray-500">Mã sản phẩm: {item.maSanPham}</p>
//             <p className="text-sm text-gray-500">Số lượng: {item.slSP}</p>
//         </div>
//         <div className="text-right">
//             <h3 className="text-lg font-medium text-gray-900">
//                 {(item.giaSanPham * item.slSP).toLocaleString('vi-VN')} VNĐ
//             </h3>
//         </div>
//     </div>
// );

// const CartSummary = ({ items, totalPrice }) => {
//     return (
//         <div className="bg-gray-100 p-6 rounded-lg h-fit">
//             <h3 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h3>
//             {items.map((item, index) => (
//                 <div key={index} className="flex justify-between mb-2">
//                     <span>
//                         {item.sanPham} (x{item.slSP})
//                     </span>
//                     <span>{(item.giaSanPham * item.slSP).toLocaleString('vi-VN')} VNĐ</span>
//                 </div>
//             ))}
//             <div className="flex justify-between mb-2">
//                 <span>Phí vận chuyển</span>
//                 <span>10,000 VNĐ</span>
//             </div>
//             <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
//                 <span>Tổng cộng:</span>
//                 <span>{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
//             </div>
//         </div>
//     );
// };

// const Checkout = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { createOrder, fetchCart } = useContext(CartContext);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [error, setError] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//         // Ưu tiên lấy dữ liệu từ location.state
//         if (location.state && location.state.selectedItems && location.state.totalPrice) {
//             setSelectedItems(location.state.selectedItems);
//             setTotalPrice(location.state.totalPrice);
//         } else {
//             // Nếu không có location.state, lấy từ localStorage
//             const storedItems = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
//             setSelectedItems(storedItems);
//             const calculatedTotalPrice =
//                 storedItems.reduce((total, item) => total + item.giaSanPham * item.slSP, 0) + 10000; // Thêm phí vận chuyển
//             setTotalPrice(calculatedTotalPrice);
//         }
//     }, [location.state]);

//     const [formData, setFormData] = useState({
//         name: '',
//         phone: '',
//         address: '',
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setIsSubmitting(true);

//         // Kiểm tra dữ liệu đầu vào
//         if (!formData.name || !formData.phone || !formData.address) {
//             setError('Vui lòng điền đầy đủ thông tin bắt buộc (Họ Tên, Số điện thoại, Địa chỉ).');
//             setIsSubmitting(false);
//             return;
//         }

//         // Kiểm tra định dạng số điện thoại
//         const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
//         if (!phoneRegex.test(formData.phone)) {
//             setError('Số điện thoại không hợp lệ.');
//             setIsSubmitting(false);
//             return;
//         }

//         if (selectedItems.length === 0) {
//             setError('Không có sản phẩm nào được chọn.');
//             setIsSubmitting(false);
//             return;
//         }

//         // Chuẩn bị dữ liệu gửi đến API
//         const orderData = {
//             TenKhachHang: formData.name,
//             DiaChi: formData.address,
//             SDT: formData.phone,
//             SelectedItems: selectedItems.map((item) => ({
//                 MaChiTietGH: item.maChiTietGH,
//                 SlSP: item.slSP,
//             })),
//         };

//         try {
//             const response = await createOrder(orderData);
//             // Xóa localStorage sau khi đặt hàng thành công
//             localStorage.removeItem('selectedCartItems');
//             // Cập nhật lại giỏ hàng
//             await fetchCart();
//             // Chuyển hướng đến trang lịch sử đơn hàng
//             navigate('/orders', { state: { hoaDon: response.hoaDon } });
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
//             <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-2xl font-bold mb-4">Đơn Hàng</h2>
//                 {selectedItems.length === 0 ? (
//                     <p className="text-gray-600">Không có sản phẩm nào được chọn.</p>
//                 ) : (
//                     selectedItems.map((item, index) => <CartItem key={index} item={item} />)
//                 )}
//                 <h2 className="text-2xl font-bold mt-8 mb-4">Thông tin đặt hàng</h2>
//                 {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                             Họ Tên *
//                         </label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
//                             Số điện thoại *
//                         </label>
//                         <input
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
//                             required
//                         />
//                     </div>
//                     <div>
//                         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                             Địa chỉ *
//                         </label>
//                         <input
//                             type="text"
//                             id="address"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleInputChange}
//                             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`w-full bg-orange-500 text-white py-2 rounded mt-4 hover:bg-orange-600 ${
//                             isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
//                         }`}
//                     >
//                         {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
//                     </button>
//                 </form>
//             </div>
//             <div className="w-full md:w-1/3">
//                 <CartSummary items={selectedItems} totalPrice={totalPrice} />
//             </div>
//         </div>
//     );
// };

// export default Checkout;

// 2

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '~/api/CartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 rounded-lg shadow-sm">
        <img
            src={item.anhSp ? `/assets/images/${item.anhSp}` : '/assets/images/placeholder.jpg'}
            alt={item.sanPham}
            className="w-20 h-20 object-cover rounded-md mr-4 border border-gray-100"
        />
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{item.sanPham}</h3>
            <p className="text-sm text-gray-500">Mã sản phẩm: {item.maSanPham}</p>
            <p className="text-sm text-gray-500">Số lượng: {item.slSP}</p>
        </div>
        <div className="text-right">
            <h3 className="text-lg font-medium text-gray-900">
                {(item.giaSanPham * item.slSP).toLocaleString('vi-VN')} VNĐ
            </h3>
        </div>
    </div>
);

const CartSummary = ({ items, totalPrice }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg h-fit">
            <h3 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h3>
            {items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                    <span>
                        {item.sanPham} (x{item.slSP})
                    </span>
                    <span>{(item.giaSanPham * item.slSP).toLocaleString('vi-VN')} VNĐ</span>
                </div>
            ))}
            <div className="flex justify-between mb-2">
                <span>Phí vận chuyển</span>
                <span>10,000 VNĐ</span>
            </div>
            <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
                <span>Tổng cộng:</span>
                <span>{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
            </div>
        </div>
    );
};

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { createOrder, fetchCart } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (location.state && location.state.selectedItems && location.state.totalPrice) {
            setSelectedItems(location.state.selectedItems);
            setTotalPrice(location.state.totalPrice);
        } else {
            const storedItems = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
            setSelectedItems(storedItems);
            const calculatedTotalPrice =
                storedItems.reduce((total, item) => total + item.giaSanPham * item.slSP, 0) + 10000;
            setTotalPrice(calculatedTotalPrice);
        }
    }, [location.state]);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        if (!formData.name || !formData.phone || !formData.address) {
            setError('Vui lòng điền đầy đủ thông tin bắt buộc (Họ Tên, Số điện thoại, Địa chỉ).');
            setIsSubmitting(false);
            return;
        }

        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Số điện thoại không hợp lệ.');
            setIsSubmitting(false);
            return;
        }

        if (selectedItems.length === 0) {
            setError('Không có sản phẩm nào được chọn.');
            setIsSubmitting(false);
            return;
        }

        const orderData = {
            TenKhachHang: formData.name,
            DiaChi: formData.address,
            SDT: formData.phone,
            SelectedItems: selectedItems.map((item) => ({
                MaChiTietGH: item.maChiTietGH,
                SlSP: item.slSP,
            })),
        };

        try {
            const response = await createOrder(orderData);
            localStorage.removeItem('selectedCartItems');
            await fetchCart();
            toast.success(response.message || 'Đặt hàng thành công! Hóa đơn đã được gửi qua email.');
            navigate('/orders', { state: { hoaDon: response.hoaDon } });
        } catch (error) {
            setError(error.message || 'Lỗi khi đặt hàng.');
            toast.error(error.message || 'Lỗi khi đặt hàng.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Đơn Hàng</h2>
                {selectedItems.length === 0 ? (
                    <p className="text-gray-600">Không có sản phẩm nào được chọn.</p>
                ) : (
                    selectedItems.map((item, index) => <CartItem key={index} item={item} />)
                )}
                <h2 className="text-2xl font-bold mt-8 mb-4">Thông tin đặt hàng</h2>
                {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Họ Tên *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Số điện thoại *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Địa chỉ *
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full bg-orange-500 text-white py-2 rounded mt-4 hover:bg-orange-600 ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
                    </button>
                </form>
            </div>
            <div className="w-full md:w-1/3">
                <CartSummary items={selectedItems} totalPrice={totalPrice} />
            </div>
        </div>
    );
};

export default Checkout;
