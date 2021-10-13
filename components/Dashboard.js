import React, { useState } from "react";
import MapContainer from "./GoogleMap";
import Form from "../components/Form";
import styles from "../styles/Dashboard.module.css";
const Dashboard = ({ element }) => {
  const [value, setValue] = useState({ title: "", body: "", userId: null });
  const onChange = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleOnSubmit = async (e, id) => {
    debugger;
    e.preventDefault();
    const arr = value;
    arr.userId = id;
    setValue(arr);
    try{
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      alert(`Post Created ${JSON.stringify(data)}`);
    }catch(e){
      return {
        notFound: true
      }
    }
    
    
  };
  return (
    <>
      <div className={styles.details}>
        {console.log(element)}
        <div className={styles.userDetails}>
          <h1 style={{ marginBottom: "2px" }}>{element[0].name}</h1>
          <h4 style={{ margin: "2px 0px" }}>{element[0].email}</h4>
          <h4 style={{ margin: "4px"}}>
            {element[0].phone}
          </h4>
          <p style={{ "fontWeight": "500px", "fontSize": "medium", "marginTop": "10px" }}>
            Address: {element[0].address.street}, {element[0].address.city},
            zipcode:- {element[0].address.zipcode}
          </p>
        </div>
        <div className={styles.sidebyside}>
          <div id="map" style={{"height": "500px", "width": "500px"}}>
          <MapContainer data={element}/>
          </div>
        
        <div className={styles.form}>
            <h2>Message</h2>
          <form
            className={styles.insideform}
            onSubmit={(e) => handleOnSubmit(e, element[0].id)}
            id={element[0].id}
          >
            <Form label="title" onChange={onChange} />
            <Form label="body" onChange={onChange} />
            <button className={styles.submitbutton} type="submit">Submit</button>
          </form>
        </div>
        </div>
        
        {console.log(element)}
        
      </div>
    </>
  );
};

export default Dashboard;
