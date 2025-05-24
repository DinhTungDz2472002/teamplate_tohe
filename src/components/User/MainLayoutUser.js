import { Fragment } from 'react';
import HeaderUser from './HeaderUser';
function MainLayoutUser({ children }) {
    return (
        <Fragment>
            <HeaderUser />
            <div className="container">
                {/* <Slide /> */}
                <div className="content">{children}</div>
            </div>
            {/* <Footer /> */}
        </Fragment>
    );
}

export default MainLayoutUser;
