import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home({deckData}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>

        {deckData.map(({title,id,description}) => (
          <div className={styles.deck} >
            <Link as = {`/decks/${id}`} href = "/decks/[decks]">
            <a>
            <h3>{title} &rarr;</h3>
            <p>{description}</p>
            </a>     
            </Link>

          </div>
          ))}
          
                   
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const allDecks = await fetch ("http://localhost:3000/api/decks/findAll"); //à remplacer par findAllOfUser selon les tables du genre User_Rights
  const deckData = await allDecks.json();
  return {
    props: {
      deckData
    }
  }
}