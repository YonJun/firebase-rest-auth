import { useMutation } from "react-query";
import { POST_login, POST_register } from "../promises/public";
import "../../types/service";

/** @type {() => import("react-query").UseMutationResult<LoginResponse,CommonError|string, LoginParams, unknown>}*/
export const useLoginMutation = () => useMutation("login", POST_login);

/** @type {() => import("react-query").UseMutationResult<LoginResponse,CommonError|string, LoginParams, unknown>}*/
export const useRegisterMutation = () => useMutation("login", POST_register);
