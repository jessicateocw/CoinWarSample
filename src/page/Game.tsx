import { Button, Input, message, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";

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

const Game = () => {
  const [predictionValue, setPredictionValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(true);
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

  return (
    <div id="status">
      {datajson.map((pool: PoolData, index: number) => (
        <div>
          <Button
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            {pool.poolName}
          </Button>
        </div>
      ))}

      <Modal
        title="Basic Modal"
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
        <p>Participants: {}</p>
        <p>current amount (est.): {}</p>
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
