import "../../types/service";
import { useMutation, useQuery } from "react-query";
import { GET_listTodo, POST_AddTodo } from "../promises/private";

/** @type {() => import("react-query").UseQueryResult<Array<Task> ,ResponseErrorApi>}*/
export const useTodoQuery = () => useQuery("login", GET_listTodo);

/** @type {() => import("react-query").UseMutationResult<Task ,ResponseErrorApi, Omit<Task,'ID'>, unknown>}*/
export const useAddTodoMutation = () => useMutation("login", POST_AddTodo);
