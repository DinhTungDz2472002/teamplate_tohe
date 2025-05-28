import React, { useState, useEffect } from 'react';

function ChatLieu() {
    const [materials, setMaterials] = useState([]);
    const [tenChatLieu, setTenChatLieu] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch all materials
    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://localhost:7111/api/ChatLieu');
            if (!response.ok) throw new Error('Không thể tải danh sách chất liệu');
            const data = await response.json();
            setMaterials(data);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add or Update material
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenChatLieu.trim()) {
            setError('Tên chất liệu là bắt buộc');
            return;
        }

        try {
            setLoading(true);
            const url = editingId
                ? `https://localhost:7111/api/ChatLieu/${editingId}`
                : 'https://localhost:7111/api/ChatLieu';
            const method = editingId ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tenCl: tenChatLieu }), // Changed to tenCl
            });

            if (!response.ok) throw new Error('Không thể lưu chất liệu');
            await fetchMaterials();
            setTenChatLieu('');
            setEditingId(null);
            setError(null);
            setIsModalOpen(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete material
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc muốn xóa chất liệu này?')) return;
        try {
            setLoading(true);
            const response = await fetch(`https://localhost:7111/api/ChatLieu/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Không thể xóa chất liệu');
            await fetchMaterials();
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Edit material
    const handleEdit = (material) => {
        setTenChatLieu(material.tenCl); // Changed to tenCl
        setEditingId(material.maCl); // Changed to maCl
        setIsModalOpen(true);
    };

    // Open modal for adding new material
    const openAddModal = () => {
        setTenChatLieu('');
        setEditingId(null);
        setError(null);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setTenChatLieu('');
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

            {/* Error Display */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
            )}

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
                                <label htmlFor="tenChatLieu" className="block text-sm font-medium text-gray-700">
                                    Tên Chất Liệu
                                </label>
                                <input
                                    id="tenChatLieu"
                                    type="text"
                                    value={tenChatLieu}
                                    onChange={(e) => setTenChatLieu(e.target.value)}
                                    className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
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
                                    key={material.maCl} // Changed to maCl
                                    className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? '' : 'bg-gray-100'}`}
                                >
                                    <td className="py-3 px-6">{material.maCl}</td> {/* Changed to maCl */}
                                    <td className="py-3 px-6">{material.tenCl}</td> {/* Changed to tenCl */}
                                    <td className="py-3 px-6 flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(material)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded"
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(material.maCl)} // Changed to maCl
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
