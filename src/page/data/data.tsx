//Data sets that creates the pool and set game

//TODO: Should called from DB
var datajson = [
  {
    poolName: "Solana",
    userGroup: [
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
    ],
    totalAmount: 39000,
  },
  {
    poolName: "BNB",
    userGroup: ["PublicKey", "PublicKey", "PublicKey", "PublicKey"],
    totalAmount: 241,
  },
  {
    poolName: "Polygon",
    userGroup: ["PublicKey", "PublicKey"],
    totalAmount: 1688,
  },
  {
    poolName: "Ethereum",
    userGroup: [
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
      "PublicKey",
    ],
    totalAmount: 245,
  },
];
//TODO: Should called from DB
const game = {
  id: 0,
  // stringy Json type of startTime
  startTime: "2022-08-15T07:46:36.611Z",
  endTime: "2022-10-16T12:46:36.611Z",
  prizeAmount: "9100 USDC",
};
//global json

export { datajson, game };
