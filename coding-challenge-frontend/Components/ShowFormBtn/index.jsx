import React from "react";
import { useStateContext } from "../../context/StateContext";
const ShowForm = () => {
  const { setshowForm } = useStateContext();
  return (
    <button
      onClick={() => setshowForm(true)}
      style={{
        zIndex: "2000",
        position: "absolute",
        bottom: "10%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "200px",
      }}
      type="button"
    >
      Open Form
    </button>
  );
};

export default ShowForm;
