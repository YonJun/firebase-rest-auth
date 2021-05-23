import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
// eslint-disable-next-line
import tw from "twin.macro";
import { useLoginMutation } from "../services/hooks/public";

const Login = () => {
  const toast = useToast();

  const [fields, setFields] = useState({
    email: "user1@hotmail.pe",
    pass: "123456",
  });

  const { mutate, isLoading } = useLoginMutation();

  /**
   * @param {import("react").ChangeEvent<HTMLInputElement>} event
   */
  const handleChange = (event) =>
    setFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

  /**
   * @param {import("react").ChangeEvent<HTMLFormElement>} e
   */
  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        email: fields.email,
        password: fields.pass,
      },
      {
        onSuccess(resp) {
          console.log("resp", JSON.stringify(resp));
          // console.log(resp);
        },
        onError(error) {
          // console.log("onError", error);
          if (typeof error === "string") {
            const e =
              error.charAt(0).toUpperCase() + error.slice(1).toLowerCase();

            toast({
              title: e.replace(/_/g, " "),
              status: "error",
              isClosable: true,
            });
          }
        },
      },
    );
  };

  return (
    <form tw="space-y-5" onSubmit={onSubmit}>
      <h1 tw="text-center">Login</h1>
      <Input
        type="email"
        name="email"
        value={fields.email}
        onChange={handleChange}
        placeholder="Correo"
        size="sm"
        required
      />
      <Input
        name="pass"
        value={fields.pass}
        onChange={handleChange}
        type="password"
        placeholder="Contraseña"
        size="sm"
        required
      />
      <Button
        isFullWidth
        colorScheme="blue"
        type="submit"
        isLoading={isLoading}>
        Iniciar sesión
      </Button>
    </form>
  );
};

export default Login;