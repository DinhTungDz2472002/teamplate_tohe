import Home from '~/pages/Home';
import Contact from '~/pages/Contact';
import Introduce from '~/pages/Introduce';
import CheckPrice from '~/pages/CheckPrice';
import Signup from '~/pages/Signup';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Sidebar from '~/pages/Sidebar';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/Contact', component: Contact },
    { path: '/Introduce', component: Introduce },
    { path: '/CheckPrice', component: CheckPrice },
    { path: '/Login', component: Login },
    { path: '/Signup', component: Signup },
    { path: '/Cart', component: Cart },
    { path: '/Sidebar', component: Sidebar },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
