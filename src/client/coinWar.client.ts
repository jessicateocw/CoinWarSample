import * as anchor from "@project-serum/anchor";
import { Idl, AnchorProvider } from "@project-serum/anchor";
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { AccountUtils } from "./common";
import { CoinWar } from "./data/coin_war";

//global dev var
const USDC_DEV = new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

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

  async createPool(manager: PublicKey, poolName: string, mintKey: PublicKey) {
    const [poolTokenAccount] = await this.findProgramAddress(
      [
        manager.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("pool_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode(poolName))],
      this.coinProgram.programId
    );

    const utf8 = require("utf8");

    var pool = utf8.encode(poolName);

    const createPoolIx = await this.coinProgram.methods
      .createPool(pool)
      .accounts({
        owner: manager,
        pool: poolAccount,
        poolTokenAccount,
        mintAddress: USDC_DEV,
      })
      .rpc();
    return { createPoolIx, poolTokenAccount };
  }

  async createUser(initializer: PublicKey) {
    const [userAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("user")),
      ],
      this.coinProgram.programId
    );

    const [userTokenAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("user_wallet")),
      ],
      this.coinProgram.programId
    );

    const createUserIx = await this.coinProgram.methods
      .createUser()
      .accounts({
        initializer: initializer,
        user: userAccount,
        userTokenAccount: userTokenAccount,
        mintAddress: USDC_DEV,
      })
      .rpc();
    return { createUserIx };
  }

  async deposit(
    initializer: PublicKey,
    amount: number,
    prediction: number,
    poolName: string
  ) {
    const [userAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("user")),
      ],
      this.coinProgram.programId
    );

    const [userTokenAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("user_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolTokenAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("pool_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode(poolName))],
      this.coinProgram.programId
    );

    const depositIx = await this.coinProgram.methods
      .deposit(amount, prediction)
      .accounts({
        initializer: initializer,
        user: userAccount,
        userTokenAccount: userTokenAccount,
        pool: poolAccount,
        poolTokenAccount: poolTokenAccount,
        mintAddress: USDC_DEV,
      })
      .rpc();
    return { depositIx };
  }

  async selectWinningPool(
    poolNames: string,
    poolPredictions: number[],
    poolCoinPrice: number[]
  ) {
    const selectedWinnerPoolIx = await this.coinProgram.methods
      .selectWinningPool(poolNames, poolPredictions, poolCoinPrice)
      .accounts({
        clock: SYSVAR_CLOCK_PUBKEY,
      })
      .rpc();
    return { selectedWinnerPoolIx };
  }

  async payWinningPoolUser(
    owner: PublicKey,
    initializer: PublicKey,
    poolName: string,
    prizeAmount: number
  ) {
    const [userAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("user")),
      ],
      this.coinProgram.programId
    );

    const [userTokenAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("user_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolTokenAccount] = await this.findProgramAddress(
      [
        initializer.toBytes(),
        Buffer.from(anchor.utils.bytes.utf8.encode("pool_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode(poolName))],
      this.coinProgram.programId
    );

    const payWinningPoolUserIx = await this.coinProgram.methods
      .payWinningPoolUser(poolName, prizeAmount)
      .accounts({
        owner: initializer,
        user: userAccount,
        userTokenAccount: userTokenAccount,
        pool: poolAccount,
        poolTokenAccount: poolTokenAccount,
        mintAddress: USDC_DEV,
      })
      .rpc();
    return { payWinningPoolUserIx };
  }
}
