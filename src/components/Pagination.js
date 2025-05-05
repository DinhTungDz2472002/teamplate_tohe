// Pagination.js
import React from 'react';

const Pagination = ({ pageNumber, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <ul className="flex justify-center gap-1 text-gray-900">
            {/* Trang trước */}
            <li>
                <a
                    href="#"
                    className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber - 1);
                    }}
                    disabled={pageNumber === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </li>

            {/* Các trang số */}
            {[...Array(totalPages)].map((_, i) => (
                <li key={i + 1}>
                    <a
                        href="#"
                        className={`block size-8 rounded border border-gray-200 text-center text-sm/8 font-medium transition-colors hover:bg-gray-50 ${
                            pageNumber === i + 1 ? 'bg-indigo-600 text-white' : ''
                        }`}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(i + 1);
                        }}
                    >
                        {i + 1}
                    </a>
                </li>
            ))}

            {/* Trang sau */}
            <li>
                <a
                    href="#"
                    className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNumber + 1);
                    }}
                    disabled={pageNumber === totalPages}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
