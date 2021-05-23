import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { useState } from "react";
// eslint-disable-next-line
import tw from "twin.macro";
import useFocus from "../useFocus";

const Header = () => {
  const [inputRef, setInputFocus] = useFocus();

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const add = () => {
    if (value.trim() !== "") {
      alert(value);
    } else {
      setInputFocus();
    }
  };

  return (
    <div tw="flex items-center space-x-3">
      <Input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        placeholder="Ingrese una nueva tarea"
        size="sm"
      />
      <Button onClick={add} colorScheme="blue">
        Agregar
      </Button>
    </div>
  );
};

export default Header;
