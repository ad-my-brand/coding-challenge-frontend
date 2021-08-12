import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "axios";
import Map from "./Map";
import { ModalFactory, Spinner } from "../utils";

const UserForm = () => {
  const [userList, setUserList] = useState([]);
  const [pageLoading,setPageLoading]=useState(false)
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const [messageType, setMessageType] = useState("");
  const [location, setLocation] = useState({ lng: -70.9, lat: 42.35 });

  const validate = Yup.object({
    name: Yup.string().required("Name is required..."),
    userId: Yup.number().required("userId is required..."),
    title: Yup.string()
      .max(15, "Must be 15 character or less")
      .required("Title is required..."),
    body: Yup.string()
      .min(5, "Must be 15 character or more")
      .required("Body is required..."),
  });

  useEffect(() => {
    async function fetchUserData() {
      try {
        setPageLoading(true)
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        const { data } = response;
        setPageLoading(false)
        console.log("Data", data);
        if (data.length > 0) {
          const userListOptions = data.map((item) => {
            const { name, id, username, email, address } = item;
            return {
              label: name,
              value: id,
              username: username,
              email: email,
              location: address.geo,
            };
          });
          setUserList(userListOptions);
          return;
        }
      } catch (error) {
        setShowModal(true);
        setPageLoading(false)
        setMessageType("error");
        setMessageTitle("Sorry!!, Some Error Occurred");
        setMessageBody(`Status Code ${error.response.status}`);
      }
    }
    fetchUserData();
  }, []);
  if (pageLoading) {
    return <Spinner/>;
  }
  return (
    <section className="flex flex-col md:flex-row h-screen py-2 md:py-8 mx-auto container">
      <Map location={location} />
      <div className="px-2 md:px-16 md:w-1/2 mt-4 md:mt-4 space-y-2">
        <code className="font-bold text-xl md:text-3xl mb-2">
          Fill the form...
        </code>
        <p className="opacity-80 text-lg">
          <code>
            Filling the form will result displaying of relevant data from json
            placeholder
          </code>
        </p>
        <Formik
          initialValues={{
            name: null,
            userId: null,
            title: "",
            body: "",
          }}
          validationSchema={validate}
          onSubmit={async (values, actions) => {
            try {
              setSubmitting(true);
              console.log(values);

              const response = await axios.post(
                "https://jsonplaceholder.typicode.com/posts",
                values
              );
              const { data, status } = response;
              setSubmitting(false);
              if (status == 201) {
                const { title, id, userId } = data;
                setShowModal(true);
                setMessageType("success");
                setMessageTitle("Form Submitted Successfully");
                setMessageBody(
                  `User has been created with following info id : ${id} ,User Id : ${userId} Title: ${title}`
                );
              }
              actions.resetForm()
              //console.log(response)
            } catch (error) {
              actions.resetForm()
              setSubmitting(false);
              console.log(typeof error, error.response);
              setShowModal(true);
              setMessageType("error");
              setMessageTitle("Sorry!!, Some Error Occurred");
              setMessageBody(`Status Code ${error.response.status}`);
              // setMessageBody(error.toString())
            }
          }}
        >
          {(props) => (
            <div>
              <Form className="flex flex-col space-y-2 justify-center">
                <TextField
                  label="Name"
                  type="select"
                  placeholder="Enter name..."
                  options={userList}
                  setLocation={setLocation}
                  setFieldValue={props.setFieldValue}
                  errors={props.errors}
                  values={props.values}
                  name="name"
                />
                <TextField
                  label="Title"
                  type="text"
                  placeholder="Enter title..."
                  name="title"
                />
                <TextField
                  label="Body"
                  type="textarea"
                  placeholder="Enter body..."
                  name="body"
                />
                <div className="flex py-2">
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className=" bg-green-600 font-semibold rounded  text-white text-sm font-semibold  shadow-xl p-2 md:px-4 md:p-3 hover:bg-green-700"
                    >
                      {isSubmitting ? <Spinner /> : "Submit"}
                    </button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
      {showModal ? (
        <ModalFactory
          show={showModal}
          variant={messageType}
          setShow={setShowModal}
          messageTitle={messageTitle}
          messageBody={messageBody}
        />
      ) : null}
    </section>
  );
};
export default UserForm;
