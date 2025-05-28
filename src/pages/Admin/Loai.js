// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';

// function Loai() {
//     const [categories, setCategories] = useState([]);
//     const [tenLoai, setTenLoai] = useState('');
//     const [editingId, setEditingId] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Base URL for API (ensure this matches your backend)
//     const API_BASE_URL = 'https://localhost:7111';

//     // Fetch all categories
//     const fetchCategories = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/api/Loai`);
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to fetch categories');
//             }
//             const data = await response.json();
//             setCategories(data);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Add or Update category
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!tenLoai.trim()) {
//             setError('Tên loại không được để trống.');
//             return;
//         }

//         try {
//             setLoading(true);
//             let url, method, body;

//             if (editingId) {
//                 // Update request (PUT)
//                 url = `${API_BASE_URL}/api/Update_Loai/${editingId}?TenLoai=${encodeURIComponent(tenLoai)}`;
//                 method = 'PUT';
//                 body = null; // No body for query parameters
//             } else {
//                 // Create request (POST)
//                 url = `${API_BASE_URL}/api/Create_Loai`;
//                 method = 'POST';
//                 const formData = new FormData();
//                 formData.append('TenLoai', tenLoai);
//                 body = formData;
//             }

//             const response = await fetch(url, {
//                 method,
//                 body,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to save category');
//             }

//             await fetchCategories();
//             toast.success('Thêm thành công');
//             setTenLoai('');
//             setEditingId(null);
//             setError(null);
//             setIsModalOpen(false);
//         } catch (err) {
//             setError(err.message);
//             toast.error('không thêm được');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Delete category
//     const handleDelete = async (id) => {
//         if (!window.confirm('Bạn có chắc muốn xóa loại này?')) return;
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/api/Delete_Loai/${id}`, {
//                 method: 'DELETE',
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to delete category');
//             }
//             await fetchCategories();
//             toast.success('Xóa thành công');
//         } catch (err) {
//             setError(err.message);
//             toast.error('Không thể xóa vì dữ liệu đã được lấy');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Edit category
//     const handleEdit = (category) => {
//         setTenLoai(category.tenLoai);
//         setEditingId(category.maLoai);
//         setIsModalOpen(true);
//     };

//     // Open modal for adding new category
//     const openAddModal = () => {
//         setTenLoai('');
//         setEditingId(null);
//         setError(null);
//         setIsModalOpen(true);
//     };

//     // Close modal
//     const closeModal = () => {
//         setIsModalOpen(false);
//         setTenLoai('');
//         setEditingId(null);
//         setError(null);
//     };

//     // Fetch categories on component mount
//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     return (
//         <div className="p-5">
//             <div className="flex justify-end mb-4">
//                 <button
//                     onClick={openAddModal}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//                 >
//                     Thêm loại mới
//                 </button>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
//                         <h2 className="text-lg font-semibold mb-4">{editingId ? 'Sửa Loại' : 'Thêm Loại Mới'}</h2>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700">Tên Loại</label>
//                                 <input
//                                     type="text"
//                                     value={tenLoai}
//                                     onChange={(e) => setTenLoai(e.target.value)}
//                                     className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                                     placeholder="Nhập tên loại"
//                                 />
//                             </div>
//                             {error && <p className="text-red-500 text-sm">{error}</p>}
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={closeModal}
//                                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
//                                 >
//                                     Hủy
//                                 </button>
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-blue-300"
//                                 >
//                                     {loading ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* Category list */}
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="py-3 px-6 text-left">ID</th>
//                             <th className="py-3 px-6 text-left">Tên Loại</th>
//                             <th className="py-3 px-6 text-center">Hành Động</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {loading ? (
//                             <tr>
//                                 <td colSpan="3" className="py-3 px-6 text-center">
//                                     Đang tải...
//                                 </td>
//                             </tr>
//                         ) : categories.length === 0 ? (
//                             <tr>
//                                 <td colSpan="3" className="py-3 px-6 text-center">
//                                     Không tìm thấy loại sản phẩm
//                                 </td>
//                             </tr>
//                         ) : (
//                             categories.map((category, index) => (
//                                 <tr
//                                     key={category.maLoai}
//                                     className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
//                                 >
//                                     <td className="py-3 px-6">{category.maLoai}</td>
//                                     <td className="py-3 px-6">{category.tenLoai}</td>
//                                     <td className="py-3 px-6 flex items-center justify-center gap-2">
//                                         <button
//                                             onClick={() => handleEdit(category)}
//                                             className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded"
//                                         >
//                                             Sửa
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(category.maLoai)}
//                                             className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
//                                         >
//                                             Xóa
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default Loai;
import React, { useState, useEffect } from 'react';

function Loai() {
    const [categories, setCategories] = useState([]);
    const [tenLoai, setTenLoai] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Base URL for API
    const API_BASE_URL = 'https://localhost:7111';

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/Loai`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể tải danh sách loại');
            }
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add or Update category
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenLoai.trim()) {
            setError('Tên loại không được để trống.');
            return;
        }

        try {
            setLoading(true);
            let url, method, body;

            if (editingId) {
                // Update request (PUT)
                url = `${API_BASE_URL}/api/Update_Loai/${editingId}?TenLoai=${encodeURIComponent(tenLoai.trim())}`;
                method = 'PUT';
                body = null;
            } else {
                // Create request (POST)
                url = `${API_BASE_URL}/api/Create_Loai`;
                method = 'POST';
                const formData = new FormData();
                formData.append('TenLoai', tenLoai.trim());
                body = formData;
            }

            const response = await fetch(url, {
                method,
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể lưu loại');
            }

            await fetchCategories();
            setTenLoai('');
            setEditingId(null);
            setError(null);
            setIsModalOpen(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete category
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa loại này?')) return;
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/Delete_Loai/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể xóa loại');
            }
            await fetchCategories();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Edit category
    const handleEdit = (category) => {
        setTenLoai(category.tenLoai);
        setEditingId(category.maLoai);
        setIsModalOpen(true);
    };

    // Open modal for adding new category
    const openAddModal = () => {
        setTenLoai('');
        setEditingId(null);
        setError(null);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setTenLoai('');
        setEditingId(null);
        setError(null);
    };

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="p-5">
            <div className="flex justify-end mb-4">
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Thêm loại mới
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
                        <h2 className="text-lg font-semibold mb-4">{editingId ? 'Sửa Loại' : 'Thêm Loại Mới'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tên Loại</label>
                                <input
                                    type="text"
                                    value={tenLoai}
                                    onChange={(e) => setTenLoai(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập tên loại"
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded disabled:bg-blue-300"
                                >
                                    {loading ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Thêm'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category list */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Tên Loại</th>
                            <th className="py-3 px-6 text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 text-center">
                                    Đang tải...
                                </td>
                            </tr>
                        ) : categories.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 text-center">
                                    Không tìm thấy loại sản phẩm
                                </td>
                            </tr>
                        ) : (
                            categories.map((category, index) => (
                                <tr
                                    key={category.maLoai}
                                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
                                >
                                    <td className="py-3 px-6">{category.maLoai}</td>
                                    <td className="py-3 px-6">{category.tenLoai}</td>
                                    <td className="py-3 px-6 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.maLoai)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Loai;
