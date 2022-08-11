import React from "react";
import { useCountdown } from "./useCountdown";
import "../../styles/Countdown.css";
import Winner from "../Winner";

const CountdownTimer = ({ target }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(target);

  if (days + hours + minutes + seconds <= 0) {
    return <GameEnd />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const ShowCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className="show-counter">
      <a className="countdown-link">
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </a>
    </div>
  );
};

const GameEnd = () => {
  return (
    <div className="expired-notice">
      <span>Game END !!!</span>
      <p>Winners collect your prize.</p>
      <Winner />
    </div>
  );
};

const DateTimeDisplay = ({ value, type, isDanger }: any) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

export { CountdownTimer };
