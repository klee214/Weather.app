import React from "react";
import styles from './Search.module.css'

const Search = (props) => {
  return (
    <div className={styles.main-content}>
      <p>Use this site to get your weather!</p>

      <form >
        <input className={styles.input} placeholder="Location..." />
        <button className={styles.button}>Search</button>
      </form>

      <p id="message-1"></p>
      <p id="message-2"></p>
    </div>
  );
};

export default Search;
