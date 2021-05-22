import { Button } from "@chakra-ui/button";
import { Container, VStack } from "@chakra-ui/layout";
import { useState } from "react";
// eslint-disable-next-line
import tw from "twin.macro";
import Header from "./layouts/Header";
import List from "./layouts/List";

function App() {
  const [user, set_user] = useState(null);
  return (
    <VStack>
      <Container maxW="container.md">
        {user ? (
          <div tw="py-10 space-y-6">
            <Header />
            <List />
          </div>
        ) : (
          <div>
            <Button>sign in</Button>
          </div>
        )}
      </Container>
    </VStack>
  );
}

export default App;
