import Sidebar from '~/pages/Admin/Sidebar';
import HeaderAdmin from './HeaderAdmin';
import { Fragment } from 'react';
function MainLayoutAdmin({ children }) {
    return (
        <Fragment>
            <HeaderAdmin />
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex flex-col flex-1">
                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto max-w-7xl sm:px-6 md:px-8">{children}</div>
                        </div>
                    </main>
                </div>
            </div>
            {/* <Footer /> */}
        </Fragment>
    );
}

export default MainLayoutAdmin;
