// eslint-disable-next-line
import tw, { css } from "twin.macro";
import "../types/service";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useEffect, useState } from "react";
import { Input, useBoolean } from "@chakra-ui/react";
import useFocus from "../customHooks";
import { useUpdateTodoMutation } from "../services/hooks/private";

/** @type {(props: Task) => JSX.Element} */
const Task = ({ description, done, ID }) => {
  const [inputRef, setInputFocus] = useFocus();
  const { mutate, isLoading } = useUpdateTodoMutation();
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
      mutate(
        {
          ID,
          task: {
            description: text,
          },
        },
        {
          onSuccess(resp) {
            console.log("onSuccess resp", resp);
            set_isEdit.off();
          },
          onError(err) {
            console.log("onError err", err);
          },
        },
      );
    } else {
      setInputFocus();
    }
  };
  const onRemove = () => {
    if (window.confirm("¿Estas seguro que quieres eleminar esta tarea?")) {
      alert("done");
    }
  };

  /**   @param {import("react").ChangeEvent<HTMLInputElement>} e */
  const handleCheckboxChange = (e) => {
    const newFlag = e.target.checked;
    console.log("new flag", newFlag);
    mutate(
      {
        ID,
        task: {
          done: newFlag,
        },
      },
      {
        onSuccess(resp) {
          console.log("onSuccess resp", resp);
          setFlag(newFlag);
        },
        onError(err) {
          console.log("onError err", err);
        },
      },
    );
  };
  return (
    <div>
      <div tw="flex items-center">
        <Checkbox
          isDisabled={isLoading}
          isChecked={flag}
          onChange={handleCheckboxChange}
        />
        {isEdit ? (
          <Input
            disabled={isLoading}
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
            isLoading={isLoading}
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
