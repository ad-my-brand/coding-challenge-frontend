import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./NewPost.css";
import LoadOverlay from "../LoadOverlay/LoadOverlay";

let isTitleTouched = false;
let isBodyTouched = false;

function NewPost(props) {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const [uploadingData, setUploadingData] = useState(false);

  const [inputError, setInputError] = useState({
    title: false,
    body: false,
  });

  const postChangeHandler = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    const updatedPost = {
      ...post,
      [inputName]: inputValue,
    };
    if (inputName === "title") {
      isTitleTouched = true;
    }
    if (inputName === "body") {
      isBodyTouched = true;
    }
    setPost(updatedPost);
  };

  const homeRedirectHandler = () => {
    let choice = true;
    if (post.title !== "" || post.body !== "") {
      choice = window.confirm("Are you sure?\nYour changes will not be saved.");
    }
    if (choice) {
      navigate("/");
    }
  };

  const postUploadFormHandler = (event) => {
    event.preventDefault();
    if (inputError.title || inputError.body) {
      props.setAppError(
        true,
        "warning",
        "Please fill out all the required fields."
      );
      return;
    }
    const uploadPost = () => {
      return new Promise(async (resolve, reject) => {
        try {
          if (post.title.trim() === "" || post.body.trim() === "") {
            return reject("Please fill out all the fields!");
          }

          setUploadingData(true);

          const postDataResponse = await axios({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            data: {
              userId: state.userId,
              title: post.title,
              body: post.body,
            },
          });

          const postUploadData = postDataResponse.data;
          console.log(postUploadData);
          resolve("Post uploaded successfully");
          setUploadingData(false);
        } catch (error) {
          setUploadingData(false);
          return reject("Network Error, Task failed");
        }
      });
    };

    uploadPost()
      .then((msg) => {
        props.setAppError(true, "success", msg);
      })
      .catch((msg) => {
        props.setAppError(true, "warning", msg);
      });

    setPost({ title: "", body: "" });
    isTitleTouched = false;
    isBodyTouched = false;
  };

  useEffect(() => {
    if (isBodyTouched === true) {
      if (post.body === "") {
        console.log("Body Invalid");
        setInputError((prevState) => {
          return {
            ...prevState,
            body: true,
          };
        });
      } else if (post.body !== "") {
        setInputError((prevState) => {
          return {
            ...prevState,
            body: false,
          };
        });
      }
    }

    if (isTitleTouched) {
      if (post.title === "") {
        setInputError((prevState) => {
          return {
            ...prevState,
            title: true,
          };
        });
      } else if (post.title !== "") {
        setInputError((prevState) => {
          return {
            ...prevState,
            title: false,
          };
        });
      }
    }
  }, [post.title, post.body]);

  return (
    <div className="NewPostForm__Container">
      <form onSubmit={postUploadFormHandler}>
        <div className="formGrid">
          <div className="formGrid__NameRowWrapper">
            <div className="formGrid__Cell">
              <label htmlFor="title" className="form-label">
                Title:{" "}
              </label>
            </div>

            <div className="formGrid__Cell">
              <div>
                <input
                  type="text"
                  maxLength="200"
                  placeholder="Add a title"
                  value={post.title}
                  name="title"
                  id="title"
                  size="60"
                  onChange={postChangeHandler}
                  className="form-control"
                />
              </div>
              <div>
                <p className="warningText">
                  {inputError.title && "Enter a valid title !"}
                </p>
              </div>
            </div>
          </div>

          <div className="formGrid__NameRowWrapper">
            <div className="formGrid__Cell">
              <label htmlFor="body" className="form-label">
                Body:{" "}
              </label>
            </div>
            <div className="formGrid__Cell">
              <div>
                <textarea
                  placeholder="Add some description of the post"
                  value={post.body}
                  onChange={postChangeHandler}
                  name="body"
                  rows="10"
                  cols="62"
                  id="body"
                  className="form-control"
                ></textarea>
              </div>
              <div>
                <p className="warningText">
                  {inputError.body && "Enter a valid description !"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="actionButtonWrapper">
          <button className="uploadButton actionButton ">Upload Post</button>
          <button
            type="button"
            className="homeRedirectButton btn btn-danger actionButton"
            onClick={homeRedirectHandler}
          >
            Return to Home
          </button>
        </div>
      </form>
      {/* Success alert */}
      {uploadingData && <LoadOverlay />}
    </div>
  );
}

export default NewPost;
