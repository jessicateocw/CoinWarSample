import React, { useRef } from "react";
import Header from "./Header";
import styles from "../styles/Landing.module.css";

import { Card, Col, Row } from "antd";

const Homepage = () => {
  const myRef = useRef<null | HTMLDivElement>(null);

  const executeScroll = () => {
    if (myRef.current) {
      myRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Constants
  const TWITTER_HANDLE = "oops_coinwars";
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

  return (
    <div id="status">
      <Header executeScroll={executeScroll} game={false} />
      <HomeContent />
      <FeaturesContent myRef={myRef} />
      <div className="footer-container">
        {/* <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} /> */}
        <a
          className="footer-text"
          href={TWITTER_LINK}
          target="_blank"
          rel="noreferrer"
        >{`Copyright © @${TWITTER_HANDLE}`}</a>
      </div>
    </div>
  );
};

const HomeContent = () => {
  return (
    <div id="body" className={styles.body}>
      {/* right side panel */}
      <h1 className={styles.heroStatement}>
        Select your favorite coin and join the battle !
      </h1>
      {/* left side panel */}
      <div className={styles.heroContent}>
        <div className={styles.solana_coin} />
        <div className={styles.doge_coin} />
        <div className={styles.tether_coin} />
      </div>
    </div>
  );
};

const FeaturesContent = ({ myRef }: any) => {
  return (
    <div id="features" className={styles.body} ref={myRef}>
      <h1>Multiple Pools To Join</h1>
      <h1>May The Best Pool Win</h1>

      <Row gutter={16} className={styles.feature_content}>
        <Col span={6}>
          <Card title="Solana" bordered={false}>
            39000 USDC
          </Card>
        </Col>
        <Col span={6}>
          <Card title="BNB" bordered={false}>
            4000 USDC
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Polygon" bordered={false}>
            14000 USDC
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Ethereum" bordered={false}>
            23000 USDC
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
