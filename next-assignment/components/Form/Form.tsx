import { useState } from "react";
import styles from "./Form.module.css";
import style from "../Controller/Controller.module.css";
import Map from "../Map/Map";
import Button from "../Controller/Button";
import Controller from "../Controller/Controller";

function Form(props: any) {
  // console.log(props);

  const [title, setTitle] = useState<String | null>("");
  const [body, setBody] = useState<String | null>("");
  const [userId, setUserId] = useState<String | null>("");
  const [selectUser, setSelectUser] = useState<Boolean | null>(false);
  const [validId, setValidId] = useState<String | null>("");
  const [onSuccess, setOnSuccess] = useState<String | null>("");
  const [isPending, setIsPending] = useState<Boolean | null>(false);
  const [location, setLocation] = useState({ lat: 19.076, lng: 72.8777 });
  const [focused, setFocused] = useState(false);

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (title && body && validId) {
      const post = { title, body, userId };
      setIsPending(true);
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body, userId }),
      }).then(() => {
        console.log("Submitted Successfully!", post);
        setOnSuccess("Submitted Successfully!");
        setIsPending(false);
      });
    } else {
      return;
    }
  };

  return (
    <main className={styles.body}>
      <div className={styles.form_container}>
        <div className={styles.close_button}>X</div>
        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <div className={styles.form_element}>
            <Controller
              label={"Title"}
              name={"Title"}
              required={true}
              value={title}
              type={"text"}
              htmlFor={"name"}
              placeholder={"Title"}
              errorMessage={"Oops! Did you forget to add the title?"}
              onChange={(event: any) => {
                setTitle(event.target.value);
              }}
            />
            <Controller
              label={"Body"}
              name={"Body"}
              required={true}
              value={body}
              type={"text"}
              htmlFor={"name"}
              placeholder={"Body"}
              errorMessage={"Oops! Did you forget to add the body?"}
              onChange={(event: any) => {
                setBody(event.target.value);
              }}
            />
          </div>
          <br />
          <div className={styles.flexbox_container}>
            <div className={styles.flexbox}>
              {props.users.map((user: any, id: any) => {
                return (
                  <div
                    className={`${styles.flex_items} ${
                      userId === user.id && styles.flex_items_selected
                    }`}
                    key={user.id}
                    onClick={() => {
                      if (userId === user.id) {
                        setUserId(undefined);
                      } else {
                        setValidId(user.id);
                        setUserId(user.id);
                      }
                      setSelectUser(true);
                      setLocation(user.address.geo);
                    }}
                  >
                    {user.name}
                  </div>
                );
              })}
            </div>
          </div>

          {/* <UsersList 
            users={props.users} 
            id={props.users.id} 
             /> */}

          <Map location={location} />

          {onSuccess && <div className={styles.span}>{onSuccess}</div>}
          {!isPending && <Button children="Submit" />}
          {isPending && <Button children="Submitting..." />}
        </form>
      </div>
    </main>
  );
}

export default Form;
