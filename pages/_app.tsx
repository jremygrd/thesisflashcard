import '../styles/globals.css';
import Head from 'next/head';
import  ButtonAppBar  from './components/Nav';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './services/auth';
import type { AppProps } from 'next/app';
import NavBar from './components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* <ButtonAppBar /> */}
      <NavBar/>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;
