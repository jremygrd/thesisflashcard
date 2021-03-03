
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const DeckList = ( deckData :any) => {
  const [decks, setDecks] = useState([])
  const router = useRouter()
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)
  const [loading, setLoading] = React.useState(false); 


  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 3,
      color: '#fff',
    },
  }),
);
  const classes = useStyles();

  useEffect(() => {
    setDecks(deckData.children)
  }, [deckData])
  
  return (
    <>
      {decks.length > 0?

      <>
        {decks.map(({title,id,description}:any) => (
          <div className={styles.deck} key = {id} onClick = {()=>setLoading(true)}>
            <Link as = {`/decks/${id}`} href = "/decks/[decks]">

              <a>
                <h3>{title} &rarr;</h3>
                <p>{description}</p>
              </a>
            </Link>

            <Link as = {`/decks/editV3/${id}`} href = "/decks/editV3/[decks]">
              <a>
                <p>Edit deck</p>
              </a>
            </Link>
          </div>
    ))}
    </>:"Pas encore de decks"}
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
  </>
  )
}
export default DeckList


// useEffect(() => {
//   setDecks(deckData.children)
// }, [deckData])

// return (
//   <>
//     {decks.length > 0?

//     <>
//       {decks.map(({title,id,description}:any) => (
//         <div className={styles.deck} key = {id} onClick = {()=>setLoading(true)}>
//           <Link as = {/decks/${id}} href = "/decks/[decks]">
//             <a>
//               <h3>{title} &rarr;</h3>
//               <p>{description}</p>
//             </a>
//           </Link>

//           <Link as = {/decks/edit/${id}} href = "/decks/edit/[decks]">
//             <a>
//               <p>Edit deck</p>
//             </a>
//           </Link>
//         </div>
//   ))}
//   </>:"Pas encore de decks"}
//     <Backdrop className={classes.backdrop} open={loading}>
//       <CircularProgress color="inherit" />
//     </Backdrop>
// </>
// )
// }