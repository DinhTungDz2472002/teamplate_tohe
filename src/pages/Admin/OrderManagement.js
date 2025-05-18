import React from 'react';

const OrderManagement = () => {
    // // Dữ liệu mẫu (có thể thay bằng dữ liệu từ API/SQL)
    // const orders = [
    //     {
    //         id: '2308206SFX6BYD',
    //         product: {
    //             name: 'Bình hoa composite, trang trí...',
    //             variation: 'Variation: màu đỏ | kích thước...',
    //             image: 'https://via.placeholder.com/40',
    //         },
    //         total: '281,500 đ',
    //         payment: 'TK ngân hàng liên kết ShopeePay',
    //         status: 'Đã giao',
    //         shipping: 'Nhanh (G6F0GY8E)',
    //     },
    //     {
    //         id: '2308217P7137A',
    //         product: {
    //             name: '[Ánh hát+video]Bình hoa composite...',
    //             variation: 'Chiều sâu 18/05/2023 đã ghi thêm...',
    //             image: 'https://via.placeholder.com/40',
    //         },
    //         total: '290,400 đ',
    //         payment: 'TK ngân hàng liên kết',
    //         status: 'Đã giao',
    //         shipping: 'Nhanh (Mila)',
    //     },
    // ];

    // // Hàm xử lý hành động
    // const handleAction = (action, orderId) => {
    //     if (action === 'Xem chi tiết') {
    //         alert(`Xem chi tiết đơn hàng ${orderId}`);
    //         // Thêm logic để mở popup hoặc trang chi tiết ở đây
    //     } else if (action === 'Chấp nhận') {
    //         alert(`Chấp nhận đơn hàng ${orderId}`);
    //         // Thêm logic gọi API để cập nhật trạng thái
    //     }
    // };

    // return (
    //     <div className="container mx-auto p-4">
    //         <h2 className="text-2xl font-bold mb-4">7 Đơn hàng</h2>
    //         <div className="bg-white shadow-md rounded-lg overflow-hidden">
    //             <div className="overflow-x-auto">
    //                 <table className="min-w-full divide-y divide-gray-200">
    //                     <thead className="bg-gray-50">
    //                         <tr>
    //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                                 Sản phẩm
    //                             </th>
    //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                                 Tổng Đơn Hàng
    //                             </th>
    //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                                 Trạng Thái
    //                             </th>
    //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                                 Đơn Vị Giao
    //                             </th>
    //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                                 Mã Đơn Hàng
    //                             </th>
    //                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //                                 Thao Tác
    //                             </th>
    //                         </tr>
    //                     </thead>
    //                     <tbody className="bg-white divide-y divide-gray-200">
    //                         {orders.map((order) => (
    //                             <tr key={order.id}>
    //                                 <td className="px-6 py-4 whitespace-nowrap">
    //                                     <div className="flex items-center">
    //                                         <div className="h-10 w-10 flex-shrink-0">
    //                                             <img
    //                                                 className="h-10 w-10 rounded"
    //                                                 src={order.product.image}
    //                                                 alt="Sản phẩm"
    //                                             />
    //                                         </div>
    //                                         <div className="ml-4">
    //                                             <div className="text-sm font-medium text-gray-900">
    //                                                 {order.product.name}
    //                                             </div>
    //                                             <div className="text-sm text-gray-500">{order.product.variation}</div>
    //                                         </div>
    //                                     </div>
    //                                 </td>
    //                                 <td className="px-6 py-4 whitespace-nowrap">
    //                                     <div className="text-sm text-gray-900">{order.total}</div>
    //                                     <div className="text-sm text-gray-500">{order.payment}</div>
    //                                 </td>
    //                                 <td className="px-6 py-4 whitespace-nowrap">
    //                                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
    //                                         {order.status}
    //                                     </span>
    //                                 </td>
    //                                 <td className="px-6 py-4 whitespace-nowrap">
    //                                     <div className="text-sm text-gray-900">{order.shipping.split(' (')[0]}</div>
    //                                     <div className="text-sm text-gray-500">
    //                                         {order.shipping.split(' (')[1].replace(')', '')}
    //                                     </div>
    //                                 </td>
    //                                 <td className="px-6 py-4 whitespace-nowrap">
    //                                     <div className="text-sm text-gray-900">Mã đơn hàng {order.id}</div>
    //                                 </td>
    //                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    //                                     <button
    //                                         className="text-indigo-600 hover:text-indigo-900 mr-2"
    //                                         onClick={() => handleAction('Chấp nhận', order.id)}
    //                                     >
    //                                         Chấp nhận
    //                                     </button>
    //                                     <button
    //                                         className="text-indigo-600 hover:text-indigo-900"
    //                                         onClick={() => handleAction('Xem chi tiết', order.id)}
    //                                     >
    //                                         Xem chi tiết
    //                                     </button>
    //                                 </td>
    //                             </tr>
    //                         ))}
    //                     </tbody>
    //                 </table>
    //             </div>
    //         </div>
    //         <div className="mt-4 flex justify-end">
    //             <nav className="relative z-0 inline-flex shadow-sm">
    //                 <a
    //                     href="#"
    //                     className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    //                 >
    //                     <span>Trước</span>
    //                 </a>
    //                 <a
    //                     href="#"
    //                     className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
    //                 >
    //                     <span>1</span>
    //                 </a>
    //                 <a
    //                     href="#"
    //                     className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
    //                 >
    //                     <span>Sau</span>
    //                 </a>
    //             </nav>
    //         </div>
    //     </div>
    // );
    return 1;
};

export default OrderManagement;
