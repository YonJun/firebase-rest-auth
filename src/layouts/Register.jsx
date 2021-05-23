// eslint-disable-next-line
import tw from "twin.macro";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Fragment, useState } from "react";
import { Button } from "@chakra-ui/button";
import { useRegisterMutation } from "../services/hooks/public";
import { useToast } from "@chakra-ui/toast";

const Register = () => {
  const [fields, setFields] = useState({
    email: "user1@hotmail.pe",
    pass: "123456",
  });
  const toast = useToast();

  const { mutate, isLoading } = useRegisterMutation();

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
    // console.log(fields);
    mutate(
      { email: fields.email, password: fields.pass },
      {
        onSuccess(resp) {
          console.log("onSuccess", JSON.stringify(resp));
        },
        onError(err) {
          console.log("onError", err);
          if (typeof err === "string") {
            const e = err.charAt(0).toUpperCase() + err.slice(1).toLowerCase();

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
    <Fragment>
      <form onSubmit={onSubmit} tw="space-y-5">
        <FormControl>
          <FormLabel htmlFor="registerEmail">Correo</FormLabel>
          <Input
            value={fields.email}
            name="email"
            id="registerEmail"
            placeholder="Ingrese su correo"
            type="email"
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="registerPass">Contraseña</FormLabel>
          <Input
            value={fields.pass}
            name="pass"
            id="registerPass"
            placeholder="Ingrese su contraseña"
            type="password"
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button
          type="submit"
          colorScheme="blue"
          isFullWidth
          isLoading={isLoading}>
          Enviar
        </Button>
      </form>
    </Fragment>
  );
};

export default Register;
