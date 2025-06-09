import { NavLink } from 'react-router-dom';
import Home from '../Home';
import ListProductAdmin from '~/pages/Admin/ListProductAdmin';
import OrderManagement from '~/pages/Admin/OrderManagement';
import { FaHome } from 'react-icons/fa';

function Sidebar() {
    return (
        <div className="hidden md:flex md:w-64 md:flex-col">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white">
                {/* Logo Section */}
                <div className="flex items-center flex-shrink-0 px-4">
                    {/* <img
                        className="w-auto h-8"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
                        alt="Logo"
                    /> */}
                </div>

                {/* Search Bar */}
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
                            name="search"
                            id="search"
                            className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                            placeholder="Search here"
                        />
                    </div>
                </div>

                <div className="px-4 mt-6">
                    <hr className="border-gray-200" />
                </div>

                {/* Navigation Sections */}
                <div className="flex flex-col flex-1 px-3 mt-6">
                    <div className="space-y-4">
                        <nav className="flex-1 space-y-2">
                            <NavLink
                                to="/ListProductAdmin"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                <FaHome />
                                Sản Phẩm
                            </NavLink>

                            <NavLink
                                to="/Loai"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Loại Sản Phẩm
                            </NavLink>
                            <NavLink
                                to="/ChatLieu"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Chất Liệu
                            </NavLink>

                            <NavLink
                                to="/ThongKe"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Thống Kê Doanh Thu
                            </NavLink>
                            <NavLink
                                to="/ThongKeSanPham"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Thống Kê Sản Phẩm
                            </NavLink>
                        </nav>

                        <hr className="border-gray-200" />

                        <nav className="flex-1 space-y-2">
                            <NavLink
                                to="/HoaDon_ChoXacNhan"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Đơn Hàng Chờ Xác Nhận
                            </NavLink>

                            <NavLink
                                to="/HoaDon_ChoGiaoHang"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Đơn Hàng Chờ Giao
                            </NavLink>

                            <NavLink
                                to="/HoaDon_DaGiao"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Đơn Đã Giao
                            </NavLink>
                            <NavLink
                                to="/HoaDon_KhachMuonHuy"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Đơn Khách Muốn Hủy
                            </NavLink>
                            <NavLink
                                to="/HoaDon_DaHuy"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Đơn Đã Hủy
                            </NavLink>
                        </nav>

                        <hr className="border-gray-200" />

                        <nav className="flex-1 space-y-2">
                            <NavLink
                                to="/settings"
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg group ${
                                        isActive
                                            ? 'text-white bg-indigo-600'
                                            : 'text-gray-900 hover:text-white hover:bg-indigo-600'
                                    }`
                                }
                            >
                                Settings
                            </NavLink>
                        </nav>
                    </div>

                    {/* User Profile */}
                    <div className="pb-4 mt-20">
                        <button
                            type="button"
                            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
                        >
                            <img
                                className="flex-shrink-0 object-cover w-6 h-6 mr-3 rounded-full"
                                src="/assets/images/logo.png"
                                alt=""
                            />
                            Đình Tùng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
