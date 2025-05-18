// src/api/sanpham_api/sanphamApi.js
import axios from '~/services/customize-axios';

const SanPhamApi = {
    // 1. Lấy danh sách sản phẩm có phân trang
    getList: (pageNumber, pageSize) => {
        return axios.get('/SanPham/GetList', {
            params: { pageNumber, pageSize: 8 },
        });
    },

    // 2. Tìm kiếm sản phẩm
    search: (keyword) => {
        return axios.post('/SanPham/Search', null, {
            params: { s: keyword },
        });
    },

    // 3. Lấy sản phẩm theo ID
    getById: (id) => {
        return axios.get('/SanPham/GetById', {
            params: { id },
        });
    },

    // 4. Thêm mới sản phẩm
    create: (data) => {
        return axios.post('/SanPham/Create', data);
    },

    // 5. Cập nhật sản phẩm
    // update: (data) => {
    //     return axios.put('/SanPham/Update', data);
    // },
    update: async (payload) => {
        const response = await axios.put(`/SanPham/Update`, payload, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },

    // 6. Xóa sản phẩm
    delete: (id) => {
        return axios.delete('/SanPham/Delete', {
            params: { id },
        });
    },
};

export default SanPhamApi;
