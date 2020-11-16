
import styles from '../../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';


const DeckList = ( deckData :any) => {
  const [decks, setDecks] = useState([])
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    setDecks(deckData.children)
  }, [deckData])

  
  return (
    <div>
      
        {decks.map(({title,id,description}:any) => (
          <div className={styles.deck} key = {id}>
            <Link as = {`/decks/${id}`} href = "/decks/[decks]">
            <a>
            <h3>{title} &rarr;</h3>
            <p>{description}</p>
            </a>     
            </Link>

            <Link as = {`/decks/edit/${id}`} href = "/decks/edit/[decks]">
            <a>
            <p>Edit deck</p>
            </a>     
            </Link>

          </div>
    ))}

  </div>
  )
}
export default DeckList