import * as anchor from "@project-serum/anchor";
import { Idl, AnchorProvider } from "@project-serum/anchor";
import { Connection, PublicKey, SYSVAR_CLOCK_PUBKEY } from "@solana/web3.js";
import { AccountUtils } from "./common";
import { CoinWar } from "./data/coin_war";
import * as bs58 from "bs58";

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

  async createPool(manager: PublicKey, poolName: string) {
    const [poolTokenAccount] = await this.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("pool_wallet"))],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      this.coinProgram.programId
    );

    const utf8 = require("utf8");

    var pool = utf8.encode(poolName);
    console.log('pool: ', pool);
    console.log('poolAccount: ', poolAccount.toBase58())
    console.log('poolTokenAccount: ', poolTokenAccount.toBase58())


    const createPoolIx = await this.coinProgram.methods
      .createPool(1)
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
    console.log(this.coinProgram.programId.toString(), "1")
    const [userAccount] = await this.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("user")),
        initializer.toBytes(),
      ],
      this.coinProgram.programId
      
    );

    const [userTokenAccount] = await this.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("user_wallet")),
        userAccount.toBytes(),
      ],
      this.coinProgram.programId
    );

    console.log('userAccount: ', userAccount.toBase58())

    console.log('userTokenAccount: ', userTokenAccount.toBase58())


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
        Buffer.from(anchor.utils.bytes.utf8.encode("user")),
        initializer.toBytes(),
      ],
      this.coinProgram.programId
    );

    const [userTokenAccount] = await this.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("user_wallet")),
        initializer.toBytes(),
      ],
      this.coinProgram.programId
    );

    const [poolTokenAccount] = await this.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("pool_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode("Solana"))],
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
    poolNames: string[],
    poolPredictions: number[],
    poolCoinPrices: number[]
  ) {

    console.log("enter");

    let winning_index = 0;
    let current_smallest =100000.000;

    for(let i = 0; i < poolPredictions.length; i++) {
      let delta = (poolPredictions[i] - poolCoinPrices[i]);
      if(delta < current_smallest){
        current_smallest = delta;
        winning_index = i;
      }
    }
    
    
    const selectedWinnerPoolIx = await this.coinProgram.methods
      .selectWinningPool(Buffer.from([1,2,3,4]), poolPredictions, poolCoinPrices)
      .accounts({
        clock: SYSVAR_CLOCK_PUBKEY,
      })
      .rpc();

      console.log(selectedWinnerPoolIx);
    return { selectedWinnerPoolIx, winning_index };
  }

  async payWinningPoolUser(
    // owner: PublicKey,
    initializer: PublicKey,
    poolName: string,
    prizeAmount: number
  ) {
    // const [userAccount] = await this.findProgramAddress(
    //   [
    //     initializer.toBytes(),
    //     Buffer.from(anchor.utils.bytes.utf8.encode("user")),
    //   ],
    //   this.coinProgram.programId
    // );

    // [
    //   {
    //     memcmp: {
    //       offset:
    //         8 ,// Discriminator.
    //       bytes: bs58.encode(Buffer.from("Solana")),
    //     },
    //   },
    // ]
    const userAccounts = await this.coinProgram.account.user.all();

    //console.log("us", userAccounts);

    const [poolTokenAccount] = await this.findProgramAddress(
      [
        Buffer.from(anchor.utils.bytes.utf8.encode("pool_wallet")),
      ],
      this.coinProgram.programId
    );

    const [poolAccount] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from(anchor.utils.bytes.utf8.encode(poolName))],
      this.coinProgram.programId
    );

    userAccounts.every(async (userAccount) => {
      const [userTokenAccount] = await this.findProgramAddress(
        [
          Buffer.from(anchor.utils.bytes.utf8.encode("user_wallet")),
          userAccount.publicKey.toBytes(),
        ],
        this.coinProgram.programId
      );

      const payWinningPoolUserIx = await this.coinProgram.methods
        .payWinningPoolUser(userAccount.publicKey,poolName, prizeAmount)
        .accounts({
          owner: initializer,
          user: userAccount.publicKey,
          userTokenAccount: userTokenAccount,
          pool: poolAccount,
          poolTokenAccount: poolTokenAccount,
          mintAddress: USDC_DEV,
        })
        .rpc();
      return { payWinningPoolUserIx };
    });

    //return { payWinningPoolUserIx };
  }
}
