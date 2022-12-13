// layout for message shown
import { AiOutlineClose } from "react-icons/ai";
import Spinner from "./Spinner";

const Message = ({ msg, setMsg, spinner, classes }) => {
  if (!msg) return <></>;

  return (
    <div
      className={
        "bg-gray-200 dark:bg-gray-800 flex flex-row flex-wrap justify-center mt-4 p-3 overflow-auto rounded-md shadow-md mx-auto break-all max-h-[33%] w-[90%] sm:w-[66%] lg:w-[40%] " +
        classes
      }
    >
      <Spinner spinner={spinner} />
      <div className={"flex-auto " + (spinner ? "pl-2" : null)}>{msg}</div>
      <button title="Close Message" onClick={() => setMsg("")}>
        <AiOutlineClose className="ml-2 flex-auto text-2xl" />
      </button>
    </div>
  );
};

export default Message;
