import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import FormComponent from '../components/formComponent'
export default function Home() {
  return (
    <div className={styles.container}>
      <FormComponent/>
    </div>
  )
}
