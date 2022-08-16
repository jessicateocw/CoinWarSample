import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import Game from "./Game";
import { datajson, game } from "./data/data";
import { UserSwitchOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Main = () => {
  //TODO: check wallet id if it owner
  const [isAdmin, setAdmin] = useState(false);

  const [pools, setPools] = useState(datajson);
  const [currentGame, setGame] = useState(game);
  const [userEntry, setUserEntry] = useState({
    predictionValue: "",
    stakeValue: "",
    poolName: "",
  });

  const handleChangeView = () => {
    setAdmin(!isAdmin);
  };

  return (
    <>
      {isAdmin ? (
        <Admin setGame={setGame} setPools={setPools} />
      ) : (
        <Game
          pools={pools}
          setPools={setPools}
          game={currentGame}
          userEntry={userEntry}
          setUserEntry={setUserEntry}
        />
      )}
      <br />

      <Button
        onClick={handleChangeView}
        icon={<UserSwitchOutlined />}
        size="large"
      >
        Change Admin / Player
      </Button>
      <br />
    </>
  );
};

export default Main;
