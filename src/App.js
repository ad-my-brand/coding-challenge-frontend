import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import CreatePost from "./components/CreatePost";
import "./App.css";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/createNewPost" element={<CreatePost />} />
      </Routes>
    </div>
  );
};

export default App;
