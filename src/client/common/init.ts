import { Connection, PublicKey } from "@solana/web3.js";
import { CoinClient } from "../coinWar.client";
import * as idl from "../data/coin_war.json";
import { Wallet } from "@project-serum/anchor";

const COIN_PROG_ID = new PublicKey(
  "AQNeXDvz9BzvUwrspXeyMV8WUdu6HbyRyjj1SdKEkCbQ"
);

export const conn: Connection = new Connection("https://api.devnet.solana.com");

export async function initCoinClient(wallet: Wallet) {
  return new CoinClient(conn, wallet, idl as any, COIN_PROG_ID);
}
