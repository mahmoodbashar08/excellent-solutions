// axios.ts
import Axios from "axios";
import { API_URL } from "@/config";
import { signOut } from "next-auth/react";

const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      signOut({ callbackUrl: "/login" });
      sessionStorage.removeItem("token"); // or localStorage if you're using that
    }
    return Promise.reject(error);
  }
);

export default axios;
