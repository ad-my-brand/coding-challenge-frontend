import "./App.css";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/NavBar/NavBar";
import NewPost from "./components/NewPost/NewPost";
import { Routes, Route } from "react-router-dom";
import Alert from "./components/Alert/Alert";

function App() {
  const initialAlertState = { state: false, type: "", message: "" };
  const [appError, setAppError] = useState(initialAlertState);

  useEffect(() => {
    if (appError.state) {
      setTimeout(() => {
        setAppError(initialAlertState);
      }, 2000);
    }
  }, [appError.state]);

  const appErrorHandler = (state, type, errorMessage = "") => {
    setAppError((prevState) => {
      return {
        state: state,
        type: type,
        message: errorMessage,
      };
    });
  };

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route
          path="/new-post"
          element={<NewPost setAppError={appErrorHandler} />}
        />
        <Route path="/" element={<HomePage setAppError={appErrorHandler} />} />
      </Routes>

      <Alert appError={appError} dismissAction={() => appErrorHandler(false)} />
    </div>
  );
}

export default App;
