export type CoinWar = {
  "version": "0.1.0",
  "name": "coin_war",
  "instructions": [
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAcccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolName",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "selectWinningPool",
      "accounts": [
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolNames",
          "type": "bytes"
        },
        {
          "name": "poolTotal",
          "type": {
            "vec": "f64"
          }
        }
      ],
      "returns": "string"
    },
    {
      "name": "payWinningPoolUser",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolName",
          "type": "string"
        },
        {
          "name": "prizeAmount",
          "type": "f64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transaction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transaction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "lastUpdateTimestamp",
            "type": "i64"
          },
          {
            "name": "totalDeposit",
            "type": "f64"
          },
          {
            "name": "userCount",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameId",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "winningPool",
            "type": "u8"
          },
          {
            "name": "winningAmount",
            "type": "f64"
          },
          {
            "name": "totalPrize",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "transaction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "amount",
            "type": "f64"
          },
          {
            "name": "transactionType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userGameHistory",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameId",
            "type": "u64"
          },
          {
            "name": "winning",
            "type": "f64"
          },
          {
            "name": "userId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "gameHistory",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameId",
            "type": "u64"
          },
          {
            "name": "winningPool",
            "type": "u8"
          },
          {
            "name": "winning",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "u8"
          },
          {
            "name": "balance",
            "type": "f64"
          },
          {
            "name": "lastActive",
            "type": "i64"
          },
          {
            "name": "gameHistoryCount",
            "type": "u64"
          },
          {
            "name": "currentAverageBalance",
            "type": "f64"
          },
          {
            "name": "currentWeightedBalance",
            "type": "f64"
          },
          {
            "name": "currentWeightedDays",
            "type": "i64"
          },
          {
            "name": "txnCount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TransactionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdrawal"
          }
        ]
      }
    },
    {
      "name": "Pools",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Solana"
          },
          {
            "name": "BNB"
          },
          {
            "name": "Polygon"
          },
          {
            "name": "Ethereum"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidWithdrawal",
      "msg": "You have no balance in the pool to withdraw."
    },
    {
      "code": 6001,
      "name": "InsufficientBalance",
      "msg": "You have insufficient balance for this withdrawal."
    },
    {
      "code": 6002,
      "name": "MultiplePoolNotAllowed",
      "msg": "You can only contribute to one pool at a time."
    },
    {
      "code": 6003,
      "name": "PoolAlreadyCreated",
      "msg": "This pool has already been created."
    },
    {
      "code": 6004,
      "name": "WalletToWithdrawFromInvalid",
      "msg": "Wallet to withdraw from is not owned by owner."
    },
    {
      "code": 6005,
      "name": "TransactionTypeUnknown",
      "msg": "Unknown transaction type."
    },
    {
      "code": 6006,
      "name": "PoolUnknown",
      "msg": "Unknown pool."
    },
    {
      "code": 6007,
      "name": "PaymentFailed",
      "msg": "Payment failed."
    },
    {
      "code": 6008,
      "name": "PoolsInWrongOrder",
      "msg": "Pools in wrong order."
    }
  ]
};

export const IDL: CoinWar = {
  "version": "0.1.0",
  "name": "coin_war",
  "instructions": [
    {
      "name": "createPool",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAcccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolName",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createUser",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "selectWinningPool",
      "accounts": [
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolNames",
          "type": "bytes"
        },
        {
          "name": "poolTotal",
          "type": {
            "vec": "f64"
          }
        }
      ],
      "returns": "string"
    },
    {
      "name": "payWinningPoolUser",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "poolName",
          "type": "string"
        },
        {
          "name": "prizeAmount",
          "type": "f64"
        }
      ]
    },
    {
      "name": "withdraw",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transaction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f64"
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "poolTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "transaction",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAddress",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "pool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "isInitialized",
            "type": "bool"
          },
          {
            "name": "lastUpdateTimestamp",
            "type": "i64"
          },
          {
            "name": "totalDeposit",
            "type": "f64"
          },
          {
            "name": "userCount",
            "type": "u64"
          },
          {
            "name": "name",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "game",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameId",
            "type": "u64"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "winningPool",
            "type": "u8"
          },
          {
            "name": "winningAmount",
            "type": "f64"
          },
          {
            "name": "totalPrize",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "transaction",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "amount",
            "type": "f64"
          },
          {
            "name": "transactionType",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "userGameHistory",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameId",
            "type": "u64"
          },
          {
            "name": "winning",
            "type": "f64"
          },
          {
            "name": "userId",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "gameHistory",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "gameId",
            "type": "u64"
          },
          {
            "name": "winningPool",
            "type": "u8"
          },
          {
            "name": "winning",
            "type": "f64"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pool",
            "type": "u8"
          },
          {
            "name": "balance",
            "type": "f64"
          },
          {
            "name": "lastActive",
            "type": "i64"
          },
          {
            "name": "gameHistoryCount",
            "type": "u64"
          },
          {
            "name": "currentAverageBalance",
            "type": "f64"
          },
          {
            "name": "currentWeightedBalance",
            "type": "f64"
          },
          {
            "name": "currentWeightedDays",
            "type": "i64"
          },
          {
            "name": "txnCount",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "TransactionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdrawal"
          }
        ]
      }
    },
    {
      "name": "Pools",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Solana"
          },
          {
            "name": "BNB"
          },
          {
            "name": "Polygon"
          },
          {
            "name": "Ethereum"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidWithdrawal",
      "msg": "You have no balance in the pool to withdraw."
    },
    {
      "code": 6001,
      "name": "InsufficientBalance",
      "msg": "You have insufficient balance for this withdrawal."
    },
    {
      "code": 6002,
      "name": "MultiplePoolNotAllowed",
      "msg": "You can only contribute to one pool at a time."
    },
    {
      "code": 6003,
      "name": "PoolAlreadyCreated",
      "msg": "This pool has already been created."
    },
    {
      "code": 6004,
      "name": "WalletToWithdrawFromInvalid",
      "msg": "Wallet to withdraw from is not owned by owner."
    },
    {
      "code": 6005,
      "name": "TransactionTypeUnknown",
      "msg": "Unknown transaction type."
    },
    {
      "code": 6006,
      "name": "PoolUnknown",
      "msg": "Unknown pool."
    },
    {
      "code": 6007,
      "name": "PaymentFailed",
      "msg": "Payment failed."
    },
    {
      "code": 6008,
      "name": "PoolsInWrongOrder",
      "msg": "Pools in wrong order."
    }
  ]
};
