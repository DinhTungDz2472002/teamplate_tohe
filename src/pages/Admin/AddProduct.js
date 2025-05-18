// import React, { useState } from 'react';
// import axios from 'axios';

// function AddProduct() {
//     const [product, setProduct] = useState({
//         tenSanPham: '',
//         giaSanPham: 0,
//         maLoai: 0,
//         sLTonKho: 0,
//         moTaSp: '',
//     });
//     const [file, setFile] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('tenSanPham', product.tenSanPham);
//         formData.append('giaSanPham', product.giaSanPham);
//         formData.append('maLoai', product.maLoai);
//         formData.append('sLTonKho', product.sLTonKho);
//         formData.append('moTaSp', product.moTaSp);
//         if (file) {
//             formData.append('file', file); // Tên phải khớp với DTO (File)
//         }

//         try {
//             const response = await axios.post('https://localhost:7111/SanPham/Create', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log('Thêm sản phẩm thành công:', response.data);
//         } catch (error) {
//             console.error('Lỗi khi thêm sản phẩm:', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label>Tên sản phẩm:</label>
//                 <input type="text" name="tenSanPham" value={product.tenSanPham} onChange={handleInputChange} required />
//             </div>
//             <div>
//                 <label>Giá sản phẩm:</label>
//                 <input
//                     type="number"
//                     name="giaSanPham"
//                     value={product.giaSanPham}
//                     onChange={handleInputChange}
//                     required
//                 />
//             </div>
//             <div>
//                 <label>Mã loại:</label>
//                 <input type="number" name="maLoai" value={product.maLoai} onChange={handleInputChange} required />
//             </div>
//             <div>
//                 <label>Số lượng tồn kho:</label>
//                 <input type="number" name="sLTonKho" value={product.sLTonKho} onChange={handleInputChange} required />
//             </div>
//             <div>
//                 <label>Mô tả:</label>
//                 <input type="text" name="moTaSp" value={product.moTaSp} onChange={handleInputChange} />
//             </div>
//             <div>
//                 <label>Ảnh sản phẩm:</label>
//                 <input type="file" accept="image/*" onChange={handleFileChange} />
//             </div>
//             <button type="submit">Thêm sản phẩm</button>
//         </form>
//     );
// }

// export default AddProduct;

// 2

// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function AddProduct() {
//     const [product, setProduct] = useState({
//         tenSanPham: '',
//         giaSanPham: 0,
//         maLoai: 0,
//         sLTonKho: 0,
//         moTaSp: '',
//     });
//     const [file, setFile] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setProduct({ ...product, [name]: value });
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
//             if (!validTypes.includes(selectedFile.type)) {
//                 toast.error('Vui lòng chọn file ảnh (.jpg, .png, .gif)');
//                 setFile(null);
//                 return;
//             }
//             if (selectedFile.size > 5 * 1024 * 1024) {
//                 toast.error('File ảnh quá lớn (tối đa 5MB)');
//                 setFile(null);
//                 return;
//             }
//             setFile(selectedFile);
//         } else {
//             setFile(null);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         if (product.giaSanPham <= 0) {
//             toast.error('Giá sản phẩm phải lớn hơn 0');
//             setIsLoading(false);
//             return;
//         }
//         if (product.maLoai <= 0) {
//             toast.error('Mã loại phải lớn hơn 0');
//             setIsLoading(false);
//             return;
//         }
//         if (product.sLTonKho < 0) {
//             toast.error('Số lượng tồn kho không được âm');
//             setIsLoading(false);
//             return;
//         }

//         const formData = new FormData();
//         formData.append('tenSanPham', product.tenSanPham);
//         formData.append('giaSanPham', Number(product.giaSanPham));
//         formData.append('maLoai', Number(product.maLoai));
//         formData.append('sLTonKho', Number(product.sLTonKho));
//         formData.append('moTaSp', product.moTaSp || '');
//         if (file) {
//             formData.append('file', file);
//         }

//         try {
//             const response = await axios.post(`https://localhost:7111/SanPham/Create`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });
//             console.log('Thêm sản phẩm thành công:', response.data);
//             toast.success('Thêm sản phẩm thành công!');
//             setProduct({
//                 tenSanPham: '',
//                 giaSanPham: 0,
//                 maLoai: 0,
//                 sLTonKho: 0,
//                 moTaSp: '',
//             });
//             setFile(null);
//         } catch (error) {
//             console.error('Lỗi khi thêm sản phẩm:', error);
//             toast.error('Lỗi: ' + (error.response?.data || error.message));
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Tên sản phẩm:</label>
//                     <input
//                         type="text"
//                         name="tenSanPham"
//                         value={product.tenSanPham}
//                         onChange={handleInputChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Giá sản phẩm:</label>
//                     <input
//                         type="number"
//                         name="giaSanPham"
//                         value={product.giaSanPham}
//                         onChange={handleInputChange}
//                         required
//                         min="0"
//                     />
//                 </div>
//                 <div>
//                     <label>Mã loại:</label>
//                     <input
//                         type="number"
//                         name="maLoai"
//                         value={product.maLoai}
//                         onChange={handleInputChange}
//                         required
//                         min="1"
//                     />
//                 </div>
//                 <div>
//                     <label>Số lượng tồn kho:</label>
//                     <input
//                         type="number"
//                         name="sLTonKho"
//                         value={product.sLTonKho}
//                         onChange={handleInputChange}
//                         required
//                         min="0"
//                     />
//                 </div>
//                 <div>
//                     <label>Mô tả:</label>
//                     <input type="text" name="moTaSp" value={product.moTaSp} onChange={handleInputChange} />
//                 </div>
//                 <div>
//                     <label>Ảnh sản phẩm:</label>
//                     <input type="file" accept="image/*" onChange={handleFileChange} />
//                     {file && <p>File đã chọn: {file.name}</p>}
//                 </div>
//                 <button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Đang thêm...' : 'Thêm sản phẩm'}
//                 </button>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }

