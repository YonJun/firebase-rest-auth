// eslint-disable-next-line
import tw from "twin.macro";
import { Container } from "@chakra-ui/layout";
import authStore from "./authStore";
import Header from "./layouts/Header";
import List from "./layouts/List";
import Login from "./layouts/Login";

function App() {
  const token = authStore((s) => s.token);
  return (
    <Container maxW="container.sm" centerContent>
      <div tw="py-10 w-full ">
        {token ? (
          <div tw="space-y-6">
            <Header />
            <List />
          </div>
        ) : (
          <Login />
        )}
      </div>
    </Container>
  );
}

export default App;
