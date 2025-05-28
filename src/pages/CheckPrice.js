import React from 'react';
import { Link } from 'react-router-dom';

// Get current date
const today = new Date();

// Create end date by adding 5 days
const endDate = new Date(today);
endDate.setDate(today.getDate() + 5);

// Format dates to DD/MM/YYYY
const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
const CheckPrice = () => {
    const tourInfo = {
        date: `Từ ngày ${formatDate(today)} - ${formatDate(endDate)}`,
        priceChild: '90.000 đ/trẻ em (Ưu đãi, thưởng thức keo, bánh tổ hành)',
        priceAdult: '150.000 đ/người lớn (Vé vào cổng, thưởng thức bánh tổ hành)',
        notes: [
            'Đi theo nhóm từ 5 người trở lên được giảm 10% giá vé.',
            'Không được phép mang theo thức ăn bên ngoài.',
            'Trẻ em dưới 5 tuổi miễn phí.',
            'Mọi thắc mắc vui lòng liên hệ ngay để được hỗ trợ.',
        ],
    };

    const pricing = [
        {
            type: '1. Báo giá cho khách đoàn (đã bao gồm VAT)',
            details: [
                { category: 'Trẻ em (được 10 tuổi)', price: '85.000 VND/pax' },
                { category: 'Người lớn', price: '125.000 VND/pax' },
                { note: 'Giá không bao gồm: Ăn uống, vé vào cổng các điểm tham quan ngoài lề' },
            ],
        },
        {
            type: '2. Khung báo giá cho khách lẻ (đã bao gồm VAT)',
            details: [
                { category: 'Trẻ em (được 10 tuổi)', price: '90.000 VND/pax' },
                { category: 'Người lớn', price: '150.000 VND/pax' },
                { note: 'Giá đã bao gồm vé vào cổng các điểm tham quan, tour du lịch 10 ngày' },
            ],
        },
        { type: '3. Lưu ý khi đặt tour', details: [{ note: 'Đặt tour trước 2 ngày để nhận ưu đãi 10%.' }] },
        { type: '4. Chính sách đặt cọc', details: [{ note: 'Đặt cọc 30% giá vé để giữ chỗ.' }] },
        {
            type: '5. Chính sách hoàn vé',
            details: [
                { note: 'Hoàn vé trước 7 ngày: 100%.' },
                { note: 'Hoàn vé sau 7 ngày: 50%.' },
                { note: 'Hoàn vé sau 3 ngày: Không hoàn.' },
            ],
        },
        { type: '6. Thông tin liên hệ', details: [{ note: 'Liên hệ ngay với chúng tôi để được tư vấn hỗ trợ.' }] },
    ];

    return (
        <div className="min-h-screen bg-white py-10 bg-gradient-to-br from-orange-100 to-blue-300 ">
            {/* Tiêu đề và thông tin tour */}
            <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center mb-4">
                    <h1 className="text-3xl font-bold text-black mr-2">CHƯƠNG TRÌNH TOUR TRẢI NGHIỆM TÒ HE</h1>
                    {/* <img src="/assets/images/logo.png" alt="TÒ HE Logo" className="h-10" /> */}
                </div>
                <p className="text-gray-700 mb-2">{tourInfo.date}</p>
                <p className="text-gray-700 mb-2">{tourInfo.priceChild}</p>
                <p className="text-gray-700 mb-4">{tourInfo.priceAdult}</p>
                <ul className="text-gray-600 list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
                    {tourInfo.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                    ))}
                </ul>
            </div>

            {/* Bảng giá */}
            <div className="container mx-auto px-4 mt-10">
                {pricing.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h2 className="text-xl font-semibold text-black mb-2">{section.type}</h2>
                        <table className="w-full bg-gray-100 border border-gray-300 rounded-lg">
                            <tbody>
                                {section.details.map((item, idx) => (
                                    <tr key={idx} className="border-b border-gray-200">
                                        <td className="p-3 text-gray-700">{item.category || item.note}</td>
                                        <td className="p-3 text-gray-700 font-medium">{item.price || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {/* Nút đặt tour */}
            <div className="container mx-auto px-4 text-center mt-10">
                <Link
                    to="/Contact"
                    className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    ĐẶT TOUR NGAY
                </Link>
            </div>
        </div>
    );
};

export default CheckPrice;
