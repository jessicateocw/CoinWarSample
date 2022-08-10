import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import styles from "../styles/Landing.module.css";
import { Button } from "antd";
import {
  useWallet,
  useAnchorWallet,
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletConnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";
import Game from "./Game";
import Header from "./Header";

require("@solana/wallet-adapter-react-ui/styles.css");

// Constants
const TWITTER_HANDLE = "oops_coinwars";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const network = WalletAdapterNetwork.Devnet;

const Launch = () => {
  // const { publicKey, signMessage } = useWallet();
  const [walletAddress, setWalletAddress] = useState("");
  const [inWallet, setInWallet] = useState(false);
  const wallet = useAnchorWallet();

  const [connectString, setConnectString] = useState("CONNECT WALLET");

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new CoinbaseWalletAdapter(),
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  useEffect(() => {
    //check solana in windows
  }, []);

  useEffect(() => {
    //Check if the walletAddress is updated
    setWalletAddress("update here");
    setInWallet(true);
    setConnectString("enter");
  }, [walletAddress]);

  const handleClick = (e: Event) => {
    //button to call wallet button
    e.preventDefault();
    const button = document.querySelector(
      ".wallet-adapter-button"
    ) as HTMLElement;
    if (button) {
      console.log("enter button");
      button.click();
    }
    setConnectString("... LOADING");
    //if no wallet selected, alert user to try again.
    // setWalletAddress(true);
    // console.log("enter", button);
  };

  const walletContent = (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div
            style={{
              display: inWallet ? "flex" : "none",
              justifyContent: "flex-end",
              marginRight: "30px",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <WalletMultiButton />
            {/* <WalletConnectButton /> */}
            {/* <WalletDisconnectButton /> */}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );

  const renderLaunch = (
    <div className={styles["Game-header"]}>
      <h1 className={styles["hero-heading1"]}>COINWARS</h1>
      <h4>Support Your Favorite Coin</h4>
      <Button
        type="primary"
        className={styles.main_button}
        onClick={(event: any) => {
          handleClick(event);
        }}
      >
        {connectString}
      </Button>
    </div>
  );

  return (
    <>
      {inWallet ? (
        <>
          {" "}
          <Header game={true} executeScroll={undefined} />
        </>
      ) : (
        renderLaunch
      )}
      {walletContent}
      {inWallet && (
        <>
          <Game />
          <div className="footer-container">
            <a
              className="footer-text"
              href={TWITTER_LINK}
              target="_blank"
              rel="noreferrer"
            >{`Copyright © @${TWITTER_HANDLE}`}</a>
          </div>
        </>
      )}
    </>
  );
};

export default Launch;
