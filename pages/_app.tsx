import '../styles/globals.css';
import Head from 'next/head';
import  ButtonAppBar  from './components/Nav';


function MyApp({ Component, pageProps }:any) {
  return(
    <div>
    <ButtonAppBar />
    <Component {...pageProps} />
    </div>

  )
  
}

export default MyApp;
