import React from "react";
import styles from "../styles/Landing.module.css";
import { Button } from "antd";

const Admin = () => {
  return (
    <div className={styles["App-header"]}>
      <h1 className={styles.logo}>COINWARS</h1>
      {/* Owner to create new game and new pool  */}
      <Button onClick={() => {}}></Button>
    </div>
  );
};

export default Admin;
