import { Button } from "@chakra-ui/button";

import tw, { styled, theme } from "twin.macro";

const StyledInput = styled.input`
  color: orange;
  background-color: ${theme`colors.red.500`};
  ${tw`border`}
  ${({ hasBorder }) => !!hasBorder && tw`border-purple-500`}
`;
const Input = () => <StyledInput hasBorder />;

function App() {
  return (
    <div>
      <h1>hii</h1>
      <Input />
      <Button colorScheme="blue">Button</Button>
    </div>
  );
}

export default App;
