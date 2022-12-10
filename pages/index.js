import React from "react";
import IndexMap from "../Components/Map";
import Form from "../Components/Form";
import { useStateContext } from "../context/StateContext";
import ShowForm from "../Components/ShowFormBtn";
import { toast } from "react-hot-toast";

const Home = (props) => {
  const { data } = props;
  const { showForm } = useStateContext();

  const errorMsg = (msg) => {
    toast(`🤖 ${msg}`);
  };
  const formSubmit = async (data) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (response.status === 201) {
      toast("User Registration Successfull 🎉");
      const readResponse = await response.json();
      console.log(readResponse);
    } else {
      errorMsg("Failed User Registration");
    }
  };

  return (
    <main>
      <IndexMap />
      {showForm && (
        <Form
          data={data}
          label="Title"
          errorMsg={errorMsg}
          formSubmit={formSubmit}
        />
      )}
      {!showForm && <ShowForm />}
    </main>
  );
}

export async function getStaticProps() {
  let data;
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("REQUEST FAILED");
    }
    data = await response.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: { data },
  };
}

export default Home;
