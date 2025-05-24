import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import DefaultLayout from '~/components/DefaultLayout';
import MainLayoutAdmin from './components/Admin/MainLayoutAdmin';
import './App.css';
import MainLayoutUser from './components/User/MainLayoutUser';
import { jwtDecode } from 'jwt-decode';
// Hàm kiểm tra token và lấy role
// Hàm kiểm tra token và lấy role
function getUserRoleFromToken() {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Debug token value
    if (!token || typeof token !== 'string') {
        console.warn('No valid token found in localStorage');
        return null;
    }

    try {
        const decoded = jwtDecode(token); // Use jwtDecode for safer parsing
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (!role) {
            console.warn('Role not found in token');
            return null;
        }
        return role;
    } catch (e) {
        console.error('Invalid token:', e.message);
        return null;
    }
}
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const role = getUserRoleFromToken();
                        let Layout;
                        if (role === 'User') {
                            Layout = MainLayoutUser;
                        } else if (role === 'Admin') {
                            Layout = MainLayoutAdmin;
                        } else {
                            Layout = DefaultLayout;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {/* Public Routes
                    {publicRoutes.map(async (route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.path === '/MainLayoutAdmin') {
                            Layout = MainLayoutAdmin;
                        } else if (route.path === '/MainLayoutUser') {
                            Layout = MainLayoutUser;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })} */}
                </Routes>
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Layout = route.layout || MainLayoutAdmin;
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
