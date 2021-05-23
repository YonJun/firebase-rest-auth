import { useMutation } from "react-query";
import { POST_login } from "../promises/public";
import "../../types/service";

/** @type {() => import("react-query").UseMutationResult<LoginResponse,CommonError|string, LoginParams, unknown>}*/
export const useLoginMutation = () => useMutation("login", POST_login);
