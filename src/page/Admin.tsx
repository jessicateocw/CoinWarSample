import React from "react";
import styles from "../styles/Landing.module.css";
import { Button, Space } from "antd";

const Admin = ({ setGame, setPools }: any) => {
  return (
    <div>
      <h1 className={styles.logo}>COINWARS</h1>
      {/* Owner to create new game and new pool  */}
      <Space>
        {/* Create Pool */}
        <Button onClick={() => {}}>CREATE POOL</Button>

        <Button
          value="large"
          onClick={() => {
            // game.endTime = "2022-08-06T07:46:36.611Z";
            setGame({
              id: 0,
              // stringy Json type of startTime
              startTime: "2022-07-26T07:46:36.611Z",
              endTime: "2022-10-06T07:46:36.611Z",
              prizeAmount: "100000 SOL",
            });
          }}
        >
          {" "}
          RESTART
        </Button>

        {/* End Game */}
        <Button
          value="large"
          onClick={() => {
            // game.endTime = "2022-08-06T07:46:36.611Z";
            setGame({
              id: 0,
              // stringy Json type of startTime
              startTime: "2022-07-26T07:46:36.611Z",
              endTime: "2022-08-06T07:46:36.611Z",
              prizeAmount: "100000 SOL",
            });
          }}
        >
          {" "}
          END GAME
        </Button>
      </Space>
    </div>
  );
};

export default Admin;
