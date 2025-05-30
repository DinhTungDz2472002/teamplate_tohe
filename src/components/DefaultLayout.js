import Header from '~/components/Header';
import Footer from '~/components/Footer';
function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                {/* <Slide /> */}
                <div className="content">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
