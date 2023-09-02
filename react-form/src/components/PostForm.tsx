import { useState, useEffect, useRef } from "react";
import client from "../api/client";
import InputField from "./UI/InputField";
import Button from "./UI/Button";
import Notification from "./UI/Notification";

type Post = {
  title: string;
  body: string;
  userId: 1;
};

const PostForm = () => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const titleInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const sendPost = async () => {
      try {
        const { data } = await client.post("posts", post);
        console.log(data);
        setError(false);
      } catch (error) {
        setError(true);
        setErrorMsg("Error: Failed to send post");
      } finally {
        setPostTitle("");
        setPostBody("");
        setShowToast(true);
      }
    };

    if (post) {
      sendPost();
    }
  }, [post]);

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 1200);
  }, [showToast]);

  const setPostTitleHandler = (e: React.ChangeEvent) => {
    const titleField = e.target as HTMLInputElement;
    setPostTitle(titleField.value);
  };

  const setPostBodyHandler = (e: React.ChangeEvent) => {
    const bodyField = e.target as HTMLInputElement;
    setPostBody(bodyField.value);
  };

  const submitPostHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (postTitle && postBody) {
      const post: Post = {
        title: postTitle,
        body: postBody,
        userId: 1,
      };

      setPost(post);
    } else {
      setError(true);
      setErrorMsg("Title and Body can not be blank");
      setShowToast(true);
    }
  };

  const validateTitle = (error: string) => {
    if (postTitle === "") {
      return error;
    }

    return "";
  };

  const validateBody = (error: string) => {
    if (postBody === "") {
      return error;
    }

    return "";
  };

  return (
    <section className="mt-8">
      <h2 className="text-lg md:text-xl font-bold text-center text-blue-800 mb-6 bg-blue-100 border-b-2 border-blue-300 py-2">
        Add a Post
      </h2>
      <InputField
        type="text"
        label="Title"
        value={postTitle}
        inputRef={titleInput}
        onChange={setPostTitleHandler}
        validateInput={validateTitle}
      />
      <InputField
        type="text"
        label="Body"
        value={postBody}
        onChange={setPostBodyHandler}
        validateInput={validateBody}
      />
      <Button title="Send Post" onClick={submitPostHandler} />
      {!error && post && showToast && (
        <Notification label="Successfully added post!" success={true} />
      )}
      {error && showToast && <Notification label={errorMsg} success={false} />}
    </section>
  );
};

export default PostForm;
