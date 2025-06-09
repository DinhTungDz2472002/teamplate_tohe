// import { useEffect, useState, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { FaRegCircleUser } from 'react-icons/fa6';

// import { AuthContext } from '~/api/AuthContext';
// function HeaderAdmin() {
//     const [menuOpen, setMenuOpen] = useState(false); // << trạng thái mở/đóng
//     const { logout } = useContext(AuthContext); //

//     const handleLogout = () => {
//         logout(); // Clears token and role, navigates to /login
//     };
//     return (
//         <header className="sticky top-0 z-50 bg-white">
//             {/* <!-- lg+ --> */}
//             <div className="bg-gray-100 border-b border-gray-200">
//                 <div className="px-4 mx-auto sm:px-6 lg:px-8">
//                     <nav className="relative flex items-center justify-between h-16 lg:h-20">
//                         <div className="hidden lg:flex lg:items-center lg:space-x-10">
//                             <Link to="/ListProductAdmin" title="Home" className="text-base font-medium text-black">
//                                 Quản Lý
//                             </Link>
//                         </div>

//                         <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
//                             <div className="flex items-center space-x-2 flex-shrink-0">
//                                 <Link to="/" title="Home" className="flex items-center space-x-2">
//                                     <h1 className="text-lg font-semibold text-black whitespace-nowrap">
//                                         Tò He - Nét Văn Hóa Việt
//                                     </h1>
//                                     <img className="w-auto h-8 lg:h-10" src="/assets/images/logo.png" alt="Logo" />
//                                 </Link>
//                             </div>
//                         </div>

//                         {/* Nút mở menu */}
//                         <button
//                             type="button"
//                             onClick={() => setMenuOpen(true)}
//                             className="flex items-center justify-center ml-auto text-white bg-black rounded-full w-9 h-9 lg:hidden"
//                         >
//                             <svg
//                                 className="w-5 h-5"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                                 />
//                             </svg>
//                         </button>

//                         {/* Nút mở menu khác */}
//                         <button
//                             type="button"
//                             onClick={() => setMenuOpen(true)}
//                             className="inline-flex p-2 ml-5 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
//                         >
//                             <svg
//                                 className="w-6 h-6"
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16m-7 6h7"
//                                 />
//                             </svg>
//                         </button>

//                         <div className="hidden lg:flex lg:items-center lg:space-x-10">
//                             <Link
//                                 to="/Profile"
//                                 title="Cart"
//                                 className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full"
//                             >
//                                 <FaRegCircleUser />
//                             </Link>
//                             <Link
//                                 to="/Logout"
//                                 title="Đăng xuất"
//                                 className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                             >
//                                 Đăng Xuất
//                             </Link>
//                         </div>
//                     </nav>
//                 </div>
//             </div>

//             {/* <!-- xs to lg - Menu Mobile --> */}
//             {menuOpen && (
//                 <nav className="py-4 bg-white lg:hidden">
//                     <div className="px-4 mx-auto sm:px-6 lg:px-8">
//                         <div className="flex items-center justify-between">
//                             <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase">Menu</p>

//                             {/* Nút đóng menu */}
//                             <button
//                                 type="button"
//                                 onClick={() => setMenuOpen(false)}
//                                 className="inline-flex p-2 text-black transition-all duration-200 rounded-md focus:bg-gray-100 hover:bg-gray-100"
//                             >
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     className="w-6 h-6"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                     stroke="currentColor"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d="M6 18L18 6M6 6l12 12"
//                                     />
//                                 </svg>
//                             </button>
//                         </div>

//                         <div className="mt-6">
//                             <div className="flex flex-col space-y-2">
//                                 <Link
//                                     to="/"
//                                     title="Trang Chủ"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     Trang Chủ
//                                 </Link>
//                                 <Link
//                                     to="/Introduce"
//                                     title="Giới thiệu"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     Giới Thiệu
//                                 </Link>
//                                 <Link
//                                     to="/CheckPrice"
//                                     title="Báo Giá"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     Báo Giá
//                                 </Link>
//                                 <Link
//                                     to="/Contact"
//                                     title="Liên Hệ"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     Liên Hệ
//                                 </Link>
//                             </div>

//                             <hr className="my-4 border-gray-200" />

//                             <div className="flex flex-col space-y-2">
//                                 <Link
//                                     to="/Signup"
//                                     title="Đăng Kí"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     Đăng Kí
//                                 </Link>
//                                 <Link
//                                     to="/Login"
//                                     title="Đăng Nhập"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                     onClick={() => setMenuOpen(false)}
//                                 >
//                                     Đăng Nhập
//                                 </Link>
//                                 {/* <Link
//                                     to="/Logout"
//                                     title="Đăng xuất"
//                                     className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
//                                 >
//                                     Đăng Xuất
//                                 </Link> */}
//                                 <button onClick={handleLogout}>Logout</button>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>
//             )}
//         </header>
//     );
// }

// export default HeaderAdmin;

import { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegCircleUser } from 'react-icons/fa6';

