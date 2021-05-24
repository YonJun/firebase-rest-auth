// eslint-disable-next-line
import tw from "twin.macro";
import { Container } from "@chakra-ui/layout";
import { authStore } from "./authStore";
import Header from "./layouts/Header";
import List from "./layouts/List";
import Login from "./layouts/Login";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
} from "@chakra-ui/react";
import Register from "./layouts/Register";
import UserProvider from "./components/UserProvider";

function App() {
  const payload = authStore((s) => s.payload);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Container maxW="container.sm" centerContent>
      <div tw="py-10 w-full ">
        {payload ? (
          <UserProvider token={payload.idToken}>
            <div tw="space-y-6">
              <Header />
              <List />
            </div>
          </UserProvider>
        ) : (
          <>
            <Login />
            <div tw="mt-5">
              <Button
                ref={btnRef}
                colorScheme="gray"
                onClick={onOpen}
                isFullWidth>
                Registrarse
              </Button>
              <Drawer
                size="sm"
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader />
                  <DrawerBody>
                    <Register />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

export default App;
