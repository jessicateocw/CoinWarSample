import React, { useState, useEffect } from "react";
import styles from "../styles/Landing.module.css";
import { Button, Space } from "antd";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Wallet } from "@project-serum/anchor";
import { initCoinClient } from "../client/common/init";
import { CoinClient } from "../client/coinWar.client";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

import { deserializeUnchecked } from "borsh";

const Admin = ({ setGame, setPools }: any) => {
  const wallet = useAnchorWallet();
  const [isTxLoading, setIsTxLoading] = useState<boolean>(false);
  const [destination, setDestination] = useState("");
  const [mintKey, setMintKey] = useState("");

  const [client, setClient] = useState<CoinClient | null>(null);

  useEffect(() => {
    (async () => {
      if (wallet) {
        // console.log(wallet);
        try {
          const coinClient = await initCoinClient(wallet as Wallet);
          // console.log("coinClient", coinClient);
          if (coinClient !== null) {
            setClient(coinClient);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [wallet]);

  const handleCreatePool = async () => {
    //const mintPub = new PublicKey(mintKey);
    //console.log('enter')
    if (client && wallet) {
      setIsTxLoading(true);
      try {
        //console.log('enter pool create', wallet.publicKey)
        const { createPoolIx, poolTokenAccount } = await client.createPool(
          wallet.publicKey,
          "Solana"
        );
        console.log("Create pool:", createPoolIx, poolTokenAccount);
      }catch (err) {
        setIsTxLoading(false);
        console.log(err);
      }
    }
  };

  const handleEndGame = async () => {
    if (client && wallet) {
      setIsTxLoading(true);

      //TODO: the pool values from ?
      const poolNames = ["Solana", "BNB", "Polygon", "Ethereum"];
      const poolPredictions = [46, 300, 0.5, 1500]; //userPredictions
      //TODO!!!!  Change before DEMO 
      const poolCoinPrice = [46, 1, 2, 4]; //current price

      try {
        console.log('trying');
        setGame({
          id: 0,
          // stringy Json type of startTime
          startTime: "2022-07-26T07:46:36.611Z",
          endTime: "2022-08-06T07:46:36.611Z",
          prizeAmount: "100000 SOL",
        });

        console.log('end set Game');
        const { selectedWinnerPoolIx, winning_index } = await client.selectWinningPool(
          poolNames,//poolname array,
          poolPredictions,
          poolCoinPrice
        );

        console.log('selectedWinnerPool', winning_index);

        console.log('client', client);
        if (selectedWinnerPoolIx) {
          //Amount set to be calculated
          //  payout = at_risk_stake * MAX(-0.25, MIN(0.25, payout_factor * (corr * corr_multiplier + tc * tc_multiplier)))
          const prizeAmount = Math.floor(Math.random()* 5000) + 5000;
          await client.payWinningPoolUser(
            wallet.publicKey,
            "Solana",
            prizeAmount
          );
        }
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
        <Button onClick={() => {handleCreatePool()}}>CREATE POOL</Button>

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
            handleEndGame();
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
