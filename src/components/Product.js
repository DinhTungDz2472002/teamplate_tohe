import { Fragment } from 'react';

function Product() {
    return (
        <div class="relative group">
            <div class="overflow-hidden aspect-w-1 aspect-h-1">
                <img
                    class="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                    src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/4/product-4.png"
                    alt=""
                />
            </div>
            {/* tên sản phẩm */}
            <div className="line-clamp-1 group-hover:line-clamp-none group-hover:whitespace-normal group-hover:overflow-visible">
                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                    <a href="#" title="" className="relative block">
                        Martino 75 Bluetooth jasjh kal ka jshshhs
                        <span className="absolute inset-0" aria-hidden="true"></span>
                    </a>
                </h3>
            </div>

            <div class="flex items-start justify-between mt-4 space-x-4">
                <div>
                    <div class="flex items-center mt-2.5 space-x-px">
                        <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            class="w-3 h-3 text-yellow-400 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            class="w-3 h-3 text-gray-300 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <svg
                            class="w-3 h-3 text-gray-300 sm:w-4 sm:h-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    </div>
                </div>

                <div class="text-right">
                    <p class="text-xs font-bold text-gray-900 sm:text-sm md:text-base">$79.00</p>
                </div>
            </div>
            {/* chi tiết */}
            <div className="mt-2 ">
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 transition-colors duration-300 group-hover:text-gray-700 group-hover:line-clamp-none group-hover:whitespace-normal group-hover:overflow-visible">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore nobis iure obcaecati pariatur.
                    Officiis qui, enim cupiditate aliquam corporis iste.
                </p>
            </div>
            {/* mua hàng */}
            <form className="mt-4 flex gap-4">
                <button className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105">
                    Add to Cart
                </button>

                <button
                    type="button"
                    className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
                >
                    Buy Now
                </button>
            </form>
        </div>
    );
}

export default Product;
