import "../../types/service";
import { useMutation, useQuery } from "react-query";
import {
  DELETE_Todo,
  GET_listTodo,
  PATCH_UpdateTodo,
  POST_AddTodo,
} from "../promises/private";
import { LIST_TODO } from "../../constants/QueryKeys";
import { queryClient } from "../../QClient";

/** @type {() => import("react-query").UseQueryResult<Array<Task> ,ResponseErrorApi>}*/
export const useTodoQuery = () => useQuery(LIST_TODO, GET_listTodo);

/** @type {() => import("react-query").UseMutationResult<void ,ResponseErrorApi, Omit<Task,'ID'>>}*/
export const useAddTodoMutation = () =>
  useMutation(POST_AddTodo, {
    // When mutate is called:
    onMutate: async (todo) => {
      await queryClient.cancelQueries(LIST_TODO);

      const previousValue = queryClient.getQueryData(LIST_TODO);

      queryClient.setQueryData(LIST_TODO, (old) => [...old, todo]);

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData(LIST_TODO, previousValue),
    // After success or failure, refetch the GET_listTodo query
    onSettled: () => {
      queryClient.invalidateQueries(LIST_TODO);
    },
  });

/** @type {((options:import("react-query").UseMutationOptions) => import("react-query").UseMutationResult<void ,ResponseErrorApi, {ID:string,task:Omit<Task,'ID'>}>}*/
export const useUpdateTodoMutation = (options = {}) =>
  useMutation(PATCH_UpdateTodo, {
    onMutate: async (newChangesTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(LIST_TODO);
      // Snapshot the previous value
      const previousTodo = queryClient.getQueryData(LIST_TODO);
      // Optimistically update to the new value
      queryClient.setQueryData(LIST_TODO, (old) =>
        old.map((task) => {
          if (task.ID === newChangesTodo.ID) {
            return { ...task, ...newChangesTodo };
          }
          return task;
        }),
      );
      // Return a context with the previous and new todo
      return { previousTodo };
    },
    // If the mutation fails, use the context we returned above
    onError: (_, __, context) => {
      queryClient.setQueryData(LIST_TODO, context.previousTodo);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(LIST_TODO);
    },
  });

/** @type {(options:import("react-query").UseMutationOptions) => import("react-query").UseMutationResult<void ,ResponseErrorApi, string>}*/
export const useDeleteTodoMutation = (options = {}) =>
  useMutation(DELETE_Todo, {
    onMutate: async (idTodo) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries([LIST_TODO, idTodo]);
      // Snapshot the previous value
      const previousTodo = queryClient.getQueryData(LIST_TODO);
      // Optimistically update to the new value
      queryClient.setQueryData(LIST_TODO, (old) =>
        old.filter((task) => task.ID !== idTodo),
      );
      // Return a context with the previous and new todo
      return { previousTodo };
    },
    // If the mutation fails, use the context we returned above
    onError: (_, __, context) => {
      queryClient.setQueryData(LIST_TODO, context.previousTodo);
    },
    // Always refetch after error or success:
    onSettled: (newTodo) => {
      queryClient.invalidateQueries(LIST_TODO);
    },
  });
