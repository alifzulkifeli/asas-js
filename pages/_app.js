import '../styles/globals.css'
import Handler from './../components/Handler';
import Layout from './../components/Layout';


function MyApp({ Component, pageProps }) {


  return (
    <>
      <Layout/>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp