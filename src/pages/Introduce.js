import React, { useState } from 'react';

const Introduce = () => {
    // Sample image array for the slider (replace with actual tò he images)
    const images = [, '/assets/images/introduce.jpg', '/assets/images/introduce1.png'];

    // Article placeholders (replace URLs with actual links)
    const articles = [
        {
            images: '/assets/images/ả rập xê út.jpg',
            title: 'Ngày Việt Nam Tại Ả Rập Xê Út',
            url: 'https://vietnamdaysabroad.mofa.gov.vn/tin-tuc/nhieu-trai-nghiem-hap-dan-trong-ngay-viet-nam-tai-a-rap-xe-ut-2024?fbclid=IwY2xjawKiaGRleHRuA2FlbQIxMABicmlkETFUMzFaM0tOcHpqdUk2bEx2AR6JhNlneLMjDkq4RcLSyElX1QvDV6hWSapF9LsNHefxXD__gyn-bVeHFGn4dA_aem_XoyCDY_vhmzzKOctkkRz4w',
        },
        {
            images: '/assets/images/DSC_2108.jpg',
            title: 'Ngày Việt Nam tại Brazil',
            url: 'https://baochinhphu.vn/an-tuong-khong-gian-van-hoa-viet-trong-ngay-viet-nam-tai-brazil-102241118104609747.htm',
        },
        {
            images: '/assets/images/IMG_0054.jpg',
            title: 'Ngày Việt Nam tại Nam Phi',
            url: 'https://dantri.com.vn/van-hoa/cong-chung-nam-phi-thich-thu-mac-co-phuc-trieu-nguyen-in-tranh-nan-to-he-20230916094156031.htm',
        },
        {
            images: '/assets/images/slide1.png',
            title: 'Ngày Việt Nam tại Nhật Bản',
            url: 'https://nhandan.vn/ngay-viet-nam-tai-nhat-ban-2023-ton-vinh-tinh-huu-nghi-va-van-hoa-viet-nam-post785552.html',
        },
        {
            images: '/assets/images/z5011895044434_c10cc6be49172228402c8b0d659d3ee5.jpg',
            title: 'Ngày Việt Nam tại Pháp',
            url: 'https://vietnamdaysabroad.mofa.gov.vn/ngay-viet-nam-o-phap',
        },

        {
            images: '/assets/images/IMG_1187.jpg',
            title: 'Ngày Việt Nam tại Ấn Độ',
            url: 'https://vietnamdaysabroad.mofa.gov.vn/ngay-viet-nam-o-an-do',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Go to specific slide
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center">
            {/* Slider Section */}
            <div className="relative w-full max-w-7xl h-[50vh] sm:h-[60vh] lg:h-[100vh] overflow-hidden px-4 sm:px-6">
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Tò He ${index + 1}`}
                            className="w-full h-full object-cover flex-shrink-0 rounded-lg"
                            loading="lazy"
                        />
                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 hover:scale-110 transition-all duration-300 z-10"
                >
                    ❮
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 hover:scale-110 transition-all duration-300 z-10"
                >
                    ❯
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                currentIndex === index ? 'bg-blue-500 scale-125' : 'bg-gray-300'
                            }`}
                        ></button>
                    ))}
                </div>
            </div>

            {/* Introduction Section */}
            <section className="w-full max-w-5xl mx-auto px-6 py-12 my-10 bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 font-sans mb-6">
                    Tò He - Hồn Dân Tộc Việt
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                    Tò he là biểu tượng của nghệ thuật dân gian Việt Nam, được nặn từ bột gạo nếp với hình thù ngộ
                    nghĩnh như con vật, hoa lá, nhân vật cổ tích, hay các nhân vật hoạt hình hiện đại. Không chỉ là món
                    đồ chơi, tò he còn là một tác phẩm nghệ thuật sống động, mang đậm bản sắc văn hóa Việt.
                </p>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {/* Nguồn gốc */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Nguồn Gốc</h2>
                        <p className="text-gray-600">
                            Tò he ra đời từ hàng trăm năm trước tại các làng quê đồng bằng Bắc Bộ, đặc biệt là làng Xuân
                            La, huyện Phú Xuyên, Hà Nội – cái nôi của nghệ thuật nặn tò he.
                        </p>
                    </div>

                    {/* Chất liệu */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Chất Liệu</h2>
                        <ul className="text-gray-600 list-disc list-inside">
                            <li>
                                <strong>Bột gạo nếp:</strong> Nguyên liệu chính, nhào kỹ, nhuộm màu thực phẩm an toàn.
                            </li>
                            <li>
                                <strong>Màu sắc:</strong> 7 màu cơ bản - đỏ, vàng, xanh lá, xanh da trời, trắng, đen,
                                hồng.
                            </li>
                            <li>
                                <strong>Que tre:</strong> Cắm vào tò he để dễ cầm hoặc trang trí.
                            </li>
                        </ul>
                    </div>

                    {/* Kỹ thuật và hình dáng */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Kỹ Thuật & Hình Dáng</h2>
                        <p className="text-gray-600">
                            Nghệ nhân nặn tay trực tiếp, không dùng khuôn, tạo nên những hình thù sinh động như rồng,
                            phượng, chim muông, hoa quả, hay nhân vật cổ tích (Thạch Sanh, Tấm Cám) và hoạt hình
                            (Doraemon, Pikachu).
                        </p>
                    </div>

                    {/* Giá trị văn hóa */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Giá Trị Văn Hóa</h2>
                        <ul className="text-gray-600 list-disc list-inside">
                            <li>
                                <strong>Giáo dục:</strong> Truyền tải câu chuyện cổ tích, khơi gợi trí tưởng tượng và
                                tình yêu văn hóa dân tộc.
                            </li>
                            <li>
                                <strong>Trình diễn:</strong> Thu hút du khách tại lễ hội, khu vui chơi, đặc biệt là trẻ
                                em.
                            </li>
                            <li>
                                <strong>Xuất khẩu văn hóa:</strong> Đại diện văn hóa Việt trong các sự kiện giao lưu
                                quốc tế.
                            </li>
                        </ul>
                    </div>

                    {/* Tò he ngày nay */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Tò He Ngày Nay</h2>
                        <p className="text-gray-600">
                            Tò he giữ hồn truyền thống nhưng không ngừng đổi mới với mẫu mã hiện đại, kết hợp giữa dân
                            gian và đương đại. Nhiều sản phẩm được dùng làm quà lưu niệm hoặc trưng bày.
                        </p>
                    </div>
                </div>
            </section>

            {/* Article Cards Section */}
            <div className="w-full max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <img
                            src={article.images}
                            alt={`Tò He ${index + 1}`}
                            className="w-full h-48 object-cover rounded-t-lg"
                            loading="lazy"
                        />
                        <a
                            href={article.url}
                            className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <h3 className="mt-3 mb-2">{article.title}</h3>
                        </a>
                        <p className="text-gray-600 text-sm">Nhấn vào để đọc thêm về tò he.</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Introduce;
