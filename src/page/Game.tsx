import {
  Button,
  Input,
  message,
  Modal,
  Space,
  Row,
  Col,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { CountdownTimer } from "./component/Timer";
import "../styles/Game.less";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@project-serum/anchor";
import { initCoinClient } from "../client/common/init";
import { CoinClient } from "../client/coinWar.client";

interface PoolData {
  poolName: string;
  userGroup: string[];
  totalAmount: number;
}

const Game = ({ pools, game }: any) => {
  var defaultPool: PoolData = {
    poolName: "",
    userGroup: [],
    totalAmount: 0,
  };
  const [currentPool, setCurrentPool] = useState(defaultPool);
  const [predictionValue, setPredictionValue] = useState("");
  const [stakeValue, setStakeValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Wallet Configurations
   **/
  const wallet = useAnchorWallet();
  const [client, setClient] = useState<CoinClient | null>(null);

  // console.log(wallet);
  useEffect(() => {
    (async () => {
      if (wallet) {
        console.log(wallet);
        try {
          const coinClient = await initCoinClient(wallet as Wallet);

          if (coinClient !== null) {
            console.log("coinClient", coinClient);
            setClient(coinClient);
            //create user
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [wallet]);

  const success = () => {
    message.success("This is a success message" + predictionValue);
  };

  const error = () => {
    message.error("This is an error message");
  };

  const enterUserToPool = async () => {
    //trigger client call to add user token to pool token account create user and deposit

    if (client && wallet) {
      try {
        console.log("test")
        const {createUserIx} = await client.createUser(wallet.publicKey);

        console.log('created user', createUserIx);
        if(createUserIx) {
          const { depositIx } = await client.deposit(
            wallet.publicKey,
            parseInt(stakeValue),
            parseInt(predictionValue),
            "Solana"
          );
  
          //check deposit status
          //load success or non success warning
          if (depositIx) {
            handleOk();
            success();
          } else {
            error();
          }
          console.log("Create depositIx:", depositIx);
        }
        
      } catch (err) {
        console.log(err);
        error();
      }
    }
  };

  //Functions for the Modal Pop up.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parameter: string
  ) => {
    const { value: inputValue } = e.target;
    e.preventDefault();
    if (parameter == "predict") {
      setPredictionValue(inputValue);
    } else {
      setStakeValue(inputValue);
    }
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
      <Space className="container">
        {pools.map((pool: PoolData, index: number) => (
          <div>
            <Button
              className="gameButton"
              key={index}
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
        <div className="model">
          <p>Participants: {currentPool.userGroup.length}</p>
          <p>Current amount (USDC): {currentPool.totalAmount}</p>
          <Space direction="vertical" className="input">
            <Typography>Predict token price:</Typography>
            <Input
              size="large"
              placeholder="Predict token price: "
              onChange={(event: any) => {
                handleChange(event, "predict");
              }}
            />
            <br />
            <Typography>Insert Staking Amount:</Typography>
            <Input
              size="large"
              placeholder="Insert Staking Amount: "
              onChange={(event: any) => {
                handleChange(event, "stake");
              }}
            />
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default Game;
