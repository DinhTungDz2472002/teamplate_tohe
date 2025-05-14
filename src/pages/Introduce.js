import React, { useState } from 'react';

const Introduce = () => {
    // Mảng ảnh mẫu (có thể thay bằng API)
    const images = ['/assets/images/introduce1.png', '/assets/images/introduce.jpg', '/assets/images/introduce2.jpg'];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Chuyển ảnh trước
    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Chuyển ảnh tiếp theo
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Chuyển đến ảnh cụ thể khi nhấp chấm
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto mt-10 mb-10">
            {/* Ảnh slider */}
            <div className="overflow-hidden rounded-lg">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Sản phẩm ${index + 1}`}
                            className="w-full h-96 object-cover flex-shrink-0"
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>

            {/* Nút điều hướng */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
                ❮
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
            >
                ❯
            </button>

            {/* Chấm chỉ báo */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Introduce;
