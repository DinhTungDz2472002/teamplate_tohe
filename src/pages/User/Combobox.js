import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const reactLinks = [
    { name: 'Đơn chờ xác nhận', route: '/OrderChoxacnhan' },
    { name: 'Đơn chờ giao hàng', route: '/OrderChogiaohang' },
    { name: 'Đơn đã giao', route: '/OrderDagiao' },
    { name: 'Đơn đã hủy', route: '/OrderDahuy' },
    { name: 'Đơn muốn hoàn', route: '/OrderKhachmuonhuy' },
];

const Combobox = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [selectedLink, setSelectedLink] = useState(null);

    useEffect(() => {
        const currentLink = reactLinks.find((link) => link.route === location.pathname);
        setSelectedLink(currentLink || null);
    }, [location.pathname]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const handleSelect = (link) => {
        setSelectedLink(link);
        setIsOpen(false);
    };

    const handleKeyDown = (e, link) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleSelect(link);
        }
    };

    return (
        <div className="relative w-full max-w-[12rem] sm:max-w-[14rem]">
            <button
                onClick={toggleDropdown}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 font-medium flex items-center justify-between hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
                <span className="truncate">{selectedLink ? selectedLink.name : 'Chọn đơn'}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <ul
                    role="listbox"
                    className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-48 overflow-y-auto text-sm"
                >
                    {reactLinks.map((link, index) => (
                        <li
                            key={index}
                            role="option"
                            aria-selected={selectedLink?.route === link.route}
                            tabIndex={0}
                            onKeyDown={(e) => handleKeyDown(e, link)}
                            className="px-3 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-150 focus:bg-blue-50 focus:text-blue-600 outline-none"
                        >
                            <Link to={link.route} onClick={() => handleSelect(link)} className="block w-full h-full">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Combobox;
