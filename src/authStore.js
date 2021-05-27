import create from "zustand";
import "./types/auth";
import "./types/service";

/**
 * @typedef {object} UserStore - creates a new type named 'SpecialType'
 * @property {import("@firebase/auth-types").User} user - a string property of SpecialType
 * @property {(token:import("@firebase/auth-types").User)=>void} set_user - a number property of SpecialType
 * @property {()=>void} remove_user - an optional number property of SpecialType
 */

/** @type {import("zustand").UseStore<UserStore>} */
export const userStore = create((set) => ({
  user: null,
  set_user: (user) => set(() => ({ user })),
  remove_user: () => set(() => ({ user: null })),
}));
