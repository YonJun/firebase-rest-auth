// eslint-disable-next-line
import tw from "twin.macro";
import { Container } from "@chakra-ui/layout";

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
import { AuthCheck } from "reactfire";

function App() {
  console.log("render App");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <Container maxW="container.sm" centerContent>
      <div tw="py-10 w-full ">
        <AuthCheck
          fallback={
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
          }>
          {
            <>
              <div tw="space-y-6">
                <Header />
                <List />
              </div>
            </>
          }
        </AuthCheck>
      </div>
    </Container>
  );
}

export default App;
