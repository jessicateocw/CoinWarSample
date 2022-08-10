import * as anchor from "@project-serum/anchor";
import { Idl, AnchorProvider } from "@project-serum/anchor";
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { AccountUtils } from "./common";
import { CoinWar } from "./data/coin_war";

export class CoinClient extends AccountUtils {
  wallet: anchor.Wallet;
  provider!: anchor.Provider;
  coinProgram!: anchor.Program<CoinWar>;

  //initialising
  constructor(
    conn: Connection,
    wallet: anchor.Wallet,
    idl?: Idl,
    programId?: PublicKey
  ) {
    super(conn);
    this.wallet = wallet;
    this.setProvider();
    this.setCoinProgram(idl, programId);
  }

  setProvider() {
    this.provider = new AnchorProvider(
      this.conn,
      this.wallet,
      AnchorProvider.defaultOptions()
    );
    anchor.setProvider(this.provider);
  }

  setCoinProgram(idl?: Idl, programId?: PublicKey) {
    //instantiating program depends on the environment
    if (idl && programId) {
      //means running in prod
      this.coinProgram = new anchor.Program<CoinWar>(
        idl as any,
        programId,
        this.provider
      );
    }
  }

  async createPool(manager: PublicKey, poolName: number, mintKey: PublicKey) {
    const [poolTokenAcccount] = await this.findProgramAddress(
      [
        manager.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("pool-token")),
      ],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode(""))],
      this.coinProgram.programId
    );

    const createPoolIx = await this.coinProgram.methods
      .createPool(poolName)
      .accounts({
        owner: manager,
        pool: poolAccount,
        poolTokenAcccount,
        mintAddress: poolTokenAcccount,
      })
      .rpc();
    return { createPoolIx, poolTokenAcccount };
  }
}
