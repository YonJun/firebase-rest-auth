import { PRIVATE_API } from "../../uitls/axios-config";
import "../../types/service";

/** @return {Promise<Array<Task>>}  */
export const GET_listTodo = () => {
  return PRIVATE_API.get("/todo").then((resp) => {
    if (resp.data) {
      return Object.keys(resp.data).map((e, i) => ({ ID: e, ...resp.data[e] }));
    }
    return [];
  });
};

/**
 *  @param {Omit<Task,"ID">} params
 *  @return {Promise<AxiosResponse<Task>>}
 */
export const POST_AddTodo = (params) =>
  PRIVATE_API.post("/todo", params).then((resp) => {
    console.log("POST_AddTodo resp", resp);
    return resp;
  });
