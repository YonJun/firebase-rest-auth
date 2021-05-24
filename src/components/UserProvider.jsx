import { Fragment, useEffect } from "react";
import { userStore } from "../authStore";
import jwt_decode from "jwt-decode";

/** @type {import("react").FC<{token:string}>} */
const UserProvider = ({ children, token }) => {
  const set_user = userStore((s) => s.set_user);
  const user = userStore((s) => s.user);

  useEffect(() => {
    set_user(jwt_decode(token));
  }, [token, set_user]);

  if (user) return <Fragment>{children}</Fragment>;

  return null;
};

export default UserProvider;
