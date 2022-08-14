//Data sets that creates the pool and set game

//TODO: Should called from DB
var datajson = [
  { poolName: "Solana", userGroup: ["userAdd"], totalAmount: 100 },
  { poolName: "BNB", userGroup: ["userAdd"], totalAmount: 20 },
  { poolName: "Polygon", userGroup: ["userAdd"], totalAmount: 40 },
  { poolName: "Ethereum", userGroup: ["userAdd"], totalAmount: 100 },
];

//TODO: Should called from DB
const game = {
  id: 0,
  // stringy Json type of startTime
  startTime: "2022-07-26T07:46:36.611Z",
  endTime: "2022-10-06T07:46:36.611Z",
  prizeAmount: "100000 SOL",
};
//global json


export { datajson, game };
