import React from "react";
import Header from "./Header";
import styles from "../styles/Landing.module.css";

const Game = () => {
  // Constants
  const TWITTER_HANDLE = "oops_coinwars";
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

  return (
    <div id="status">
      <Header game={true} />

      <div className="footer-container">
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`Copyright © @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  );
};

export default Game;
