import { PRIVATE_API } from "../../uitls/axios-config";
import "../../types/service";
/** @typedef { import("axios").AxiosResponse } AxiosResponse */
const d = PRIVATE_API.get("/todo");

/**
 *  @return {Promise<Array<Object>>}
 */
export const GET_listTodo = () => {
  return PRIVATE_API.get("/todo").then((resp) => {
    if (resp.data) {
      return Object.keys(resp.data).map((e, i) => ({ ID: e, ...resp.data[e] }));
    }
    return [];
  });
};
