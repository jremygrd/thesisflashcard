  
import React from 'react'
import styles from "../../../styles/Home.module.css";

const SearchBar = (props) => {
  const { fetchInitialImages, handleChange, handleSubmit, currentQuery } = props
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        
        <form className={styles.formuns} onSubmit={handleSubmit}>
                {" "}
                <label className={styles.labeluns} htmlFor="query">
                  {" "}
                  📷
                </label>
                <input
                  type="text"
                  name="query"
                  className={styles.inputuns}
                  placeholder={`Try "dog" or "apple"`}
                  value={currentQuery}
                  onChange={handleChange}
                />
                <button type="submit" className={styles.buttonuns}>
                  Search
                </button>
              </form>
      </div>
    </nav>
  )
}

export default SearchBar