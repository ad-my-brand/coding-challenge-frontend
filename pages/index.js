import Head from 'next/head';
import React from 'react';
import Form from '../components/Form/Form';
import { fetchUsers } from '../utils/api';

export const DataContext = React.createContext();

export default function Home({ users }) {
  return (
    <div>
      <Head>
        <title>Form Control</title>
        <meta name='description' content='Postmaker' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='h-screen'>
        <DataContext.Provider value={users}>
          <div className='flex w-full h-full items-center justify-center '>
            <Form />
          </div>
        </DataContext.Provider>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const users = await fetchUsers();
  return {
    props: {
      users,
    },
  };
}
