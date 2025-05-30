import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-100 py-10 bg-gradient-to-br from-orange-100 to-blue-300">
            {/* Tiêu đề và thông tin liên hệ */}
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">LIÊN HỆ VỚI NGHỆ NHÂN</h1>
                <div className="text-gray-700 space-y-2">
                    <p>📞 0969446119 - 0916531332</p>
                    <p>🏠 127 Nguyễn Huệ, Thành Xuân La, Xã Phượng Dực, Huyện Phú Xuyên, TP. Hà Nội</p>
                    <p>📧 Email: tungzz2472002@gmail.com</p>
                </div>
            </div>

            {/* Form và ảnh */}
            <div className="container mx-auto px-4 mt-10 flex flex-col lg:flex-row gap-8">
                {/* Form đặt lịch */}
                <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">ĐIỀN THÔNG TIN ĐẶT VÉ / BOOK NOW</h2>
                    <p className="text-gray-600 mb-6">Điền đầy đủ thông tin để đặt vé nhanh chóng</p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Họ và tên *</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Số điện thoại *</label>
                            <input
                                type="tel"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Ngày giờ *</label>
                            <input
                                type="datetime-local"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Số lượng vé *</label>
                            <input
                                type="number"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập số lượng vé"
                                min="1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Ghi chú</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                placeholder="Nhập ghi chú"
                                rows="3"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200"
                        >
                            GỬI NGAY
                        </button>
                    </form>
                </div>

                {/* Hình ảnh */}
                <div className="w-full lg:w-1/2 flex flex-col items-center">
                    <img
                        src="https://thuthuatnhanh.com/wp-content/uploads/2023/01/hinh-thap-rua-o-ha-noi.jpg"
                        alt="Tháp rùa hồ gươm"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                    <div className="mt-4 text-center">
                        <p className="text-xl font-semibold text-red-600">Tò He - Nét Văn Hóa Việt</p>
                        <p className="text-gray-500 italic">Hãy đến trải nghiệm</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
