import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

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
