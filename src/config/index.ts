import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthStateTokenProps } from "@store/features/auth/authSlice";

export const API_BASE_URL = "http://192.168.1.133:9000/api/v0/";

const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const authToken = JSON.parse(token) as AuthStateTokenProps;
      config.headers.Authorization = `Bearer ${authToken.access_token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
