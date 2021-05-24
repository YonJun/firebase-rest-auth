import "../../types/service";
import { useQuery } from "react-query";
import { GET_listTodo } from "../promises/private";

/** @type {() => import("react-query").UseMutationResult<Array<Task> ,CommonError|string, LoginParams, unknown>}*/
export const useTodoQuery = () => useQuery("login", GET_listTodo);
