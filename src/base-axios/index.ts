// base-axios.ts
import axios from "axios";
import type { Store } from "@reduxjs/toolkit";
import { VITE_APP_API_URL } from "../config";

export const Axios = axios.create({ baseURL: `${VITE_APP_API_URL}` });

const setupAxios = (store: Store) => {
  Axios.interceptors.request.use((request) => {
    const clientIp = localStorage.getItem("clientIp");

    if (request.headers && clientIp) {
      request.headers["x-client-ip"] = `${clientIp}`;
    }

    if (request.headers) {
      request.headers["x-client-tz"] =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    request.withCredentials = true;
    return request;
  });

  Axios.interceptors.response.use(
    (res) => res.data,
    (e) => {
      const status = e?.response?.status;

      if (status === 401) {
        const storeData = store.getState();
        if (storeData?.auth?.token) {
          // Dispatch action by type string instead of importing the slice
          store.dispatch({ type: "auth/setLogoutData" });
        }
      }

      if ([400, 401, 422, 500].includes(status)) {
        if (e.response.data === "showCustomError") return;
      }

      throw e.response.data;
    }
  );
};

export default setupAxios