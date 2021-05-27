import { AUTH } from "../../uitls/axios-config";
import "../../types/service";
/** @typedef { import("axios").AxiosResponse } AxiosResponse */
import "firebase/auth";
import firebase from "firebase/app";

/**
 *  @param {LoginParams} params
 *  @return {Promise<AxiosResponse<any>>}
 */
export const POST_login = (params) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(params.email, params.password);
};

/**
 *  @param {LoginParams} params
 *  @return {Promise<AxiosResponse<any>>}
 */
export const POST_register = (params) =>
  AUTH.post("/accounts:signUp", {
    ...params,
    returnSecureToken: true,
  });
