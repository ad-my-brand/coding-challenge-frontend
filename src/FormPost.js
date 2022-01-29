import React from "react";
import axios from "axios";

const validateData = (title, message) => {
  if (title.length == 0) return false;
  if (message.length == 0) return false;
  return true;
};

const submitForm = (e, userId) => {
  e.preventDefault();
  const payload = {
    title: e.target.parentElement.title.value,
    body: e.target.parentElement.message.value,
    userId: userId,
  };
  if (!validateData(payload.title, payload.body)) {
    alert("Please fill all fields!");
    return;
  }
  axios
    .post("https://jsonplaceholder.typicode.com/posts", payload)
    .then((response) => {
      alert(
        `Response Send!\nResponse Data: \n{\n  title:${response.data.title},\n  body:${response.data.body},\n  userId: ${response.data.userId}\n}`
      );
      e.target.parentElement.title.value = "";
      e.target.parentElement.message.value = "";
    })
    .catch(function (error) {
      alert(`Error occured: ${error}`);
    });
};

export default function FormPost({ userId }) {
  return (
    <form className="postForm">
      <label htmlFor="title">Title:</label>
      <input type="text" name="title" required></input>
      <label htmlFor="message">Message:</label>
      <textarea type="text" name="message" rows={5}></textarea>
      <button type="submit" onClick={(e) => submitForm(e, userId)}>
        Submit
      </button>
    </form>
  );
}
