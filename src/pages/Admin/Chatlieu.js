import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function ChatLieu() {
    const [materials, setMaterials] = useState([]);
    const [tenCl, setTenCl] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Base URL for API
    const API_BASE_URL = 'https://localhost:7111';

    // Fetch all materials
    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/ChatLieu`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể tải danh sách chất liệu');
            }
            const data = await response.json();
            setMaterials(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add or Update material
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenCl.trim()) {
            setError('Tên chất liệu không được để trống.');
            toast.error('Tên chất liệu không được để trống.');
            return;
        }

        try {
            setLoading(true);
            let url, method, body;

            if (editingId) {
                // Update request (PUT)
                url = `${API_BASE_URL}/api/Update_ChatLieu/${editingId}?TenCl=${encodeURIComponent(tenCl.trim())}`;
                method = 'PUT';
                body = null;
            } else {
                // Create request (POST)
                url = `${API_BASE_URL}/api/Create_ChatLieu`;
                method = 'POST';
                const formData = new FormData();
                formData.append('TenCl', tenCl.trim());
                body = formData;
            }

            const response = await fetch(url, {
                method,
                body,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể lưu chất liệu');
            }

            const responseData = await response.json();
            await fetchMaterials();
            setTenCl('');
            setEditingId(null);
            setError(null);
            setIsModalOpen(false);
            toast.success(
                responseData.message || (editingId ? 'Cập nhật chất liệu thành công' : 'Thêm chất liệu thành công'),
            );
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete material
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa chất liệu này?')) return;
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/Delete_ChatLieu/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Không thể xóa chất liệu');
            }
            const responseData = await response.json();
            await fetchMaterials();
            setError(null);
            toast.success(responseData.message || 'Xóa chất liệu thành công');
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Edit material
    const handleEdit = (material) => {
        setTenCl(material.tenCl);
        setEditingId(material.maCl);
        setIsModalOpen(true);
    };

    // Open modal for adding new material
    const openAddModal = () => {
        setTenCl('');
        setEditingId(null);
        setError(null);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setTenCl('');
        setEditingId(null);
        setError(null);
    };

    // Fetch materials on component mount
    useEffect(() => {
        fetchMaterials();
    }, []);

    return (
        <div className="p-5">
            <div className="flex justify-end mb-4">
                <button
                    onClick={openAddModal}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Thêm chất liệu mới
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6">
                        <h2 id="modal-title" className="text-lg font-semibold mb-4">
                            {editingId ? 'Sửa Chất Liệu' : 'Thêm Chất Liệu Mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="tenCl" className="block text-sm font-medium text-gray-700">
                                    Tên Chất Liệu
                                </label>
                                <input
                                    id="tenCl"
                                    type="text"
                                    value={tenCl}
                                    onChange={(e) => setTenCl(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Nhập tên chất liệu"
                                    aria-required="true"
                                />
                            </div>
                            {error && (
                                <p className="text-red-500 text-sm" role="alert">
                                    {error}
                                </p>
                            )}
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

            {/* Material list */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Tên Chất Liệu</th>
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
                        ) : materials.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="py-3 px-6 text-center">
                                    Không tìm thấy chất liệu
                                </td>
                            </tr>
                        ) : (
                            materials.map((material, index) => (
                                <tr
                                    key={material.maCl}
                                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
                                >
                                    <td className="py-3 px-6">{material.maCl}</td>
                                    <td className="py-3 px-6">{material.tenCl}</td>
                                    <td className="py-3 px-6 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(material)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(material.maCl)}
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

export default ChatLieu;
