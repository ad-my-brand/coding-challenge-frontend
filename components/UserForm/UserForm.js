import classes from "./UserForm.module.css";
import { useState, useEffect } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Map from "../Map/Map";

const UserForm = ({results}) => {

  const [select, setSelect] = useState(false);
  const [nameId, setNameId] = useState();
  const [isSubmit, setIsSubmit] = useState({
    title: false,
    body: false,
  });
  const [loc, setLoc] = useState({
    lat: 0,
    lng: 0,
  });

  const [data, setData] = useState({
    Title: "",
    Body: "",
    userId: "",
  });
  const [desc, setDesc] = useState("")

  const changeHandler = (e) => {
    setData({...data,[e.target.name]: e.target.value,userId: nameId,});
    if (e.target.name === "Title") {
      setIsSubmit({ ...isSubmit, title: false });
    }
    if (e.target.name === "Body") {
      setIsSubmit({ ...isSubmit, body: false });
    }
  };

  const clear = () => {
    setData({ Title: "", Body: "", userId: "" });
    setNameId("");
    setSelect(false);
    setLoc({lat:0, lng:0});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (data.Title.trim().length !== 0 && data.Body.trim().length !== 0 && data.userId) {
        data.Title = data.Title.trim();
        data.Body = data.Body.trim();
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setDesc("Post Submitted");
          clear();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      if(!data.userId){
          setSelect(true);
          setNameId("");
          setLoc({lat:0, lng:0});
      }
      if(data.Title.trim().length===0){
          setIsSubmit({...isSubmit, title: true})
      }
      if(data.Body.trim().length===0){
          setIsSubmit({...isSubmit, body: true})
      }
      if(data.Title.trim().length===0 && data.Body.trim().length===0){
          setIsSubmit({ title: true, body: true });
      }
    }
  };

  return (
    <div className={`${classes.UserFormMap} ${classes.Card}`}>
      <div className={`${classes.UserForm} ${classes.Card}`}>
        <div>
          <div className={classes.User__head}>
            <p className={classes.Head__pOne}>Please select a user</p>
            {!nameId && select && (
              <p className={classes.Head__pTwo}>! Please select a user</p>
            )}
          </div>
          <div className={classes.User}>
            {results?.map((user) => (
              <p
                className={`${classes.User__name} ${
                  nameId === user.id && classes.User__select
                }`}
                onClick={() => {
                    if (nameId === user.id) {
                        setNameId("");
                        setData({ ...data, userId: "" });
                    } else {
                        setNameId(user.id);
                        setData({ ...data, userId: user.id });
                    }
                    setLoc(user.address.geo);
                    setSelect(true);
                }}
                key={user.id}
              >
                {user.name}
              </p>
            ))}
          </div>
        </div>
        <form className={classes.Form}>
          <Input
            label={"Title"}
            name={"Title"}
            required={true}
            value={data.Title}
            type={"text"}
            htmlFor={"name"}
            placeholder={"Title"}
            onChange={changeHandler}
            validation={isSubmit.title}
          />
          <Input
            label={"Body"}
            name={"Body"}
            required={true}
            value={data.Body}
            type={"text"}
            htmlFor={"name"}
            placeholder={"Body"}
            onChange={changeHandler}
            validation={isSubmit.body}
          />
          <Button className={classes.button} onClick={submitHandler}>Add</Button>
        </form>
        {desc && (
          <>
            <p className={classes.UserForm__submit}>{desc}</p>
          </>
        )}
      </div>
      <div className={classes.Map}>
        <Map loc={loc} />
      </div>
    </div>
  );
};

export default UserForm;
