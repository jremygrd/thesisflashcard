import '../styles/globals.css';
import Head from 'next/head';
import  ButtonAppBar  from './components/Nav';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './services/auth';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ButtonAppBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default MyApp;
