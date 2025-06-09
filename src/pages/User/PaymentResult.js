import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentResult = () => {
    const location = useLocation();
    const [result, setResult] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const vnpParams = {};
        query.forEach((value, key) => {
            vnpParams[key] = value;
        });

        axios
            .get('http://localhost:7111/api/payment/vnpay-return', { params: vnpParams })
            .then((response) => setResult(response.data))
            .catch((error) => console.error('Error fetching payment result:', error));
    }, [location]);

    if (!result) return <div>Loading...</div>;

    return (
        <div>
            <h2>Payment Result</h2>
            <p>Status: {result.Status}</p>
            <p>Message: {result.Message}</p>
            {result.Data && (
                <div>
                    <p>Transaction ID: {result.Data.vnp_TransactionNo}</p>
                    <p>Amount: {result.Data.vnp_Amount / 100} VND</p>
                    <p>Order Info: {result.Data.vnp_OrderInfo}</p>
                </div>
            )}
        </div>
    );
};

export default PaymentResult;
