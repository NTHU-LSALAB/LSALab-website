import axios, { AxiosError } from "axios";
import { useAuthStore, useComponentStore } from "@/store";

export const strapi = axios.create({
  baseURL: `${import.meta.env.VITE_STRAPI_ENDPOINT}/api`,
});

strapi.interceptors.request.use(
  (config: any) => {
    const authStore = useAuthStore();
    const token = authStore.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

strapi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, request } = error;
    const authStore = useAuthStore();
    const componentStore = useComponentStore();

    if (response) {
      const { status, data } = response;
      componentStore.sendMessage(data.error.message);
      // switch (status) {
      //   case 404:
      //     break;
      //   case 500:
      //     break;
      // }
    }

    return Promise.reject(error);
  }
);

export default strapi;