import { AuthContext } from '~/api/AuthContext';
function HeaderAdmin() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    return (
        <header className="sticky top-0 z-50 bg-white">
            {/* Main Header */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <nav className="relative flex items-center justify-between h-16 lg:h-20">
                        {/* Left Side: Empty in Mobile View */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-10">
                            <Link to="/ListProductAdmin" title="Home" className="text-base font-medium text-black">
                                Quản Lý
                            </Link>
                        </div>

                        {/* Center: Logo */}
                        <div className="lg:absolute lg:-translate-x-1/2 lg:inset-y-5 lg:left-1/2">
                            <div className="flex items-center space-x-2 flex-shrink-0">
                                <Link to="/" title="Home" className="flex items-center space-x-2">
                                    <h1 className="text-lg font-semibold text-black whitespace-nowrap">
                                        Tò He - Nét Văn Hóa Việt
                                    </h1>
                                    <img className="w-auto h-8 lg:h-10" src="/assets/images/logo.png" alt="Logo" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Profile, Cart, Menu (Mobile) + Desktop Menu */}
                        <div className="flex items-center space-x-4 ml-auto">
                            {/* Mobile Icons: Profile, Cart, Menu */}
                            <div className="flex items-center space-x-4 lg:hidden">
                                <Link
                                    to="/Profile"
                                    title="Profile"
                                    className={`flex items-center justify-center w-9 h-9 text-white rounded-full transition-all duration-200 hover:bg-blue-600 ${
                                        location.pathname === '/Profile' ? 'bg-blue-600' : 'bg-black'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    <FaRegCircleUser className="w-5 h-5" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(true)}
                                    className="flex items-center justify-center w-9 h-9 text-black rounded-md focus:bg-gray-100 hover:bg-gray-100"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden lg:flex lg:items-center lg:space-x-10">
                                <Link
                                    to="/Profile"
                                    title="Profile"
                                    className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full"
                                >
                                    <FaRegCircleUser className="w-5 h-5" />
                                </Link>

                                <Link
                                    to="/Logout"
                                    title="Đăng xuất"
                                    className="py-2 text-base font-medium text-black transition-all duration-200 focus:text-blue-600"
                                >
                                    Đăng Xuất
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <nav className="py-4 bg-[rgba(0,0,0,0.86)]  lg:hidden overflow-auto scrollbar-none h-64">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold tracking-widest text-gray-200 uppercase">Menu</p>
                            <button
                                type="button"
                                onClick={() => setMenuOpen(false)}
                                className="inline-flex p-2 text-white rounded-md focus:bg-gray-700 hover:bg-gray-700"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="flex flex-col space-y-2">
                                <Link
                                    to="/ListProductAdmin"
                                    title="Sản Phẩm"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/ListProductAdmin'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sản Phẩm
                                </Link>
                                <Link
                                    to="/Loai"
                                    title="Loai"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/Loai' ? 'text-blue-400 font-semibold' : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Loại Sản Phẩm
                                </Link>
                                <Link
                                    to="/ChatLieu"
                                    title="ChatLieu"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/ChatLieu' ? 'text-blue-400 font-semibold' : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Chất Liệu Sản Phẩm
                                </Link>
                                <Link
                                    to="/ThongKe"
                                    title="ThongKe"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/ThongKe' ? 'text-blue-400 font-semibold' : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Thống Kê Doanh Thu
                                </Link>
                                <Link
                                    to="/ThongKeSanPham"
                                    title="ThongKeSanPham"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/ThongKeSanPham'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Thống Kê Sản Phẩm
                                </Link>
                                <Link
                                    to="/HoaDon_ChoXacNhan"
                                    title="HoaDon_ChoXacNhan"
                                    className={`py-2 text-base font-medium  transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/HoaDon_ChoXacNhan'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Đơn Hàng Chờ Xác Nhận
                                </Link>
                                <Link
                                    to="/HoaDon_ChoGiaoHang"
                                    title="HoaDon_ChoGiaoHang"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/HoaDon_ChoGiaoHang'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Đơn Hàng Chờ Giao
                                </Link>
                                <Link
                                    to="/HoaDon_DaGiao"
                                    title="HoaDon_DaGiao"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/HoaDon_DaGiao'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Đơn Đã Giao
                                </Link>
                                <Link
                                    to="/HoaDon_KhachMuonHuy"
                                    title="HoaDon_KhachMuonHuy"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/HoaDon_KhachMuonHuy'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Đơn Khách Muốn Hủy
                                </Link>
                                <Link
                                    to="/HoaDon_DaHuy"
                                    title="HoaDon_DaHuy"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/HoaDon_DaHuy'
                                            ? 'text-blue-400 font-semibold'
                                            : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Đơn Đã Hủy
                                </Link>

                                <Link
                                    to="/Logout"
                                    title="Đăng xuất"
                                    className={`py-2 text-base font-medium transition-all duration-200 hover:text-blue-400 focus:text-blue-400 ${
                                        location.pathname === '/Logout' ? 'text-blue-400 font-semibold' : 'text-white'
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Đăng Xuất
                                </Link>
                            </div>
                            <hr className="my-4 border-gray-600" />
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}

export default HeaderAdmin;
