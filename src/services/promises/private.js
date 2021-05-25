import { PRIVATE_API } from "../../uitls/axios-config";
import "../../types/service";

/** @return {Promise<Array<Task>>}  */
export const GET_listTodo = () => {
  return PRIVATE_API.get("/todo/{{USER_ID}}").then((resp) => {
    if (resp.data) {
      return Object.keys(resp.data).map((e, i) => ({ ID: e, ...resp.data[e] }));
    }
    return [];
  });
};

/**  @param {Omit<Task,"ID">} params */
export const POST_AddTodo = (params) =>
  PRIVATE_API.post("/todo/{{USER_ID}}", params);

/** @param {{ID:string,task:Task}} params */
export const PATCH_UpdateTodo = (params) =>
  PRIVATE_API.patch(`/todo/{{USER_ID}}/${params.ID}`, params.task);

/** @param {string} ID */
export const DELETE_Todo = (ID) =>
  PRIVATE_API.delete(`/todo/{{USER_ID}}/${ID}`);
