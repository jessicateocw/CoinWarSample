import { Connection, PublicKey } from "@solana/web3.js";

export class AccountUtils {
  conn: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  // --------------------------------------- PDA

  async findProgramAddress(
    seeds: (PublicKey | Uint8Array | string)[],
    programId: PublicKey
  ): Promise<[PublicKey, number]> {
    const seed_bytes = seeds.map((s) => {
      if (typeof s == "string") {
        return Buffer.from(s);
      } else if ("toBytes" in s) {
        return s.toBytes();
      } else {
        return s;
      }
    });
    return await PublicKey.findProgramAddress(seed_bytes, programId);
  }
}
