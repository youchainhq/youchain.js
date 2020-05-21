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

import {
    AbstractMethodFactory,
    GetNodeInfoMethod,
    GetProtocolVersionMethod,
    GetCoinbaseMethod,
    IsMiningMethod,
    IsSyncingMethod,
    GetGasPriceMethod,
    GetAccountsMethod,
    GetBlockNumberMethod,
    GetBalanceMethod,
    GetStorageAtMethod,
    GetCodeMethod,
    GetSha3Method,
    GetBlockMethod,
    GetBlockTransactionCountMethod,
    GetTransactionMethod,
    GetTransactionFromBlockMethod,
    GetTransactionReceipt,
    GetTransactionCountMethod,
    SendRawTransactionMethod,
    SignTransactionMethod,
    SendTransactionMethod,
    SignMethod,
    CallMethod,
    EstimateGasMethod,
    GetPastLogsMethod,
    RequestAccountsMethod,
    GetNetworkIdMethod,
    GetProofMethod,
    GetPoolNonceMethod,
    GetPoolTransactionMethod,
    GetValidators,
    GetValidatorByMainAddress,
    GetValidatorsStat,
    GetValidatorRewardsInfo,
    CreateValidator,
    ChangeStatusValidator,
    DepositValidator,
    WithdrawValidator,
    SettleValidator,
    UpdateValidator,
    GetWithdrawRecords
} from 'youchain-core-method';

export default class MethodFactory extends AbstractMethodFactory {
    /**
     * @param {MethodModuleFactory} methodModuleFactory
     * @param {Utils} utils
     * @param {Object} formatters
     *
     * @constructor
     */
    constructor(methodModuleFactory, utils, formatters) {
        super(methodModuleFactory, utils, formatters);

        this.methods = {
            getNodeInfo: GetNodeInfoMethod,
            getProtocolVersion: GetProtocolVersionMethod,
            getCoinbase: GetCoinbaseMethod,
            isMining: IsMiningMethod,
            isSyncing: IsSyncingMethod,
            getGasPrice: GetGasPriceMethod,
            getAccounts: GetAccountsMethod,
            getBlockNumber: GetBlockNumberMethod,
            getBalance: GetBalanceMethod,
            getStorageAt: GetStorageAtMethod,
            getCode: GetCodeMethod,
            getSha3: GetSha3Method,
            getBlock: GetBlockMethod,
            getBlockTransactionCount: GetBlockTransactionCountMethod,
            getTransaction: GetTransactionMethod,
            getTransactionFromBlock: GetTransactionFromBlockMethod,
            getTransactionReceipt: GetTransactionReceipt,
            getTransactionCount: GetTransactionCountMethod,
            sendSignedTransaction: SendRawTransactionMethod,
            // signTransaction: SignTransactionMethod,
            sendTransaction: SendTransactionMethod,
            sign: SignMethod,
            call: CallMethod,
            estimateGas: EstimateGasMethod,
            getPastLogs: GetPastLogsMethod,
            // requestAccounts: RequestAccountsMethod,
            getNetworkId: GetNetworkIdMethod,
            getProof: GetProofMethod,
            getPoolNonce: GetPoolNonceMethod,
            getPoolTransaction: GetPoolTransactionMethod,
            getValidators: GetValidators,
            getValidatorByMainAddress: GetValidatorByMainAddress,
            getValidatorsStat: GetValidatorsStat,
            getValidatorRewardsInfo: GetValidatorRewardsInfo,
            createValidator: CreateValidator,
            changeStatusValidator: ChangeStatusValidator,
            depositValidator: DepositValidator,
            withdrawValidator: WithdrawValidator,
            settleValidator: SettleValidator,
            updateValidator: UpdateValidator,
            getWithdrawRecords: GetWithdrawRecords
        };
    }
}
