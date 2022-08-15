import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";

const Winner = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(true);

  //Functions for the Modal Pop up.
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
    <div id="winner">
      <Button
        onClick={() => {
          setIsModalVisible(true);
        }}
        disabled={!isWinner}
      >
        Claim reward!
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          ,
        ]}
      >
        {/* <div className={styles.solana_coin} /> */}
        <div className="model">
          <h1>Welcome Winner</h1>
          <p>Lucky you!!</p>
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Collect
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Winner;
