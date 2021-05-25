// eslint-disable-next-line
import tw, { css } from "twin.macro";
import "../types/service";
import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { useRef, useEffect, useState } from "react";
import { Input, useBoolean } from "@chakra-ui/react";
import useFocus from "../customHooks";
import {
  useDeleteTodoMutation,
  useTodoQuery,
  useUpdateTodoMutation,
} from "../services/hooks/private";

/** @type {(props: Task) => JSX.Element} */
const Task = ({ description, done, ID }) => {
  const [inputRef, setInputFocus] = useFocus();
  const [text, set_text] = useState(description);
  const textInput = useRef(description);
  const [flag, setFlag] = useState(done);
  const [isEdit, set_isEdit] = useBoolean();
  const { mutate, isLoading } = useUpdateTodoMutation();
  const { mutate: deleteMutate, isLoading: deleteIsLoading } =
    useDeleteTodoMutation();
  const { refetch } = useTodoQuery();
  console.log(textInput.current);

  useEffect(() => {
    if (isEdit) {
      setInputFocus();
    }
  }, [isEdit]);

  const onSave = () => {
    const txt = text.trim();

    if (txt !== "") {
      if (txt === textInput.current) {
        set_text(textInput.current);
        set_isEdit.off();
      } else
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
              textInput.current = txt;
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
      // alert("done");
      deleteMutate(ID, {
        onSuccess() {
          refetch();
        },
        onError(err) {
          console.log("deleteMutate onError err", err);
        },
      });
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
              onClick={() =>
                handleCheckboxChange({ target: { checked: !flag } })
              }
              css={[
                tw`hover:cursor-pointer truncate select-none`,
                isLoading && tw`pointer-events-none`,
                flag && tw`line-through`,
              ]}>
              {text}
            </p>
          </div>
        )}

        {isEdit ? (
          <>
            <Button
              size="xs"
              colorScheme="blue"
              variant="outline"
              onClick={() => {
                set_text(textInput.current);
                set_isEdit.off();
              }}>
              X
            </Button>
            <Button
              isLoading={isLoading}
              onClick={onSave}
              size="xs"
              colorScheme="blue"
              variant="outline">
              Guardar
            </Button>
          </>
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
          isLoading={deleteIsLoading}
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
