import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Introduce from '~/pages/Introduce';
import CheckPrice from '~/pages/CheckPrice';
import Signup from '~/pages/Signup';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Sidebar from '~/pages/Sidebar';
import Product from '~/components/Product';
import ListProducts from '~/pages/LitsProducts';
import ListProductAdmin from '~/pages/Admin/ListProductAdmin';
import Checkout from '~/pages/Checkout';
import check from '~/pages/check';
import Logout from '~/components/Logout';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Contact', component: Contact },
    { path: '/Introduce', component: Introduce },
    { path: '/CheckPrice', component: CheckPrice },
    { path: '/Login', component: Login },
    { path: '/Signup', component: Signup },
    { path: '/Cart', component: Cart },
    { path: '/Checkout', component: Checkout },
    { path: '/Sidebar', component: Sidebar },
    { path: '/Product', component: Product },
    { path: '/ListProducts', component: ListProducts },
    { path: '/ListProductAdmin', component: ListProductAdmin },
    { path: '/check', component: check },
    { path: '/logout', component: Logout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
