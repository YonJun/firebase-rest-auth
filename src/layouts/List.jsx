// eslint-disable-next-line
import tw from "twin.macro";
import { Fragment } from "react";
import Task from "../components/Task";
const List = () => {
  return (
    <Fragment>
      <div tw="space-y-5">
        <Task description="Termnar firebase-rest-auth" done={true} />
        <Task
          description="Termnar firebase-rest-auth Termnar firebase-rest-authTermnar firebase-rest-authTermnar firebase-rest-authTermnar firebase-rest-auth"
          done={false}
        />
        <Task description="Termnar firebase-rest-auth" done={true} />
      </div>
    </Fragment>
  );
};

export default List;
