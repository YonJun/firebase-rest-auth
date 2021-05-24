import create from "zustand";
import "./types/auth";
import "./types/service";
import { getPersisPayload, setPersisPayload } from "./uitls/PersistPayload";

/**
 * @typedef {object} UserStore - creates a new type named 'SpecialType'
 * @property {User} user - a string property of SpecialType
 * @property {(token:User)=>void} set_user - a number property of SpecialType
 * @property {()=>void} remove_user - an optional number property of SpecialType
 */

/** @type {import("zustand").UseStore<UserStore>} */
export const userStore = create((set) => ({
  user: null,
  set_user: (user) => set(() => ({ user })),
  remove_user: () => set(() => ({ user: null })),
}));

/**
 * @typedef {object} Store
 * @property {null|PayloadResponse} payload
 * @property {(payload:PayloadResponse)=>void} set_payload
 * @property {()=>void} remove_payload
 */
/** @type {import("zustand").UseStore<Store>} */
export const authStore = create((set) => ({
  payload: getPersisPayload(),
  set_payload: (payload) =>
    set(() => {
      setPersisPayload(payload);
      return { payload };
    }),
  remove_payload: () => set(() => ({ payload: null })),
}));
