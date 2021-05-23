import create from "zustand";
import jwt_decode from "jwt-decode";
import "./types/auth";

/**
 * @typedef {object} UserStore - creates a new type named 'SpecialType'
 * @property {null|User} user - a string property of SpecialType
 * @property {(user:User)=>void} set_user - a number property of SpecialType
 * @property {()=>void} remove_user - an optional number property of SpecialType
 */

/** @type {import("zustand").UseStore<UserStore>} */
export const userStore = create((set) => ({
  user: null,
  set_user: (user) => set(() => ({ user })),
  remove_user: () => set(() => ({ user: null })),
}));

/**
 * @typedef {object} Store - creates a new type named 'SpecialType'
 * @property {null|string} token - a string property of SpecialType
 * @property {(token:string)=>void} set_token - a number property of SpecialType
 * @property {()=>void} remove_token - an optional number property of SpecialType
 */

/** @type {import("zustand").UseStore<Store>} */
export const authStore = create((set) => ({
  token: null,
  set_token: (token) =>
    set(() => {
      const decoded = jwt_decode(token);
      userStore.getState().set_user(decoded);
      return { token };
    }),
  remove_token: () => set(() => ({ token: null })),
}));
