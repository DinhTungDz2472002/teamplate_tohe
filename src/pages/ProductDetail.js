import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const { productId } = useParams();
    const product = {
        id: productId,
        name: 'Lightweight Jacket',
        price: '$58.79',
        description:
            'Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat onare feugiat.',
        images: ['logo.png', 'logo.png', 'https://example.com/jacket-back.jpg', 'https://example.com/jacket-flat.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Gray'],
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Product Images */}
                <div className="w-full md:w-1/2">
                    <div className="relative">
                        <img
                            src={`/assets/images/${product.images[0]}`}
                            alt={product.name}
                            className="w-full h-auto rounded-lg"
                        />
                        <button className="absolute top-2 right-2 bg-white rounded-full p-1">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={`/assets/images/${product.images[index + 1]}`}
                                alt={`${product.name} ${index + 1}`}
                                className="w-16 h-16 object-cover rounded-md cursor-pointer"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2">
                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.price}</p>
                    <p className="text-gray-500 mb-6">{product.description}</p>

                    {/* Size Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Size</label>
                        <select className="mt-1 block w-full p-2 border rounded-md">
                            <option>Choose an option</option>
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Color Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Color</label>
                        <select className="mt-1 block w-full p-2 border rounded-md">
                            <option>Choose an option</option>
                            {product.colors.map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center mb-4">
                        <label className="mr-4">Quantity</label>
                        <div className="flex items-center border rounded-md">
                            <button className="px-3 py-1">-</button>
                            <span className="px-4">1</span>
                            <button className="px-3 py-1">+</button>
                        </div>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700">
                        ADD TO CART
                    </button>

                    {/* Social Sharing */}
                    <div className="flex gap-2 mt-4">
                        <a href="#" className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.9H7.98v-2.9H10V9.75c0-2.57 1.53-3.98 3.87-3.98 1.12 0 2.3.2 2.3.2v2.53h-1.3c-1.28 0-1.68.8-1.68 1.62v1.93h2.85l-.45 2.9h-2.4v6.9c4.56-.93 8-4.96 8-9.8 0-5.52-4.48-10-10-10z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16.06 4c-2.57 0-4.65 2.08-4.65 4.65 0 .36.04.72.12 1.06-3.87-.19-7.3-2.05-9.6-4.87-.4.69-.63 1.49-.63 2.34 0 1.61.82 3.04 2.05 3.88-.76-.03-1.47-.23-2.09-.57v.06c0 2.25 1.6 4.13 3.73 4.56-.39.11-.8.16-1.22.16-.3 0-.59-.03-.88-.08.6 1.86 2.33 3.21 4.39 3.25-1.61 1.26-3.64 2.01-5.84 2.01-.38 0-.75-.02-1.12-.07 2.08 1.33 4.55 2.11 7.21 2.11 8.65 0 13.38-7.16 13.38-13.38 0-.26 0-.52-.02-.77.92-.66 1.72-1.49 2.35-2.43z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
