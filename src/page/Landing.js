import React, { useRef } from "react";
import Header from "./Header";
import twitterLogo from "../assets/twitter-logo.svg";
import styles from "../styles/Landing.module.css";

import { Card, Col, Row } from "antd";

const Homepage = () => {
  const myRef = useRef(null);

  const executeScroll = () => {
    myRef.current.scrollIntoView();
  };

  // Constants
  const TWITTER_HANDLE = "oops_coinwars";
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

  return (
    <div id="status">
      <Header executeScroll={executeScroll} />
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

const FeaturesContent = ({ myRef }) => {
  return (
    <div id="features" className={styles.body} ref={myRef}>
      <h1>Multiple Pools To Join</h1>
      <h1>May The Best Pool Win</h1>

      <Row gutter={16} className={styles.feature_content}>
        <Col span={6}>
          <Card title="Coin name" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Coin name" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Coin name" bordered={false}>
            Card content
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Coin name" bordered={false}>
            Card content
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Homepage;
