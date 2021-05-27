import { useEffect } from "react";
import { userStore } from "../authStore";

/** @type {import("react").FC<{token:string}>} */
const UserProvider = ({ children, user: userParam }) => {
  const set_user = userStore((s) => s.set_user);
  const user = userStore((s) => s.user);
  // console.log("UserProvider user", user);
  // console.log("UserProvider token", token);

  useEffect(() => {
    if (userParam) set_user(userParam);
  }, [userParam, set_user]);

  if (user) return children;

  return <div />;
};

export default UserProvider;
