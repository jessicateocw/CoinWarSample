import { Button, Input, message, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { CountdownTimer } from "./component/Timer";

interface PoolData {
  poolName: string;
  userGroup: string[];
  totalAmount: number;
}

//TODO: Should called from DB
var datajson = [
  { poolName: "Solana", userGroup: ["userAdd"], totalAmount: 100 },
  { poolName: "Tether", userGroup: ["userAdd"], totalAmount: 20 },
  { poolName: "Ethereum", userGroup: ["userAdd"], totalAmount: 40 },
  { poolName: "BitCoin", userGroup: ["userAdd"], totalAmount: 100 },
];

//TODO: Should called from DB
var game = {
  id: 0,
  // stringy Json type of startTime
  startTime: "2022-07-26T07:46:36.611Z",
  endTime: "2022-10-06T07:46:36.611Z",
  prizeAmount: "100000 SOL",
};

const Game = () => {
  var defaultPool: PoolData = {
    poolName: "",
    userGroup: [],
    totalAmount: 0,
  };
  const [currentPool, setCurrentPool] = useState(defaultPool);
  const [predictionValue, setPredictionValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const success = () => {
    message.success("This is a success message" + predictionValue);
  };

  const error = () => {
    message.error("This is an error message");
  };

  const enterUserToPool = () => {
    //trigger client call to add user token to pool token account

    //load success or non success warning
    success();
    handleOk();
  };

  //Functions for the Modal Pop up.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    e.preventDefault();
    setPredictionValue(inputValue);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Function to show Modal and Set Current Pool Selection
  const handlePoolSelection = (pool: PoolData) => {
    setIsModalVisible(true);
    setCurrentPool(pool);
  };

  return (
    <div id="status">
      <CountdownTimer target={game.endTime} />
      <h1>Current Prize: {game.prizeAmount} </h1>
      <Space>
        {datajson.map((pool: PoolData, index: number) => (
          <div>
            <Button
              onClick={() => {
                handlePoolSelection(pool);
              }}
            >
              {pool.poolName}
            </Button>
          </div>
        ))}
      </Space>

      <Modal
        title={currentPool.poolName}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={enterUserToPool}
          >
            Join Coin Pool
          </Button>,
        ]}
      >
        {/* <div className={styles.solana_coin} /> */}
        <p>Participants: {currentPool.userGroup.length}</p>
        <p>current amount (est.): {currentPool.totalAmount}</p>
        <Space direction="vertical">
          <Input
            size="large"
            placeholder="Predict token price: "
            onChange={(event: any) => {
              handleChange(event);
            }}
          />
          <br />
        </Space>
      </Modal>
    </div>
  );
};

export default Game;
