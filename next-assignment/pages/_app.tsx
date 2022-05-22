import '../styles/globals.css'
import "../components/Form/Form.module.css"
import "../components//Map/Map.module.css"
import "../components/UsersList/UsersList.module.css"
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
