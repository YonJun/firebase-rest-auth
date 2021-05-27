// eslint-disable-next-line
import tw from "twin.macro";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { memo, useState } from "react";
// import { useAddTodoMutation, useTodoQuery } from "../services/hooks/private";
import { useAuth } from "reactfire";
import { useAddTodoMutation } from "../services/hooks/private";
import { userStore } from "../authStore";

const Header = () => {
  const { mutate, isLoading } = useAddTodoMutation();
  const user = userStore((s) => s.user);
  const auth = useAuth();
  const btnLogout = () => {
    auth.signOut();
  };

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  /**   @param {import("react").ChangeEvent<HTMLFormElement>} e */
  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        description: value,
        done: false,
      },
      {
        onSuccess(resp) {
          // console.log("onSuccess resp", resp);
          // refetch();
          setValue("");
        },
        onError(err) {
          console.log("onError err", err);
        },
      },
    );
  };

  return (
    <>
      <div tw="flex items-center justify-between">
        <h1>{user.email}</h1>
        <Button colorScheme="gray" onClick={btnLogout}>
          Cerrar sesión
        </Button>
      </div>
      <form tw="flex items-center space-x-3" onSubmit={onSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          placeholder="Ingrese una nueva tarea"
          size="sm"
          disabled={isLoading}
          required
        />
        <Button colorScheme="blue" isLoading={isLoading} type="submit">
          Agregar
        </Button>
      </form>
    </>
  );
};

export default memo(Header);
