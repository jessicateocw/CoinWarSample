import React, { useState, useEffect } from "react";
import styles from "../styles/Landing.module.css";
import { Button, Space } from "antd";
import { Wallet } from "@project-serum/anchor";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { initCoinClient } from "../client/common/init";
import { CoinClient } from "../client/coinWar.client";
import { PublicKey } from "@solana/web3.js";

const Admin = ({ setGame, setPools }: any) => {
  const wallet = useAnchorWallet();
  const [client, setClient] = useState<CoinClient | null>(null);
  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState("");
  const [mintKey, setMintKey] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     if (wallet) {
  //       try {
  //         const coinClient = await initCoinClient(wallet as Wallet);
  //         setClient(coinClient);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   })();
  // }, [wallet]);

  const handleCreatePool = async () => {
    const mintPub = new PublicKey(mintKey);
    if (client && wallet && mintKey && destination) {
      setIsTxLoading(true);
      try {
        const { createPoolIx, poolTokenAccount } = await client.createPool(
          wallet.publicKey,
          "Solana",
          mintPub
        );
        console.log("Create pool:", createPoolIx, poolTokenAccount);
      } catch (err) {
        setIsTxLoading(false);
        console.log(err);
      }
    }
  };

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
