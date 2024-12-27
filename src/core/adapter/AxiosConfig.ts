import axios from "axios";
import { API_URL } from "@/config";

console.log("s", API_URL);
export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		if (localStorage.getItem("token")) {
			config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response; // 2xx response ACK
	},
	(error) => {
		//4xx||5xx response
		if (error.response.status === 401) {
			localStorage.removeItem("token");
			// redirect to login
			window.location.href = "/";
		}
		return Promise.reject(error);
	},
);
