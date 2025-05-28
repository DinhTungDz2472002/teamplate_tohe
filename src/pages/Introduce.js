// import React, { useState } from 'react';

// const Introduce = () => {
//     // Mảng ảnh mẫu (có thể thay bằng API)
//     const images = ['/assets/images/introduce1.png', '/assets/images/introduce.jpg', '/assets/images/introduce2.jpg'];

//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Chuyển ảnh trước
//     const prevSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//     };

//     // Chuyển ảnh tiếp theo
//     const nextSlide = () => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     };

//     // Chuyển đến ảnh cụ thể khi nhấp chấm
//     const goToSlide = (index) => {
//         setCurrentIndex(index);
//     };

//     return (
//         <div className="relative w-full max-w-3xl mx-auto mt-10 mb-10">
//             {/* Ảnh slider */}
//             <div className="overflow-hidden rounded-lg">
//                 <div
//                     className="flex transition-transform duration-500 ease-in-out"
//                     style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//                 >
//                     {images.map((image, index) => (
//                         <img
//                             key={index}
//                             src={image}
//                             alt={`Sản phẩm ${index + 1}`}
//                             className="w-full h-96 object-cover flex-shrink-0"
//                             loading="lazy"
//                         />
//                     ))}
//                 </div>
//             </div>

//             {/* Nút điều hướng */}
//             <button
//                 onClick={prevSlide}
//                 className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//             >
//                 ❮
//             </button>
//             <button
//                 onClick={nextSlide}
//                 className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
//             >
//                 ❯
//             </button>

//             {/* Chấm chỉ báo */}
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {images.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => goToSlide(index)}
//                         className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
//                     ></button>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Introduce;

import React, { useState } from 'react';

const Introduce = () => {
    // Sample image array for the slider (replace with actual tò he images)
    const images = [, '/assets/images/introduce.jpg', '/assets/images/introduce1.png'];

    // Article placeholders (replace URLs with actual links)
    const articles = [
        {
            images: '/assets/images/slide1.png',
            title: 'Lịch Sử Tò He Qua Các Thế Kỷ',
            url: 'https://vietnamdaysabroad.mofa.gov.vn/tin-tuc/nhieu-trai-nghiem-hap-dan-trong-ngay-viet-nam-tai-a-rap-xe-ut-2024?fbclid=IwY2xjawKiaGRleHRuA2FlbQIxMABicmlkETFUMzFaM0tOcHpqdUk2bEx2AR6JhNlneLMjDkq4RcLSyElX1QvDV6hWSapF9LsNHefxXD__gyn-bVeHFGn4dA_aem_XoyCDY_vhmzzKOctkkRz4w',
        },
        {
            images: '/assets/images/logo.png',
            title: 'Nghệ Thuật Làm Tò He Truyền Thống',
            url: '#PLACEHOLDER_ARTICLE_2#',
        },
        { images: '/assets/images/slide3.jpg', title: 'Tò He Trong Văn Hóa Việt Nam', url: '#PLACEHOLDER_ARTICLE_3#' },
        { images: '/assets/images/slide1.png', title: 'Cách Làm Tò He Tại Nhà', url: '#PLACEHOLDER_ARTICLE_4#' },
        { images: '/assets/images/slide2.jpg', title: 'Tò He Trong Lễ Hội Dân Gian', url: '#PLACEHOLDER_ARTICLE_5#' },
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
            <div className="w-full max-w-4xl mx-auto p-6 my-10 bg-white shadow-2xl rounded-xl text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 font-sans">Giới Thiệu Về Tò He</h1>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                    Tò he là một loại hình nghệ thuật dân gian truyền thống của Việt Nam, nơi các nghệ nhân tạo ra những
                    bức tượng nhỏ đầy màu sắc từ bột gạo nếp. Những món đồ chơi này thường có hình dạng động vật, nhân
                    vật thần thoại hoặc biểu tượng văn hóa, được nhuộm bằng màu tự nhiên từ nghệ, dành dành, và gấc. Có
                    nguồn gốc từ các làng quê Việt Nam, tò he là biểu tượng của các lễ hội văn hóa, thu hút mọi lứa tuổi
                    bởi thiết kế sống động và sự khéo léo của nghệ nhân. Dù cạnh tranh với đồ chơi hiện đại, tò he vẫn
                    giữ được giá trị văn hóa, được giới thiệu rộng rãi trên thế giới.
                </p>
            </div>

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
