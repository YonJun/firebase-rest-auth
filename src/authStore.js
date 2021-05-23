import create from "zustand";

/**
 * @typedef {object} Store - creates a new type named 'SpecialType'
 * @property {string|null} token - a string property of SpecialType
 * @property {(token:string)=>void} set_token - a number property of SpecialType
 * @property {()=>void} remove_token - an optional number property of SpecialType
 */

/**
 * @type {import("zustand").UseStore<Store>}
 */
const authStore = create((set) => ({
  token: null,
  set_token: (token) => set(() => ({ token })),
  remove_token: () => set(() => ({ token: null })),
}));

export default authStore;
