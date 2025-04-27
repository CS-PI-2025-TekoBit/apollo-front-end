import axios from "axios";

const API_URL = import.meta.env.VITE_URL_BACK_END;

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
});

const Api = {
    get: async (route) => {
        return api.get(route);
    },
    post: async (route, data) => {
        return api.post(route, data);
    },
};

export default Api;
