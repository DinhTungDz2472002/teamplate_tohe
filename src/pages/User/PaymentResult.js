import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';

const PaymentResult = () => {
    const location = useLocation();
    const query = qs.parse(location.search); // Lấy query string từ URL

    return (
        // <div className="container mt-5">
        //     <h2>Thanh toán {query.vnp_TransactionStatus === '00' ? 'Thành công' : 'Thất bại'}</h2>
        //     <p>
        //         <strong>Số tiền:</strong> {(Number(query.vnp_Amount) / 100).toLocaleString()} VND
        //     </p>
        //     <p>
        //         <strong>Mã giao dịch:</strong> {query.vnp_TransactionNo}
        //     </p>
        //     <p>
        //         <strong>Ngân hàng:</strong> {query.vnp_BankCode}
        //     </p>
        //     <p>
        //         <strong>Thông tin:</strong> {query.vnp_OrderInfo}
        //     </p>
        //     <p>
        //         <strong>Thời gian thanh toán:</strong> {formatDate(query.vnp_PayDate)}
        //     </p>
        //     <p>
        //         <strong>Trạng thái:</strong> {query.vnp_TransactionStatus === '00' ? 'Thành công' : 'Thất bại'}
        //     </p>
        // </div>
        <div className="container mx-auto mt-10 max-w-2xl p-6 bg-white rounded-lg shadow-xl">
            <div className="text-center mb-6">
                <h2
                    className={`text-2xl font-bold ${
                        query.vnp_TransactionStatus === '00' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    Thanh toán {query.vnp_TransactionStatus === '00' ? 'Thành công' : 'Thất bại'}
                </h2>
                <div
                    className={`mt-2 inline-flex items-center justify-center w-12 h-12 rounded-full ${
                        query.vnp_TransactionStatus === '00' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                >
                    {query.vnp_TransactionStatus === '00' ? (
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-700">Số tiền:</span>
                    <span className="text-gray-900">{(Number(query.vnp_Amount) / 100).toLocaleString()} VND</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-700">Mã giao dịch:</span>
                    <span className="text-gray-900">{query.vnp_TransactionNo}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-700">Ngân hàng:</span>
                    <span className="text-gray-900">{query.vnp_BankCode}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-700">Thông tin:</span>
                    <span className="text-gray-900">{query.vnp_OrderInfo}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-700">Thời gian thanh toán:</span>
                    <span className="text-gray-900">{formatDate(query.vnp_PayDate)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                    <span className="font-semibold text-gray-700">Trạng thái:</span>
                    <span
                        className={`font-medium ${
                            query.vnp_TransactionStatus === '00' ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {query.vnp_TransactionStatus === '00' ? 'Thành công' : 'Thất bại'}
                    </span>
                </div>
            </div>
            <div className="mt-6 text-center">
                <a
                    href="/OrderChoxacnhan"
                    className="inline-block px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Danh Sách Đơn Đặt
                </a>
            </div>
        </div>
    );
};

// Format thời gian VNPAY trả về
function formatDate(dateStr) {
    if (!dateStr) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const min = dateStr.substring(10, 12);
    const sec = dateStr.substring(12, 14);
    return `${day}/${month}/${year} ${hour}:${min}:${sec}`;
}

export default PaymentResult;
