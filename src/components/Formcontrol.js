import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputcontrol from "./Inputcontrol";
import Selectcontrol from "./Selectcontrol";

function Formcontrol() {
  const [users, setUsers] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [initialValues, setinitialValues] = useState({
    title: "",
    body: "",
    user: "",
  });

  // const [formValue,setFormValue]=useState(initialValues)
  useEffect(() => {
    getUsers();
  }, []);

  const handleForm = (field) => {
    const obj = { ...initialValues, ...field };
    setinitialValues(obj);
    console.log(obj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const onSubmit = () => {
    setIsSubmit(true);
    if (initialValues.title && initialValues.body && initialValues.user) {
      axios
      .post("https://jsonplaceholder.typicode.com/posts", initialValues)
      .then((response) => {
        console.log(response);
      });
    }
    
  };

  const getUsers = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      // console.log(response.data);
      const detail = response.data.map((el, i) => {
        return { name: el.title, id: el.id };
      });
      setUsers(detail);
    });
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title text-center">FORM</h5>
        <form
          onSubmit={handleSubmit}
          className="row g-3 needs-validation"
          
        >
          <Inputcontrol
            heading="Title"
            controlName="title"
            value={initialValues.title}
            onChange={handleForm}
            isSubmit={isSubmit}
          />
          <Inputcontrol
            heading="Body"
            controlName="body"
            value={initialValues.body}
            onChange={handleForm}
            isSubmit={isSubmit}
          />
          <Selectcontrol
            options={users}
            onChange={handleForm}
            controlName="user"
            isSubmit={isSubmit}
            value={initialValues.user}
          />
          <div className="btn-container">
            <button
              type="submit"
              onClick={() => {
                onSubmit();
              }}
              className="btn btn-primary text-center"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formcontrol;
