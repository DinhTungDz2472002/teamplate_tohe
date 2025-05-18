const products = [
    {
        id: 1,
        name: 'Sản phẩm A',
        price: 120,
        image: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg',
        detail: 'Chi tiết sản phẩm A',
    },
    {
        id: 2,
        name: 'Sản phẩm B',
        price: 80,
        image: 'https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg',
        detail: 'Chi tiết sản phẩm B',
    },
];

export default function ListProductAdmin() {
    return (
        <div className="p-5">
            <div className="flex justify-end mb-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    Thêm sản phẩm
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Tên Sản phẩm</th>
                            <th className="py-3 px-6 text-left">Giá (VND)</th>
                            <th className="py-3 px-6 text-left">Ảnh</th>
                            <th className="py-3 px-6 text-left">Chi tiết sản phẩm</th>
                            <th className="py-3 px-6 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b hover:bg-gray-50 even:bg-gray-100">
                                <td className="py-3 px-6">{product.id}</td>
                                <td className="py-3 px-6 ">{product.name}</td>
                                <td className="py-3 px-6">{product.price.toLocaleString()}</td>
                                <td className="py-3 px-6">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-3 px-6 ">{product.detail}</td>
                                <td className="py-3 px-6 flex items-center justify-center gap-2">
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded">
                                        Sửa
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
