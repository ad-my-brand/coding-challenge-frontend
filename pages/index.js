import Head from 'next/head'
import Animation from '../components/Animation'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ParentBox from '../components/ParentBox'

export default function Home() {
  return (
    <>
      <Head>
        <title>Form Prototype</title>
        <meta name="description" content="for coding-challenge-frontend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body className="bg-zinc-200 dark:bg-zinc-800 h-max text-zinc-600 dark:text-cyan-200 open-sans">
        <Header/>
        <ParentBox/>
        <Footer/>
        <Animation />
      </body>
    </>
  )
}