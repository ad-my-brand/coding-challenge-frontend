import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import axios from "axios";

const required = (value) => (value ? undefined : "Required");

const CreatePost = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const handlePostSubmit = (e) => {
    console.log("Post", e);
    const submitNewPost = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const postDataResponse = await axios({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            data: {
              userId: state.userId,
              title: e.title,
              body: e.body,
            },
          });

          const postUploadData = postDataResponse.data;
          console.log("post Data", postUploadData);
          resolve("Post uploaded successfully");
        } catch (error) {
          return reject("Network Error, Task failed");
        }
      });
    };
    submitNewPost()
      .then((text) => {
        console.log("success", text);
      })
      .catch((error) => {
        console.log("warning -", error);
      });

    setPost({ title: "", body: "" });
  };
  const handleRedirect = () => {
    let display = true;
    if (post.title !== "" || post.body !== "") {
      display = window.confirm(
        "Are you sure?\nYour changes will not be saved."
      );
    }
    if (display) {
      navigate("/");
    }
  };
  return (
    <Form
      onSubmit={() => {
        setPost({
          title: "",
          body: "",
        });
      }}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} className="ui form error">
          <div className="ui container">
            <Field name="title" validate={required}>
              {({ input, meta }) => (
                <div className="item">
                  <label className="ui green label">Name :</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="Enter a title"
                    className="ui input"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="body" validate={required}>
              {({ input, meta }) => (
                <div className="item">
                  <label className="ui green label">Body :</label>
                  <textarea
                    {...input}
                    type="text"
                    placeholder="Add some body description"
                    className="ui input"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="ui celled list">
              <button
                className="ui primary button "
                onClick={() => handlePostSubmit(values)}
              >
                Upload Post
              </button>
              <button
                className="ui secondary button"
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
              <button className="ui red button" onClick={handleRedirect}>
                Return to Home
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};

export default CreatePost;
