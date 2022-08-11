import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";

const Winner = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

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
        disabled={isWinner}
      >
        Claim reward!
      </Button>
      <Modal
        title="Welcome Winner"
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
            onClick={handleOk}
          >
            Collect
          </Button>,
        ]}
      >
        {/* <div className={styles.solana_coin} /> */}
        <p>Winner Gets this POP UP </p>
        <p>Lucky you!!! Collect your prize</p>
      </Modal>
    </div>
  );
};

export default Winner;
