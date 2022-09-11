import Head from 'next/head';
import Navbar from '../components/Navbar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>ADmyBrand</title>
				<meta name="description" content="Add my Brand task" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
