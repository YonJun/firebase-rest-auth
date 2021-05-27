import { useMutation } from "react-query";
import { POST_login, POST_register } from "../promises/public";
import "../../types/service";

/** @type {() => import("react-query").UseMutationResult<SignInSuccessResponse ,SignInErrorResponse, LoginParams, unknown>}*/
export const useLoginMutation = () => useMutation(POST_login);

/** @type {() => import("react-query").UseMutationResult<PayloadResponse ,CommonError|string, LoginParams, unknown>}*/
export const useRegisterMutation = () => useMutation(POST_register);
