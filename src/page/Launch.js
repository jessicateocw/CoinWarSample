import React from "react";
import styles from "../styles/Landing.module.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Launch = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <div className={styles["Game-header"]}>
      <h1 className={styles["hero-heading1"]}>COINWARS</h1>
      <h4>Support Your Favorite Coin</h4>
      <Button
        type="primary"
        className={styles.main_button}
        onClick={handleClick}
      >
        CONNECT WALLET
      </Button>
    </div>
  );
};

export default Launch;
