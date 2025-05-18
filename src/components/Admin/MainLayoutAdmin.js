import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Sidebar from '~/pages/Admin/Sidebar';
function MainLayoutAdmin({ children }) {
    return (
        <div>
            <Header />
            <Sidebar>{children}</Sidebar>
            <Footer />
        </div>
    );
}

export default MainLayoutAdmin;
