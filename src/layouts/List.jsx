// eslint-disable-next-line
import tw from "twin.macro";
import { Fragment } from "react";
import Task from "../components/Task";
import { useTodoQuery } from "../services/hooks/private";
const List = () => {
  const { isLoading, error, data } = useTodoQuery();
  if (isLoading) return <h1>Cargando...</h1>;
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (data)
    return (
      <Fragment>
        <div tw="space-y-5">
          {data.map((task) => (
            <Task
              key={task.ID}
              description={task.description}
              done={task.done}
            />
          ))}
        </div>
      </Fragment>
    );

  return <h1>Sin Resultados</h1>;
};

export default List;
