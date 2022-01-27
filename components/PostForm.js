import { React, useState } from "react";

import TextInput from "./shared/TextInput";
import TextArea from "./shared/TextArea";
import { toast } from "react-toastify";
const PostForm = ({ id }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [valid, setValid] = useState(false);

  const onInputChange = (value) => {
    setTitle(value);
  };

  const onTextChange = (value) => {
    setBody(value);
  };

  const isValidate = () => {
    if (title === "" || body === "") {
      toast.warning("Please fill out the required field");
    } else {
      setValid(true);
      postUser();
    }
  };

  const postUser = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          body: body,
          userId: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      console.log(data);
      toast.success("Successfully Posted!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form className="container px-12 pt-8 pb-2 mx-auto flex flex-col border-2 rounded-sm w-96 bg-slate-50 border-slate-100 shadow-sm shadow-slate-300F">
        <h2 className="font-serif text-2xl uppercase rounded-lg mx-auto bg-neutral-300/100 p-2 my-2 mb-12">
          Post Form
        </h2>

        <TextInput
          type={"text"}
          onChange={onInputChange}
          id={id}
          labelText={"Title"}
          required
          value={valid ? "" : title}
        />

        <TextArea
          type={"text"}
          onChange={onTextChange}
          id={id}
          labelText={"Body"}
          required
          value={valid ? "" : body}
        />

        <button
          className="font-serif text-white px-4 py-2 font-semibold bg-zinc-800 mx-auto rounded-xl shadow-sm shadow-slate-300"
          onClick={(e) => {
            e.preventDefault();
            isValidate();
          }}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PostForm;
