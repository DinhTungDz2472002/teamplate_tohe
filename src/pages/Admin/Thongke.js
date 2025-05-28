import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ThongKe = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [salesChartData, setSalesChartData] = useState(null);
    const [orderCountChartData, setOrderCountChartData] = useState(null);
    const [totalMonthlySales, setTotalMonthlySales] = useState({});
    const [totalOrderCounts, setTotalOrderCounts] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSalesData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://localhost:7111/api/ThongKe/monthly-sales?year=${year}&month=${month}`,
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch data');
            }

            // Process datasets to separate sales and order counts
            const salesDatasets = data.datasets.map((dataset) => ({
                ...dataset,
                label: dataset.label.replace('Thống kê', 'Doanh thu'),
                data: dataset.data.map((day) => day.sales),
            }));

            const orderCountDatasets = data.datasets.map((dataset) => ({
                ...dataset,
                label: dataset.label.replace('Thống kê', 'Số đơn'),
                data: dataset.data.map((day) => day.orders),
            }));

            // Set sales chart data
            setSalesChartData({
                labels: data.labels,
                datasets: salesDatasets,
            });

            // Set order count chart data
            setOrderCountChartData({
                labels: data.labels,
                datasets: orderCountDatasets,
            });

            setTotalMonthlySales(data.totalMonthlySales);
            setTotalOrderCounts(data.totalOrderCounts);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesData();
    }, [year, month]);

    const handleYearChange = (e) => {
        setYear(parseInt(e.target.value));
    };

    const handleMonthChange = (e) => {
        setMonth(parseInt(e.target.value));
    };

    const salesChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Doanh Thu Tháng ${month}/${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Số Tiền (VND)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Ngày',
                },
            },
        },
    };

    const orderCountChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Số Đơn Hàng Tháng ${month}/${year}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Số Đơn',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Ngày',
                },
            },
        },
    };

    // Format number to Vietnamese currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };

    // Format number for order count
    const formatNumber = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    // Translate status to Vietnamese for display
    const translateStatus = (status) => {
        const statusMap = {
            'Đã Giao': 'Đã Giao',
            'Chờ Giao Hàng': 'Chờ Giao Hàng',
            'Chờ Xác Nhận': 'Chờ Xác Nhận',
            'Khách Muốn Hủy': 'Khách Muốn Hủy',
            'Đã Hủy': 'Đã Hủy',
        };
        return statusMap[status] || status;
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Thống Kê Tháng {month}/{year}
            </h2>

            <div className="mb-6 flex gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Năm</label>
                    <select
                        value={year}
                        onChange={handleYearChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tháng</label>
                    <select
                        value={month}
                        onChange={handleMonthChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                            <option key={m} value={m}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={fetchSalesData}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 self-end"
                >
                    {isLoading ? 'Đang tải...' : 'Làm mới'}
                </button>
            </div>

            {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}

            {(salesChartData || orderCountChartData) && (
                <>
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(totalMonthlySales).map(([status, total]) => (
                            <div key={status} className="p-4 bg-gray-100 rounded-md">
                                <h3 className="text-sm font-medium text-gray-700">{translateStatus(status)}</h3>
                                <p className="text-lg font-semibold text-gray-800">
                                    Doanh thu: {formatCurrency(total)}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Số đơn: {formatNumber(totalOrderCounts[status] || 0)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {salesChartData && (
                        <div className="bg-gray-50 p-4 rounded-md mb-6">
                            <Line options={salesChartOptions} data={salesChartData} />
                        </div>
                    )}

                    {orderCountChartData && (
                        <div className="bg-gray-50 p-4 rounded-md">
                            <Line options={orderCountChartOptions} data={orderCountChartData} />
                        </div>
                    )}
                </>
            )}

            {!salesChartData && !orderCountChartData && !error && !isLoading && (
                <div className="text-center text-gray-500 p-4">Không có dữ liệu. Vui lòng chọn năm và tháng.</div>
            )}

            {isLoading && (
                <div className="text-center p-4">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
        </div>
    );
};

export default ThongKe;
