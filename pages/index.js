import Head from "next/head";
import FormControl from "../components/formControl";
export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FormControl data={props.data} error={props.error} />
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  if (!data) {
    return {
      props: { data: [], error: true },
    };
  }
  return {
    props: { data, error: false },
  };
};
