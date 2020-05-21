/*
    This file is part of youchain.js.

    youchain.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    youchain.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with youchain.js.  If not, see <http://www.gnu.org/licenses/>.
*/

import ModuleFactory from './factories/ModuleFactory';
import {SubscriptionsFactory} from 'youchain-core-subscriptions';
import {formatters} from 'youchain-core-helpers';
import * as Utils from 'youchain-utils';

/**
 * Returns the ModuleFactory of the method module
 *
 * @param {Accounts} accounts
 *
 * @returns {ModuleFactory}
 *
 * @constructor
 */
export const MethodModuleFactory = (accounts) => {
    return new ModuleFactory(accounts, new SubscriptionsFactory(), Utils, formatters);
};

export AbstractMethod from '../lib/methods/AbstractMethod';
export AbstractMethodFactory from '../lib/factories/AbstractMethodFactory';

// Network
export GetProtocolVersionMethod from './methods/network/GetProtocolVersionMethod';
export VersionMethod from './methods/network/VersionMethod';
export ListeningMethod from './methods/network/ListeningMethod';
export PeerCountMethod from './methods/network/PeerCountMethod';

// Node
export GetNodeInfoMethod from './methods/node/GetNodeInfoMethod';
export GetCoinbaseMethod from './methods/node/GetCoinbaseMethod';
export IsMiningMethod from './methods/node/IsMiningMethod';
export IsSyncingMethod from './methods/node/IsSyncingMethod';
export GetGasPriceMethod from './methods/node/GetGasPriceMethod';
export GetNetworkIdMethod from './methods/node/GetNetworkIdMethod';
export GetProofMethod from './methods/node/GetProofMethod';

// Account
export GetAccountsMethod from './methods/account/GetAccountsMethod';
export GetBalanceMethod from './methods/account/GetBalanceMethod';
export GetTransactionCountMethod from './methods/account/GetTransactionCountMethod';
export RequestAccountsMethod from './methods/account/RequestAccountsMethod';

// Block
export GetBlockNumberMethod from './methods/block/GetBlockNumberMethod';
export GetBlockMethod from './methods/block/GetBlockMethod';
export GetBlockTransactionCountMethod from './methods/block/GetBlockTransactionCountMethod';

// Transaction
export GetTransactionMethod from './methods/transaction/GetTransactionMethod';
export GetTransactionFromBlockMethod from './methods/transaction/GetTransactionFromBlockMethod';
export GetTransactionReceipt from './methods/transaction/GetTransactionReceiptMethod';
export SendRawTransactionMethod from './methods/transaction/SendRawTransactionMethod';
export SignTransactionMethod from './methods/transaction/SignTransactionMethod';
export SendTransactionMethod from './methods/transaction/SendTransactionMethod';

// Global
export GetCodeMethod from './methods/GetCodeMethod';
export SignMethod from './methods/SignMethod';
export CallMethod from './methods/CallMethod';
export GetStorageAtMethod from './methods/GetStorageAtMethod';
export EstimateGasMethod from './methods/EstimateGasMethod';
export GetPastLogsMethod from './methods/GetPastLogsMethod';
export GetSha3Method from './methods/GetSha3Method';

// Personal
export EcRecoverMethod from './methods/personal/EcRecoverMethod';
export ImportRawKeyMethod from './methods/personal/ImportRawKeyMethod';
export ListAccountsMethod from './methods/personal/ListAccountsMethod';
export LockAccountMethod from './methods/personal/LockAccountMethod';
export NewAccountMethod from './methods/personal/NewAccountMethod';
export PersonalSendTransactionMethod from './methods/personal/PersonalSendTransactionMethod';
export PersonalSignMethod from './methods/personal/PersonalSignMethod';
export PersonalSignTransactionMethod from './methods/personal/PersonalSignTransactionMethod';
export UnlockAccountMethod from './methods/personal/UnlockAccountMethod';
export NewValKeyMethod from './methods/personal/NewValKeyMethod';
export ExportValKeyMethod from './methods/personal/ExportValKeyMethod';
export ImportValKeyMethod from './methods/personal/ImportValKeyMethod';
export UseValKeyMethod from './methods/personal/UseValKeyMethod';
export DelValKeyMethod from './methods/personal/DelValKeyMethod';
export LockValKeyMethod from './methods/personal/LockValKeyMethod';

// TxPool
export ContentMethod from './methods/txpool/ContentMethod';
export InspectMethod from './methods/txpool/InspectMethod';
export StatusMethod from './methods/txpool/StatusMethod';

// Pool
export GetPoolNonceMethod from './methods/pool/GetPoolNonceMethod';
export GetPoolTransactionMethod from './methods/pool/GetPoolTransactionMethod';

// Staking
export GetValidators from './methods/staking/GetValidators';
export GetValidatorByMainAddress from './methods/staking/GetValidatorByMainAddress';
export GetValidatorsStat from './methods/staking/GetValidatorsStat';
export GetValidatorRewardsInfo from './methods/staking/GetValidatorRewardsInfo';
export CreateValidator from './methods/staking/CreateValidator';
export ChangeStatusValidator from './methods/staking/ChangeStatusValidator';
export DepositValidator from './methods/staking/DepositValidator';
export WithdrawValidator from './methods/staking/WithdrawValidator';
export SettleValidator from './methods/staking/SettleValidator';
export UpdateValidator from './methods/staking/UpdateValidator';
export GetWithdrawRecords from './methods/staking/GetWithdrawRecords';
