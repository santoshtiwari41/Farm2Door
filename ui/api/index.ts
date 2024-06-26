import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "http://192.168.84.248:4000/api/v1",
});

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token from SecureStore:", error);
    throw error;
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

export default api;
