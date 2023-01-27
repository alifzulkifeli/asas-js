import '../styles/globals.css'
import Handler from './../components/Handler';
import Layout from './../components/Layout';


function MyApp({ Component, pageProps }) {


  return (
    <>
      <Layout>
        <Handler>
      <Component {...pageProps} />
        </Handler>
      </Layout>
    </>
  )
}
export default MyApp