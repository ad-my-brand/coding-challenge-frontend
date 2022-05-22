import { useEffect, useRef, useState } from "react";
import Form from "../components/Form/Form";
import styles from "../styles/Home.module.css";
import Map from '../components/Map/Map'
import dynamic from "next/dynamic";

const Home = (props: any) => {

  return (
    <div className={styles.container}>
      <Form 
      users={props.users} 
      />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_start=0&_limit=9`
  );
  const users = await response.json();

  return {
    props: {
      users: users,
    },
  };
}
