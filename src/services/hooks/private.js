import "../../types/service";
import { useMutation, useQuery } from "react-query";
import {
  DELETE_Todo,
  GET_listTodo,
  PATCH_UpdateTodo,
  POST_AddTodo,
} from "../promises/private";

/** @type {() => import("react-query").UseQueryResult<Array<Task> ,ResponseErrorApi>}*/
export const useTodoQuery = () => useQuery("GET_listTodo", GET_listTodo);

/** @type {() => import("react-query").UseMutationResult<void ,ResponseErrorApi, Omit<Task,'ID'>>}*/
export const useAddTodoMutation = () => useMutation(POST_AddTodo);

/** @type {() => import("react-query").UseMutationResult<void ,ResponseErrorApi, {ID:string,task:Omit<Task,'ID'>}>}*/
export const useUpdateTodoMutation = () => useMutation(PATCH_UpdateTodo);

/** @type {() => import("react-query").UseMutationResult<void ,ResponseErrorApi, string>}*/
export const useDeleteTodoMutation = () => useMutation(DELETE_Todo);
