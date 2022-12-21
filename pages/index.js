import Head from 'next/head'
import Form from '../components/Form'
import styles from '../styles/Home.module.css'

export default function Home({ users }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Form Control</title>
        <meta name="description" content="Form Control" />
        <link rel="icon" href="/ADmyBrand.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a href="https://www.admybrand.com/about">ADmyBrand</a> Frontend Assignment
        </h1>
        <Form users={users}/>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
  });
  const users = await data.json();
  return {
    props: {
      users,
    },
  };
}
