import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Introduce from '~/pages/Introduce';
import CheckPrice from '~/pages/CheckPrice';
import Signup from '~/pages/Signup';
import Login from '~/pages/Login';
import Sidebar from '~/pages/Admin/Sidebar';
import Product from '~/components/Product';
import ListProducts from '~/pages/LitsProducts';
import ListProductAdmin from '~/pages/Admin/ListProductAdmin';
import check from '~/pages/check';
import Logout from '~/components/Logout';
import OrderManagement from '~/pages/Admin/OrderManagement';
import Cart from '~/pages/User/Cart';
import Checkout from '~/pages/User/Checkout';
import MainLayoutAdmin from '~/components/Admin/MainLayoutAdmin';
import { Navigate } from 'react-router-dom';
import AddProduct from '~/pages/Admin/AddProduct';
import test from '~/pages/Admin/test';
import Order from '~/pages/User/Order';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Contact', component: Contact },
    { path: '/Introduce', component: Introduce },
    { path: '/CheckPrice', component: CheckPrice },
    { path: '/Login', component: Login },
    { path: '/Signup', component: Signup },
    { path: '/Cart', component: Cart },
    { path: '/Checkout', component: Checkout },
    // { path: '/Sidebar', component: Sidebar },
    { path: '/Product', component: Product },
    { path: '/ListProducts', component: ListProducts },
    { path: '/check', component: check },
    { path: '/logout', component: Logout },

    { path: '/orders', component: Order },

    //layout chuyển admin
    { path: '/Sidebar', component: () => <Navigate to="/ListProductAdmin" /> },
];

const privateRoutes = [
    { path: '/ListProductAdmin', component: ListProductAdmin },

    { path: '/OrderManagement', component: OrderManagement },
    { path: '/AddProduct', component: AddProduct },
    { path: '/test', component: test },

    //    { path: '/ListProductAdmin', component: ListProductAdmin, layout: Sidebar }, // "Dashboard" ánh xạ đến ListProductAdmin
    //     { path: '/admin/orders', component: OrderManagement, layout: Sidebar },
    //     { path: '/admin/agents', component: Agents, layout: Sidebar },
    //     { path: '/admin/customers', component: Customers, layout: Sidebar },
    //     { path: '/admin/products', component: Products, layout: Sidebar },
    //     { path: '/admin/analytics', component: Analytics, layout: Sidebar },
    //     { path: '/admin/settings', component: Settings, layout: Sidebar },
];

export { publicRoutes, privateRoutes };
