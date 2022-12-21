import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState, createContext, useEffect } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { FormControl } from "./FormControl";
import Map from "./Map";
import formStyles from "../styles/Form.module.css";

export const FormContext = createContext();

function Form({ users }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    id: null,
  });
  const [center, setCenter] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const formControlValidation = (touched, fieldValue) => {
    if (touched && !fieldValue) return true;
    return false;
  };

  const HandleSubmit = async () => {
    setSubmit(true);
  };

  const postData = async (data) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  if (submit && form.id) {
    postData(form);
    if (success) {
      return <p className={formStyles.successMessage}>Submission Successful</p>;
    }
    if (error) {
      return <p className={formStyles.errorMessage}>An Error Occurred</p>;
    }
  }

  return (
    <MDBContainer fluid>
      <form>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <h3 className="text-uppercase text-center mb-4">
                  Form Control
                </h3>
                <div className="grey-text">
                  <FormContext.Provider
                    value={{
                      form,
                      setForm,
                      users,
                      center,
                      setCenter,
                      submit,
                      setSubmit,
                    }}
                  >
                    <FormControl
                      label="Select"
                      validation={formControlValidation}
                      error="This is a required field"
                    />
                  </FormContext.Provider>
                  {center && <Map center={center} />}
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Title"
                    type="text"
                    required
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Body"
                    type="text"
                    required
                  />
                  <MDBBtn
                    className="mb-4"
                    size="lg"
                    type="button"
                    onClick={HandleSubmit}
                  >
                    Submit
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </form>
    </MDBContainer>
  );
}

export default Form;
