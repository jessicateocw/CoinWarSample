import React, { FC, ReactNode, useMemo } from "react";
import styles from "../styles/Landing.module.css";
import { Button } from "antd";
import {
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
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useNavigate } from "react-router-dom";

require("@solana/wallet-adapter-react-ui/styles.css");
const network = WalletAdapterNetwork.Devnet;

const Launch = ({ children }) => {
  const navigate = useNavigate();

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

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <div className={styles["Game-header"]}>
      <h1 className={styles["hero-heading1"]}>COINWARS</h1>
      <h4>Support Your Favorite Coin</h4>
      <Button
        type="primary"
        className={styles.main_button}
        onClick={handleClick}
      >
        CONNECT WALLET
      </Button>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "15px",
                gap: "15px",
                marginTop: "10px",
              }}
            >
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
};

export default Launch;
