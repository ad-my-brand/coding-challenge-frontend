import { useState, useContext } from "react";
import { createContext } from "vm";
import styles from "./UsersList.module.css";
import { UsersContextProvider } from "../../context/ContextProvider";

export const UsersList: any = ({ users }: any) => {
  const [selectUser, setSelectUser] = useState(false);
  const [idHolder, setIdHolder] = useState();
  // const UsersContext = createContext();
  return (
    <UsersContextProvider>
      <div className={styles.flexbox_container}>
        <div className={styles.flexbox}>
          {users.map((user: any, id: any) => {
            // console.log(user.name);

            return (
              <div
                className={`${styles.flex_items} ${
                  idHolder === user.id && styles.flex_items_selected
                }`}
                key={user.id}
                onClick={() => {
                  if (idHolder === user.id) {
                    setIdHolder(undefined);
                  } else {
                    setIdHolder(user.id);
                  }
                  setSelectUser(true);
                }}
              >
                {user.name}
              </div>
            );
          })}
        </div>
      </div>
    </UsersContextProvider>
  );
};
