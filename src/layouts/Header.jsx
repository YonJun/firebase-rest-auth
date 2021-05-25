// eslint-disable-next-line
import tw from "twin.macro";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { userStore } from "../authStore";
import { useAddTodoMutation, useTodoQuery } from "../services/hooks/private";

const Header = () => {
  const { refetch } = useTodoQuery();
  const { mutate, isLoading } = useAddTodoMutation();
  const user = userStore((s) => s.user);

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
          console.log("onSuccess resp", resp);
          refetch();
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
      <h1>{user.email}</h1>
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

export default Header;
