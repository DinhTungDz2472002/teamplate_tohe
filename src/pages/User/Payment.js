import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [amount, setAmount] = useState('');

    const handlePayment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7111/api/Payment/create-payment', {
                amount: parseFloat(amount),
            });
            window.location.href = response.data.PaymentUrl;
        } catch (error) {
            console.error('Payment error:', error);
            alert('Failed to initiate payment');
        }
    };

    return (
        <div>
            <h2>VNPay Payment</h2>
            <form onSubmit={handlePayment}>
                <label>
                    Amount (VND):
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </label>
                <button type="submit">Pay with VNPay</button>
            </form>
        </div>
    );
};

export default PaymentForm;
