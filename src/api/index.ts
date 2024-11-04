import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL as string;

const api = axios.create({
    baseURL: apiUrl,
    timeout: 1000,
});

export default api;