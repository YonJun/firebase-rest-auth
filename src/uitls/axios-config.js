import axios from "axios";
import { authStore } from "../authStore";
import { API_KEY } from "../constants/auth";
import "../types/service";
/** @typedef { import("axios").AxiosError } AxiosError */

const AUTH = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

AUTH.interceptors.request.use((config) => {
  config.params = { ...config.params, key: API_KEY };
  return config;
});

AUTH.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  /**@param {AxiosError} error */
  function (error) {
    console.log("error", error);
    if (error.response.data) {
      /**@type {{error:CommonError}} */
      const responseError = error.response.data;

      return Promise.reject(responseError.error.message);
    }
    return Promise.reject(error);
  },
);

const PRIVATE_API = axios.create({
  baseURL: "https://auth-502e2-default-rtdb.firebaseio.com",
});

PRIVATE_API.interceptors.request.use((config) => {
  const payload = authStore.getState().payload;
  if (payload) {
    config.params = { ...config.params, auth: payload.idToken };
    config.url = `${config.url}/${payload.localId}.json`;
    // console.log("PRIVATE_API config", config);
  }
  return config;
});

PRIVATE_API.interceptors.response.use(
  (response) => {
    return response;
  },
  /**@param {AxiosError} error */
  function (error) {
    // console.log("PRIVATE_API error", error);
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(error);
  },
);

export { AUTH, PRIVATE_API };
