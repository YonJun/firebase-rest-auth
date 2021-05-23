import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useEffect, useState } from "react";
import { Input, useBoolean } from "@chakra-ui/react";

// eslint-disable-next-line
import tw, { css } from "twin.macro";
import useFocus from "../useFocus";

/**
 * @typedef {object} Props
 * @property {boolean} done
 * @property {string} description
 */

/**
 * @type {(props: Props) => JSX.Element}
 * */

const Task = ({ description, done }) => {
  const [inputRef, setInputFocus] = useFocus();

  const [text, set_text] = useState(description);
  const [flag, setFlag] = useState(done);
  const [isEdit, set_isEdit] = useBoolean();

  useEffect(() => {
    if (isEdit) {
      setInputFocus();
    }
  }, [isEdit]);

  const onSave = () => {
    if (text.trim() !== "") {
      set_isEdit.off();
    } else {
      setInputFocus();
    }
  };
  const onRemove = () => {
    if (window.confirm("¿Estas seguro que quieres eleminar esta tarea?")) {
      alert("done");
    }
  };

  return (
    <div>
      <div tw="flex items-center">
        <Checkbox
          isChecked={flag}
          onChange={(e) => setFlag(e.target.checked)}
        />
        {isEdit ? (
          <Input
            ref={inputRef}
            value={text}
            onChange={(event) => set_text(event.target.value)}
            placeholder="Ingresa una descripcion"
            size="xl"
          />
        ) : (
          <div tw="flex-1 min-w-0">
            <p
              onClick={() => setFlag((prev) => !prev)}
              css={[
                tw`hover:cursor-pointer truncate select-none`,
                flag && tw`line-through`,
              ]}>
              {text}
            </p>
          </div>
        )}

        {isEdit ? (
          <Button
            onClick={onSave}
            size="xs"
            colorScheme="blue"
            variant="outline">
            Guardar
          </Button>
        ) : (
          <Button
            onClick={set_isEdit.on}
            size="xs"
            colorScheme="orange"
            variant="outline">
            Editar
          </Button>
        )}
        <Button
          size="xs"
          colorScheme="red"
          variant="outline"
          onClick={onRemove}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default Task;
