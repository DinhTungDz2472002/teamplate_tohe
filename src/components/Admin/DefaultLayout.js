import React from 'react';

const Sidebar = () => {
    return (
        <div className="flex flex-1 bg-gray-50">
            <div className="hidden md:flex md:w-64 md:flex-col">
                <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0 px-4">
                        <img
                            className="w-auto h-8"
                            src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
                            alt="Logo"
                        />
                    </div>

                    {/* Search Box */}
                    <div className="px-4 mt-8">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                                placeholder="Search here"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="px-4 mt-6">
                        <hr className="border-gray-200" />
                    </div>

                    {/* Menu */}
                    <div className="flex flex-col flex-1 px-3 mt-6 space-y-4">
                        <nav className="flex-1 space-y-2">
                            {/* Menu Item Example */}
                            <MenuItem active iconPath="M3 12l2-2m0 0l7-7 7 7M5 10v10..." label="Dashboard" />
                            <MenuItem iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2..." label="Tickets" />
                            <MenuItem iconPath="M16 7a4 4 0 11-8 0 4 4..." label="Agents" />
                            <MenuItem iconPath="M12 4.354a4 4 0 110 5.292..." label="Customers" hasDropdown />
                        </nav>

                        <hr className="border-gray-200" />

                        <nav className="flex-1 space-y-2">
                            <MenuItem iconPath="M3 7v10a2 2 0 002 2h14..." label="Products" />
                            <MenuItem iconPath="M15 17h5l-1.405-1.405..." label="Orders" />
                            <MenuItem iconPath="M9 19v-6a2 2 0 00-2-2..." label="Analytics" hasDropdown />
                        </nav>

                        <hr className="border-gray-200" />

                        {/* Other sections if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MenuItem = ({ active, iconPath, label, hasDropdown }) => {
    return (
        <a
            href="#"
            className={`flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group 
            ${active ? 'bg-indigo-600 text-white' : 'text-gray-900 hover:bg-indigo-600 hover:text-white'}`}
        >
            <svg
                className="flex-shrink-0 w-5 h-5 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
            </svg>
            {label}
            {hasDropdown && (
                <svg
                    className="w-4 h-6 ml-auto text-gray-400 group-hover:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            )}
        </a>
    );
};

export default Sidebar;
