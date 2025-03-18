import request from "../utils/request";

const baseUrl = "http://localhost:3030/jsonstore/clubs";

export default {
    async getAll() {
        const result = await request.get(baseUrl);

        const data = Object.values(result);

        return data;
    },
    getOne(dataId) {
        return request.get(`${baseUrl}/${dataId}`);
    },
    create(dataDetails) {
        return request.post(baseUrl, dataDetails);
    },
    edit(dataId, dataDetails) {
        return request.put(`${baseUrl}/${dataId}`, { ...dataDetails, _id: dataId });
    },
    delete(dataId) {
        return request.delete(`${baseUrl}/${dataId}`);
    },
};
