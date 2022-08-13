import React, { useState } from "react";
import styles from "../styles/Landing.module.css";
import { Button } from "antd";
import { useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";

import Header from "./Header";
import Main from ".";
import { Wallet } from "./Wallet";

require("@solana/wallet-adapter-react-ui/styles.css");

// Constants
const TWITTER_HANDLE = "oops_coinwars";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Launch = () => {
  // const { publicKey, signMessage } = useWallet();
  // const [walletAddress, setWalletAddress] = useState("");
  const [inWallet, setInWallet] = useState(false);

  const [connectString, setConnectString] = useState("CONNECT WALLET");

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
    setInWallet(true);

    //if no wallet selected, alert user to try again.
    // setWalletAddress(true);
    // console.log("enter", button);
  };

  // const walletContent = (
  //   <ConnectionProvider endpoint={endpoint}>
  //     <WalletProvider wallets={wallets} autoConnect>
  //       <WalletModalProvider>
  //         <div
  //           style={{
  //             display: inWallet ? "flex" : "none",
  //             justifyContent: "flex-end",
  //             marginRight: "30px",
  //             gap: "15px",
  //             marginTop: "10px",
  //           }}
  //         >
  //           <WalletMultiButton />
  //           {/* <WalletConnectButton /> */}
  //           {/* <WalletDisconnectButton /> */}
  //         </div>
  //       </WalletModalProvider>
  //     </WalletProvider>
  //   </ConnectionProvider>
  // );

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
      <Wallet>
        {inWallet ? (
          <>
            {" "}
            <Header game={true} executeScroll={undefined} />
          </>
        ) : (
          renderLaunch
        )}

        {inWallet && (
          <>
            <Main />
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
      </Wallet>
    </>
  );
};

export default Launch;
