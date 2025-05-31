import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from 'react-toastify';
import { AuthProvider } from '~/api/AuthContext';
import { CartProvider } from '~/api/CartContext';
import { OrderProvider } from '~/api/OrderContext';
import { HoaDonProvider } from '~/api/HoaDonContext';
import { DsOrderProvider } from './api/DsOrderContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <OrderProvider>
                    <HoaDonProvider>
                        <DsOrderProvider>
                            <App />
                            <ToastContainer
                                position="top-right"
                                autoClose={800}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                transition={Bounce}
                            />
                        </DsOrderProvider>
                    </HoaDonProvider>
                </OrderProvider>
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
