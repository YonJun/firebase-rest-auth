import axios from "axios";
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

export { AUTH };
