import { useState, useEffect, useRef, useCallback } from "react";
import client from "../../api/client";
import InputField from "../UI/InputField";
import Button from "../UI/Button";
import Notification from "../UI/notification/Notification";

type Post = {
  title: string;
  body: string;
  userId: 1;
};

const PostForm = () => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postBody, setPostBody] = useState<string>("");
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState({
    status: false,
    message: "",
    showToast: false,
  });
  const titleInput = useRef<HTMLInputElement>(null);

  const sendPost = useCallback(async () => {
    try {
      const { data } = await client.post("posts", post);
      if (data) {
        setError({
          status: false,
          message: "Successfully added post!",
          showToast: true,
        });
      }
    } catch (error) {
      setError({
        status: true,
        message: "Error: Failed to send post",
        showToast: true,
      });
    } finally {
      setPostTitle("");
      setPostBody("");
    }
  }, []);

  useEffect(() => {
    if (post) {
      sendPost();
    }
  }, [post, sendPost]);

  useEffect(() => {
    setTimeout(() => {
      setError({
        ...error,
        showToast: false,
      });
    }, 1200);
  }, [error]);

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
      setError({
        status: true,
        message: "Title and Body can not be blank.",
        showToast: true,
      });
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
      {!error.status && post && error.showToast && (
        <Notification label={error.message} success={true} />
      )}
      {error.status && error.showToast && (
        <Notification label={error.message} success={false} />
      )}
    </section>
  );
};

export default PostForm;
