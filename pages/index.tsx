import { InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'
import { FormControl } from '../components/FormControl'
import { Map } from '../components/Map'
import { TextField } from '../components/TextField'
import styles from '../styles/Home.module.css'
import postFormData from '../utils/post'

interface Data {
  id: number,
  name: string,
  address: {
    geo: {lat: string, lng: string}
  }
}
const initialValues: Data = {
  id: 0,
  name: '',
  address: {
    geo: {lat: '', lng: ''}
  }
}

const intialFormData = {
  id: {
    value: initialValues.id,
    error: ''
  },
  title: {
    value: '',
    error: ''
  }, 
  body: {
    value: '',
    error: ''
  } 
};

export default function Home({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [formData, setFormData] = useState(intialFormData);
  const [user, setUser] = useState<Data>(initialValues);
  const [body, setBody] = useState<any>('');
  const [postData, setPostData] = useState('');

  const handleChange = (name: string, val: number | string) => {
    setFormData(prev => ({...prev, [name]: {error: '', value: val}}))
  }

  const verifyId = (value: string | number, error: string) => {
    if(Number(value) === 0) {
      setFormData(prev => ({...prev, id: {value: Number(value), error}}))
      return false;
    }
    return true;
  }

  const verifyTextField = (value: string, name: string, error: string) => {
    if(value.length === 0) {
      setFormData(prev => ({...prev, [name]: {value: value, error}}))
      return false;
    }
    return true;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBody('');
    setPostData('');
    const data = {
      id: formData.id.value,
      title: formData.title.value,
      body: formData.body.value,
    }
    console.log('formData', body);

    if(
      verifyId(formData.id.value, 'Please select a user') &&
      verifyTextField(formData.title.value, 'title', 'Please enter title') &&
      verifyTextField(formData.body.value, 'body', 'Please enter body') 
    ) {
      console.log(true);
      (async() => {
        setPostData(await postFormData(data));
        setBody(data);
      })();
    }
    console.log(false);

  }

  useEffect(() => {
    if(!formData.id.value) return;

    const currentUser = data.filter(item => item.id === formData.id.value);
    setUser(currentUser[0]);
  }, [formData.id.value, data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ad My Brand Test</title>
        <meta name="description" content="Test for ad my brand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <form className={styles.main} onSubmit={handleSubmit}>
        <div>
          <h1 className={styles.title}>User Form</h1>
          <FormControl 
            label='Select a user' 
            name='id' data={data} 
            id={formData.id.value}
            error={formData.id.error} 
            handleChange={handleChange}
            validate={verifyId}
            />

          <TextField 
            label='Title' 
            name='title' 
            error={formData.title.error} 
            value={formData.title.value} 
            handleChange={handleChange} 
            validate={verifyTextField}
            required />
          
          <TextField 
            label='Body' 
            name='body' 
            error={formData.body.error}  
            value={formData.body.value} 
            handleChange={handleChange} 
            validate={verifyTextField}
            required />
            
          <button type='submit'>Submit</button>
        </div>
        <Map geo={user.address.geo} />
      </form>
      {body && <pre>Form Data: <br />
        <code>
          {JSON.stringify(body, null, 2)}
        </code>
      </pre>}
      {postData && <pre>Post Data: <br />
        <code>
          {postData}
        </code>
      </pre>}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data: Data[] = await res.json();

  return {
    props: { data }
  }
}