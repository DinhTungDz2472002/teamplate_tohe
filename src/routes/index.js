import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Introduce from '~/pages/Introduce';
import CheckPrice from '~/pages/CheckPrice';
import Signup from '~/pages/Signup';
import Login from '~/pages/Login';
import Product from '~/components/Product';
import ListProducts from '~/pages/LitsProducts';
import ListProductAdmin from '~/pages/Admin/ListProductAdmin';
import check from '~/pages/check';
import Logout from '~/components/Logout';
import OrderManagement from '~/pages/Admin/OrderManagement';
import Cart from '~/pages/User/Cart';
import test from '~/pages/Admin/test';

import Checkout from '~/pages/User/Checkout';
import AddProduct from '~/pages/Admin/AddProduct';
import Order from '~/pages/User/Order';
import HoaDonChoGiaoHang from '~/pages/Admin/HoaDonChoGiaoHang';
import HoaDonChoXacNhan from '~/pages/Admin/HoaDonChoXacNhan';
import HoaDonDaGiao from '~/pages/Admin/HoaDonDaGiao';
import HoaDonKhachMuonHuy from '~/pages/Admin/HoaDonKhachMuonHuy';
import HoaDonDaHuy from '~/pages/Admin/HoaDonDaHuy';
import ForgotPassword from '~/pages/ForgotPassword';
import ResetPassword from '~/pages/ResetPassword';
import MainLayoutUser from '~/components/User/MainLayoutUser';
import Profile from '~/pages/Profile';
import ProductDetail from '~/pages/ProductDetail';
import Loai from '~/pages/Admin/Loai';
import ChatLieu from '~/pages/Admin/Chatlieu';
import ThongKe from '~/pages/Admin/Thongke';
import OrderChoXacNhan from '~/pages/User/OrderChoXacNhan';
import OrderChoGiaoHang from '~/pages/User/OrderChoGiaoHang';
import OrderDaGiao from '~/pages/User/OrderDaGiao';
import OrderDaHuy from '~/pages/User/OrderDaHuy';
import OrderKhachMuonHuy from '~/pages/User/OrderKhachMuonHuy';
import ThongKeSanPham from '~/pages/Admin/ThongKeSanPham';
import PaymentForm from '~/pages/User/Payment';
import PaymentResult from '~/pages/User/PaymentResult';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Contact', component: Contact },
    { path: '/Introduce', component: Introduce },
    { path: '/CheckPrice', component: CheckPrice },
    { path: '/Login', component: Login },
    { path: '/Signup', component: Signup },
    { path: '/Cart', component: Cart },
    { path: '/Checkout', component: Checkout },
    { path: '/Checkout', component: Checkout },

    { path: '/ProductDetail', component: ProductDetail },
    { path: '/ListProducts', component: ListProducts },
    { path: '/check', component: check },
    { path: '/logout', component: Logout },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/reset-password', component: ResetPassword },
    { path: '/Profile', component: Profile },

    { path: '/orders', component: Order, Layout: MainLayoutUser },

    // List Order
    { path: '/OrderChoxacnhan', component: OrderChoXacNhan, Layout: MainLayoutUser },
    { path: '/OrderChogiaohang', component: OrderChoGiaoHang, Layout: MainLayoutUser },
    { path: '/OrderDagiao', component: OrderDaGiao, Layout: MainLayoutUser },
    { path: '/OrderDahuy', component: OrderDaHuy, Layout: MainLayoutUser },
    { path: '/OrderKhachmuonhuy', component: OrderKhachMuonHuy, Layout: MainLayoutUser },

    //Payment
    { path: '/payment', component: PaymentForm, Layout: MainLayoutUser },
    { path: '/paymentResult', component: PaymentResult, Layout: MainLayoutUser },
];

const privateRoutes = [
    { path: '/ListProductAdmin', component: ListProductAdmin },
    { path: '/OrderManagement', component: OrderManagement },
    { path: '/AddProduct', component: AddProduct },
    { path: '/test', component: test },
    { path: '/HoaDon_ChoXacNhan', component: HoaDonChoXacNhan },
    { path: '/HoaDon_ChoGiaoHang', component: HoaDonChoGiaoHang },
    { path: '/HoaDon_DaGiao', component: HoaDonDaGiao },
    { path: '/HoaDon_KhachMuonHuy', component: HoaDonKhachMuonHuy },
    { path: '/HoaDon_DaHuy', component: HoaDonDaHuy },
    { path: '/Loai', component: Loai },
    { path: '/ChatLieu', component: ChatLieu },
    { path: '/ThongKe', component: ThongKe },
    { path: '/ThongKeSanPham', component: ThongKeSanPham },

    //    { path: '/ListProductAdmin', component: ListProductAdmin, layout: Sidebar }, // "Dashboard" ánh xạ đến ListProductAdmin
];

export { publicRoutes, privateRoutes };
