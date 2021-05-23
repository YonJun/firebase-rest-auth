import { AUTH } from "../../uitls/axios-config";
import "../../types/service";
/** @typedef { import("axios").AxiosResponse } AxiosResponse */

/**
 *  @param {LoginParams} params
 *  @return {Promise<AxiosResponse<any>>}
 */
export const POST_login = (params) =>
  AUTH.post("/accounts:signInWithPassword", {
    ...params,
    returnSecureToken: true,
  });
