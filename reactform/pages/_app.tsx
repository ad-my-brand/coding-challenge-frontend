import "../styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
