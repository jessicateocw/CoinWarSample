import { Connection, PublicKey } from "@solana/web3.js";
import { CoinClient } from "../coinWar.client";
import * as idl from "../data/coin_war.json";
import { Wallet } from "@project-serum/anchor";

const COIN_PROG_ID = new PublicKey(
  "6KVxPWYY2Dg3iS7qPMN2CuGyUeUYdJENVhxaGZ74Ko7T"
);

const conn: Connection = new Connection("https://api.devnet.solana.com");

export async function initCoinClient(wallet?: Wallet) {
  if (wallet) {
    return new CoinClient(conn, wallet, idl as any, COIN_PROG_ID);
  } else {
    return null;
  }
}
