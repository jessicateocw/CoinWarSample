import { Button, Input, message, Modal, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { CountdownTimer } from "./component/Timer";
import "../styles/Game.less";
// import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@project-serum/anchor";
import { initCoinClient } from "../client/common/init";
import { CoinClient } from "../client/coinWar.client";

interface PoolData {
  poolName: string;
  userGroup: string[];
  totalAmount: number;
}

const Game = ({ pools, game, setPools, userEntry, setUserEntry }: any) => {
  var defaultPool: PoolData = {
    poolName: "",
    userGroup: [],
    totalAmount: 0,
  };
  const [currentPool, setCurrentPool] = useState(defaultPool);

  //Popup values
  const [predictionValue, setPredictionValue] = useState("");
  const [stakeValue, setStakeValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Selected Pool
  const [currentIndex, setCurrentIndex] = useState(0);
  //user in pool
  const [isPool, setIsPool] = useState(false);

  /**
   * Wallet Configurations
   **/
  const wallet = useAnchorWallet();
  const [client, setClient] = useState<CoinClient | null>(null);

  const [isPrediction, setIsPrediction] = useState(false);
  const [isStake, setIsStake] = useState(false);

  const [gameEnd, setGameEnd] = useState(false);

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

  useEffect(() => {
    if (userEntry.poolName !== "") {
      setIsPool(true);
    }
  }, []);

  const success = () => {
    message.success("This is a success message" + predictionValue);
  };

  const error = () => {
    message.error("Input values missing");
  };

  const enterHardCode = (index: number) => {
    //change the pools accordingly
    var updatePool = pools[index];
    updatePool.userGroup.push("PublicKey");
    updatePool.totalAmount += parseInt(stakeValue);

    setIsPool(true);

    var currentEntry = userEntry;
    currentEntry.predictionValue = predictionValue;
    currentEntry.stakeValue = stakeValue;
    currentEntry.poolName = pools[index].poolName;
    setUserEntry(currentEntry);

    // console.log(updatePool);
    // console.log(pools);
    handleOk();
  };

  const enterUserToPool = async () => {
    //trigger client call to add user token to pool token account create user and deposit

    if (client && wallet && predictionValue && stakeValue) {
      try {
        console.log("test");
        handleOk();
        const { createUserIx } = await client.createUser(wallet.publicKey);

        console.log("created user", createUserIx);
        if (createUserIx) {
          const { depositIx } = await client.deposit(
            wallet.publicKey,
            parseInt(stakeValue),
            parseInt(predictionValue),
            "Solana"
          );
          console.log("Create depositIx:", depositIx);
          //check deposit status
          //load success or non success warning
          if (depositIx) {
            handleOk();
            success();
          }
          // else {
          //   error();
          // }
        }
      } catch (err) {
        console.log(err);
        //error();
      }
      enterHardCode(currentIndex);
    } else {
      error();
    }
  };

  //Functions for the Modal Pop up.
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    parameter: string
  ) => {
    const { value: inputValue } = e.target;
    e.preventDefault();
    if (parameter === "predict") {
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
    }, 5000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Function to show Modal and Set Current Pool Selection
  const handlePoolSelection = (pool: PoolData) => {
    setIsModalVisible(true);
    setCurrentPool(pool);
  };

  const selectPopup = () => {
    return (
      <Modal
        // title={currentPool.poolName}
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
            onClick={() => {
              enterUserToPool();
            }}
          >
            Join Coin Pool
          </Button>,
        ]}
      >
        {/* <div className={styles.solana_coin} /> */}
        <div className="model">
          <h1>{currentPool.poolName}</h1>
          <p>Participants: {currentPool.userGroup.length}</p>
          <p>Total amount in Current Pool(USDC): {currentPool.totalAmount}</p>
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
    );
  };

  const handleViewSelected = () => {
    setIsModalVisible(true);
  };

  const selectedPopup = () => {
    // let isPrediction = false;
    // let isStake = false;
    return (
      <Modal
        // title={currentPool.poolName}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {/* <div className={styles.solana_coin} /> */}
        <div className="model">
          <h1>{userEntry.poolName}</h1>
          <p>Participants: {currentPool.userGroup.length}</p>
          <p>Total amount in Current Pool(USDC): {currentPool.totalAmount}</p>
          <Space direction="vertical" className="input">
            {isPrediction ? (
              <>
                <Typography>Change Prediction</Typography>
                <Input
                  size="large"
                  placeholder="Predict token price: "
                  onChange={(event: any) => {
                    handleChange(event, "predict");
                  }}
                />
                <Button
                  onClick={() => {
                    setIsPrediction(false);
                  }}
                >
                  Change
                </Button>
              </>
            ) : (
              <Button
                className="changeButton"
                onClick={() => {
                  setIsPrediction(true);
                }}
              >
                {`Prediction :  ` + userEntry.predictionValue}
              </Button>
            )}

            <br />

            {isStake ? (
              <>
                <Typography>Change Stake</Typography>
                <Input
                  size="large"
                  placeholder="Insert Staking Amount: "
                  onChange={(event: any) => {
                    handleChange(event, "stake");
                  }}
                />
                <Button
                  onClick={() => {
                    setIsStake(false);
                  }}
                >
                  Change
                </Button>
              </>
            ) : (
              <Button
                className="changeButton"
                onClick={() => {
                  setIsStake(true);
                }}
              >
                {`Stake :  ` + userEntry.stakeValue}
              </Button>
            )}
          </Space>
        </div>
      </Modal>
    );
  };

  // const checkGameEnd = (index: number) => {
  //   if (gameEnd) {
  //     return index == 0 ? "winButton" : "gameButton";
  //   } else {
  //     return currentIndex !== index ? "gameButton" : "selectedButton";
  //   }
  // };

  return (
    <div id="status">
      <CountdownTimer target={game.endTime} setGameEnd={setGameEnd} />
      <h1>Current Prize: {game.prizeAmount} </h1>

      {isPool ? (
        <Space className="container">
          {pools.map((pool: PoolData, index: number) => (
            <div>
              <Button
                className={
                  currentIndex !== index ? "gameButton" : "selectedButton"
                }
                key={index}
                disabled={gameEnd ? true : currentIndex !== index}
                onClick={() => {
                  handleViewSelected();
                }}
              >
                {pool.poolName}
              </Button>
            </div>
          ))}
        </Space>
      ) : (
        <Space className="container">
          {pools.map((pool: PoolData, index: number) => (
            <div>
              <Button
                className="gameButton"
                key={index}
                onClick={() => {
                  handlePoolSelection(pool);
                  setCurrentIndex(index);
                }}
              >
                {pool.poolName}
              </Button>
            </div>
          ))}
        </Space>
      )}
      {isPool ? selectedPopup() : selectPopup()}
    </div>
  );
};

export default Game;
