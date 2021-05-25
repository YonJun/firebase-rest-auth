import axios from "axios";
import qs from "qs";
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
    config.params = {
      ...config.params,
      auth: payload.idToken ?? payload.id_token,
    };
    config.url = `${config.url.replace(
      "{{USER_ID}}",
      payload.localId ?? payload.user_id,
    )}.json`;
    console.log("PRIVATE_API config", config);
  }
  return config;
});

async function refreshToken() {
  const payload = authStore.getState().payload;
  if (payload) {
    const set_payload = authStore.getState().set_payload;
    try {
      const responsefreshToken = await axios({
        method: "post",
        url: `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
        data: qs.stringify({
          grant_type: "refresh_token",
          refresh_token: payload.refreshToken ?? payload.refresh_token,
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      set_payload(responsefreshToken.data);
      console.log("responsefreshToken data", responsefreshToken.data);
    } catch (responsefreshTokenError) {
      console.log(
        "catch (responsefreshTokenError) ",
        JSON.stringify(responsefreshTokenError, null, 2),
      );
    }
  }
}

PRIVATE_API.interceptors.response.use(
  (response) => {
    return response;
  },
  /**@param {AxiosError} error */
  function (error) {
    if (error.response) {
      /** @type {ResponseErrorApi} */
      const responseError = error.response;
      // console.log("PRIVATE_API responseError", responseError);
      if (responseError.status === 401) {
        // console.log("call to refresh token api");
        refreshToken();
      }
      return Promise.reject(responseError);
    }
    return Promise.reject(error);
  },
);

export { AUTH, PRIVATE_API };
