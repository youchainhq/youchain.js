# youchain-core-method

This is a sub package of [youchain.js][repo]

The Method module abstracts the JSON-RPC method and is used within most [youchain.js][repo] packages.

## Installation

```bash
npm install youchain-core-method
```

## Exported classes

```js
MethodModuleFactory;
AbstractMethod;
AbstractMethodFactory;

/**
 * Methods
 */

// Network
GetProtocolVersionMethod;
VersionMethod;
ListeningMethod;
PeerCountMethod;

// Node
GetNodeInfoMethod;
GetCoinbaseMethod;
IsMiningMethod;
IsSyncingMethod;
GetGasPriceMethod;
GetNetworkIdMethod;

// Account
GetAccountsMethod;
GetBalanceMethod;
GetTransactionCountMethod;
RequestAccountsMethod;

// Block
GetBlockNumberMethod;
GetBlockMethod;
GetBlockTransactionCountMethod;

// Transaction
GetTransactionMethod;
GetTransactionFromBlockMethod;
GetTransactionReceipt;
SendRawTransactionMethod;
SignTransactionMethod;
SendTransactionMethod;

// Global
GetCodeMethod;
SignMethod;
CallMethod;
GetStorageAtMethod;
EstimateGasMethod;
GetPastLogsMethod;
GetSha3Method;

// Personal
EcRecoverMethod;
ImportRawKeyMethod;
ListAccountsMethod;
LockAccountMethod;
NewAccountMethod;
PersonalSendTransactionMethod;
PersonalSignMethod;
PersonalSignTransactionMethod;
UnlockAccountMethod;
NewValKeyMethod;
ExportValKeyMethod;
ImportValKeyMethod;
DelValKeyMethod;
UseValKeyMethod;
LockValKeyMethod;

// TxPool
ContentMethod;
InspectMethod;
StatusMethod

// Pool
GetPoolNonceMethod;
GetPoolTransactionMethod;


// Staking
CreateValidator
UpdateValidator
GetValidatorByMainAddress
GetValidators
GetValidatorsStat
GetWithdrawRecords
WithdrawValidator
DepositValidator
SettleValidator
ChangeStatusValidator
GetValidatorRewardsInfo

```

## Types

All the typescript typings are placed in the types folder.

[repo]: https://github.com/youchainhq/youchain.js
