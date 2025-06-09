import { useState } from 'react';

/**
 * PaymentButton component
 * - Renders a VNPay payment button
 * - Calls the backend /payment/create-payment endpoint
 * - Opens VNPay URL in new tab and echoes it on screen
 */
const PaymentButton = () => {
    const [payUrl, setPayUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token'); // JWT nếu có

            const res = await fetch(`https://localhost:7111/api/payment/create-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (!res.ok) throw new Error(`Lỗi mạng: ${res.status}`);

            const data = await res.json();

            if (data.code === '00' && data.data) {
                setPayUrl(data.data);
                // Mở tab mới tới trang thanh toán
                window.open(data.data, '_blank');
            } else {
                throw new Error(data.message || 'Không xác định lỗi');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                onClick={handlePayment}
                disabled={loading}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow disabled:opacity-50 transition"
            >
                {loading ? 'Đang tạo thanh toán...' : 'Thanh toán VNPAY'}
            </button>

            {payUrl && (
                <div className="w-full max-w-xl break-all bg-gray-100 p-4 rounded-lg">
                    <p className="font-medium mb-2">URL thanh toán:</p>
                    <a
                        href={payUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {payUrl}
                    </a>
                </div>
            )}

            {error && <div className="w-full max-w-xl bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}
        </div>
    );
};

export default PaymentButton;
