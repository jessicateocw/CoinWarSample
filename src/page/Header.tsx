import React from "react";
import styles from "../styles/Landing.module.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface Header {
  game: Boolean;
  executeScroll: any;
}

const Header = ({ game, executeScroll }: Header) => {
  const navigate = useNavigate();

  const inLanding = () => {
    return (
      <>
        <Button
          type="text"
          className={styles.headerText}
          onClick={() => {
            executeScroll();
          }}
        >
          Features
        </Button>
        <Button
          type="primary"
          className={styles.play}
          onClick={() => {
            navigate("start");
          }}
        >
          PLAY
        </Button>
      </>
    );
  };

  const inGame = () => {
    return (
      <>
        <Button
          className={styles.play}
          onClick={() => {
            navigate("start");
          }}
        >
          HISTORY
        </Button>
      </>
    );
  };

  return (
    <div className={styles["App-header"]}>
      <h1 className={styles.logo}>COINWARS</h1>

      {game ? inGame() : inLanding()}
    </div>
  );
};

export default Header;