// export default AddProduct;

// 3
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component thêm sản phẩm với giao diện đẹp
function AddProduct() {
    const [product, setProduct] = useState({
        tenSanPham: '',
        giaSanPham: '',
        maLoai: '',
        sLTonKho: 1000,
        moTaSp: '',
    });
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loaiList, setLoaiList] = useState([]); // State lưu danh sách thể loại

    // Lấy danh sách thể loại khi component mount
    useEffect(() => {
        const fetchLoai = async () => {
            try {
                const response = await axios.get('https://localhost:7111/api/Loai');
                setLoaiList(response.data);
            } catch (error) {
                toast.error('Lỗi khi lấy danh sách thể loại: ' + error.message);
            }
        };
        fetchLoai();
    }, []);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Xử lý chọn file ảnh
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(selectedFile.type)) {
                toast.error('Vui lòng chọn file ảnh (.jpg, .png, .gif)');
                setFile(null);
                setPreviewUrl(null);
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error('File ảnh quá lớn (tối đa 5MB)');
                setFile(null);
                setPreviewUrl(null);
                return;
            }
            setFile(selectedFile);
            // Tạo URL tạm để hiển thị ảnh preview
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Kiểm tra dữ liệu đầu vào
        if (product.giaSanPham <= 0) {
            toast.error('Giá sản phẩm phải lớn hơn 0');
            setIsLoading(false);
            return;
        }
        if (product.maLoai <= 0) {
            toast.error('Mã loại phải lớn hơn 0');
            setIsLoading(false);
            return;
        }
        if (product.sLTonKho < 0) {
            toast.error('Số lượng tồn kho không được âm');
            setIsLoading(false);
            return;
        }

        // Tạo FormData để gửi
        const formData = new FormData();
        formData.append('tenSanPham', product.tenSanPham);
        formData.append('giaSanPham', Number(product.giaSanPham));
        formData.append('maLoai', Number(product.maLoai)); // Đảm bảo gửi maLoai dạng số
        formData.append('sLTonKho', Number(product.sLTonKho));
        formData.append('moTaSp', product.moTaSp || '');
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post(`https://localhost:7111/SanPham/Create`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Thêm sản phẩm thành công:', response.data);
            toast.success('Thêm sản phẩm thành công!');
            // Reset form
            setProduct({
                tenSanPham: '',
                giaSanPham: '',
                maLoai: '',
                sLTonKho: 1000,
                moTaSp: '',
            });
            setFile(null);
            setPreviewUrl(null);
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            toast.error('Lỗi: ' + (error.response?.data || error.message));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Thêm Sản Phẩm</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tên sản phẩm */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                        <input
                            type="text"
                            name="tenSanPham"
                            value={product.tenSanPham}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>

                    {/* Giá sản phẩm */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá sản phẩm (VND)</label>
                        <input
                            type="number"
                            name="giaSanPham"
                            value={product.giaSanPham}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Nhập giá sản phẩm"
                        />
                    </div>

                    {/* Combobox thể loại */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loại sản phẩm</label>
                        <select
                            name="maLoai"
                            value={product.maLoai}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        >
                            <option value="">Chọn loại sản phẩm</option>
                            {loaiList.map((loai) => (
                                <option key={loai.maLoai} value={loai.maLoai}>
                                    {loai.tenLoai}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Số lượng tồn kho */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn kho</label>
                        <input
                            type="number"
                            name="sLTonKho"
                            value={product.sLTonKho}
                            onChange={handleInputChange}
                            required
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Nhập số lượng tồn kho"
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <textarea
                            name="moTaSp"
                            value={product.moTaSp}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-y"
                            placeholder="Nhập mô tả sản phẩm"
                            rows="4"
                        />
                    </div>

                    {/* Ảnh sản phẩm */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh sản phẩm</label>
                        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-blue-500 transition">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <p className="text-gray-500">{file ? file.name : 'Kéo thả hoặc nhấn để chọn ảnh'}</p>
                        </div>
                        {previewUrl && (
                            <div className="mt-4">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-md mx-auto"
                                />
                            </div>
                        )}
                    </div>

                    {/* Nút gửi */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${
                            isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? 'Đang thêm...' : 'Thêm sản phẩm'}
                    </button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default AddProduct;
