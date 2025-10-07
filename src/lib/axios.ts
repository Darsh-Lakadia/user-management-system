import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import toast from "react-hot-toast";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://api.escuelajs.co/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      `API Request: ${config.method?.toUpperCase()} ${config.url}`,
      config
    );
    return config;
  },
  (error: AxiosError) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error("Response Error:", error);

    if (error.response) {
      const { data } = error.response;
      toast.error((data as any).message as string || "An unexpected error occurred.");
    } else if (error.request) {
      toast.error("Network error. Please check your connection.");
    } else {
      toast.error("An unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
