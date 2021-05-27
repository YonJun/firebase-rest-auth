// eslint-disable-next-line
import tw from "twin.macro";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { memo, useState } from "react";
// import { useAddTodoMutation, useTodoQuery } from "../services/hooks/private";
import { useUser, useAuth } from "reactfire";
import { useMutation, useQueryClient } from "react-query";
import { POST_AddTodo } from "../services/promises/private";

const Header = () => {
  // console.log("render Header");
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(POST_AddTodo, {
    // When mutate is called:
    onMutate: async (todo) => {
      // await queryClient.cancelQueries("GET_listTodo");

      const previousValue = queryClient.getQueryData("GET_listTodo");

      queryClient.setQueryData("GET_listTodo", (old) => [...old, todo]);

      return previousValue;
    },
    // On failure, roll back to the previous value
    onError: (err, variables, previousValue) =>
      queryClient.setQueryData("GET_listTodo", previousValue),
    // After success or failure, refetch the GET_listTodo query
    onSettled: () => {
      queryClient.invalidateQueries("GET_listTodo");
    },
  });
  const { data: user } = useUser();
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
