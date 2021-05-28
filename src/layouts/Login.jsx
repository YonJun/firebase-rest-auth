import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
// eslint-disable-next-line
import tw from "twin.macro";
import { useLoginMutation } from "../services/hooks/public";
import { useFirebaseApp } from "reactfire";
import rootFirebase from "firebase/app";

const Login = () => {
  const toast = useToast();
  const firebase = useFirebaseApp();

  const [fields, setFields] = useState({
    email: "user5@peru.pe",
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

  /**   @param {import("react").ChangeEvent<HTMLFormElement>} e */
  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      {
        email: fields.email,
        password: fields.pass,
      },
      {
        onSuccess(resp) {
          // console.log("onSuccess", JSON.stringify(resp, null, 2));
          // set_payload(resp);
        },
        onError(error) {
          const m =
            error.code === "auth/user-not-found"
              ? "Usuario no encontrado"
              : error.message;
          toast({
            title: m,
            status: "error",
            isClosable: true,
          });
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
      <Button
        isFullWidth
        colorScheme="red"
        onClick={() => {
          firebase
            .auth()
            .signInWithPopup(new rootFirebase.auth.GoogleAuthProvider());
        }}>
        Iniciar sesión con Google
      </Button>
      <Button
        isFullWidth
        colorScheme="facebook"
        onClick={() => {
          firebase
            .auth()
            .signInWithPopup(new rootFirebase.auth.FacebookAuthProvider())
            .catch((e) => console.log("FacebookAuth error", e));
        }}>
        Iniciar sesión con Facebook
      </Button>
    </form>
  );
};

export default Login;
