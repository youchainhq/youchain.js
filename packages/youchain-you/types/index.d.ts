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

import {provider} from 'youchain-providers';
import {
    AbstractYOUChainModule,
    Log,
    PromiEvent,
    RLPEncodedTransaction,
    Transaction,
    TransactionReceipt,
    YOUChainModuleOptions,
    Validator,
    ValidatorsStat,
    ValidatorRewardsInfo,
    ValidatorWithdrawRecord,
    BroadcastValidatorBase,
    BroadcastCreateValidatorInfo,
    BroadcastUpdateValidatorInfo,
    BroadcastWithdrawValidatorInfo,
    BroadcastChangeStatusValidatorInfo,
    BroadcastSettleValidatorInfo
} from 'youchain-core';
import {Contract, ContractOptions} from 'youchain-you-contract';
import {Accounts} from 'youchain-you-accounts';
import {AbiCoder} from 'youchain-you-abi';
import {Network} from 'youchain-net';
import {Personal} from 'youchain-you-personal';
import {AbiItem} from 'youchain-utils';

export class YOU extends AbstractYOUChainModule {
    constructor(provider: provider, options?: YOUChainModuleOptions);

    Contract: new (jsonInterface: AbiItem[] | AbiItem, address?: string, options?: ContractOptions) => Contract;
    personal: Personal;
    accounts: Accounts;
    abi: AbiCoder;
    net: Network;

    clearSubscriptions(): Promise<boolean>;

    subscribe(type: 'logs', options?: Logs): Promise<Subscribe<Log>>;
    subscribe(type: 'logs', callback?: (error: Error, result: Subscribe<Log>) => void): Promise<Subscribe<Log>>;
    subscribe(
        type: 'logs',
        options?: Logs,
        callback?: (error: Error, result: Subscribe<Log>) => void
    ): Promise<Subscribe<Log>>;
    subscribe(type: 'syncing', callback?: (error: Error, result: Subscribe<any>) => void): Promise<Subscribe<any>>;
    subscribe(
        type: 'newBlockHeaders',
        callback?: (error: Error, result: Subscribe<BlockHeader>) => void
    ): Promise<Subscribe<BlockHeader>>;
    subscribe(
        type: 'pendingTransactions',
        callback?: (error: Error, result: Subscribe<Transaction>) => void
    ): Promise<Subscribe<Transaction>>;

    getProtocolVersion(callback?: (error: Error, protocolVersion: string) => void): Promise<string>;

    isSyncing(callback?: (error: Error, syncing: Syncing) => void): Promise<Syncing | boolean>;

    getCoinbase(callback?: (error: Error, coinbaseAddress: string) => void): Promise<string>;

    isMining(callback?: (error: Error, mining: boolean) => void): Promise<boolean>;

    getGasPrice(callback?: (error: Error, gasPrice: string) => void): Promise<string>;

    getAccounts(callback?: (error: Error, accounts: string[]) => void): Promise<string[]>;

    getBlockNumber(callback?: (error: Error, blockNumber: number) => void): Promise<number>;

    getBalance(address: string): Promise<string>;
    getBalance(address: string, defaultBlock: string | number): Promise<string>;
    getBalance(address: string, callback?: (error: Error, balance: string) => void): Promise<string>;
    getBalance(
        address: string,
        defaultBlock: string | number,
        callback?: (error: Error, balance: string) => void
    ): Promise<string>;

    getStorageAt(address: string, position: number): Promise<string>;
    getStorageAt(address: string, position: number, defaultBlock: number | string): Promise<string>;
    getStorageAt(
        address: string,
        position: number,
        callback?: (error: Error, storageAt: string) => void
    ): Promise<string>;
    getStorageAt(
        address: string,
        position: number,
        defaultBlock: number | string,
        callback?: (error: Error, storageAt: string) => void
    ): Promise<string>;

    getCode(address: string): Promise<string>;
    getCode(address: string, defaultBlock: string | number): Promise<string>;
    getCode(address: string, callback?: (error: Error, code: string) => void): Promise<string>;
    getCode(
        address: string,
        defaultBlock: string | number,
        callback?: (error: Error, code: string) => void
    ): Promise<string>;

    getSha3(data: string): Promise<string>;
    getSha3(data: string, callback?: (error: Error, data: string) => void): Promise<string>;

    getBlock(blockHashOrBlockNumber: string | number): Promise<Block>;
    getBlock(blockHashOrBlockNumber: string | number, returnTransactionObjects: boolean): Promise<Block>;
    getBlock(blockHashOrBlockNumber: string | number, callback?: (error: Error, block: Block) => void): Promise<Block>;
    getBlock(
        blockHashOrBlockNumber: string | number,
        returnTransactionObjects: boolean,
        callback?: (error: Error, block: Block) => void
    ): Promise<Block>;

    getBlockTransactionCount(
        blockHashOrBlockNumber: string | number,
        callback?: (error: Error, numberOfTransactions: number) => void
    ): Promise<number>;

    getTransaction(
        transactionHash: string,
        callback?: (error: Error, transaction: Transaction) => void
    ): Promise<Transaction>;

    getTransactionFromBlock(
        hashStringOrNumber: string | number,
        indexNumber: number,
        callback?: (error: Error, transaction: Transaction) => void
    ): Promise<Transaction>;

    getTransactionReceipt(
        hash: string,
        callback?: (error: Error, transactionReceipt: TransactionReceipt) => void
    ): Promise<TransactionReceipt>;

    getTransactionCount(address: string): Promise<number>;
    getTransactionCount(address: string, defaultBlock: number | string): Promise<number>;
    getTransactionCount(address: string, callback?: (error: Error, count: number) => void): Promise<number>;
    getTransactionCount(
        address: string,
        defaultBlock: number | string,
        callback?: (error: Error, count: number) => void
    ): Promise<number>;

    sendTransaction(
        transaction: Transaction,
        callback?: (error: Error, hash: string) => void
    ): PromiEvent<TransactionReceipt>;

    sendSignedTransaction(
        signedTransactionData: string,
        callback?: (error: Error, gas: string) => void
    ): PromiEvent<TransactionReceipt>;

    sign(
        dataToSign: string,
        address: string | number,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    /*signTransaction(
        transaction: Transaction,
        callback?: (error: Error, signedTransaction: RLPEncodedTransaction) => void
    ): Promise<RLPEncodedTransaction>;
    signTransaction(transaction: Transaction, address: string): Promise<RLPEncodedTransaction>;
    signTransaction(
        transaction: Transaction,
        address: string,
        callback: (error: Error, signedTransaction: RLPEncodedTransaction) => void
    ): Promise<RLPEncodedTransaction>;*/

    call(transaction: Transaction): Promise<string>;
    call(transaction: Transaction, defaultBlock?: number | string): Promise<string>;
    call(transaction: Transaction, callback?: (error: Error, data: string) => void): Promise<string>;
    call(
        transaction: Transaction,
        defaultBlock: number | string,
        callback: (error: Error, data: string) => void
    ): Promise<string>;

    estimateGas(transaction: Transaction, callback?: (error: Error, gas: number) => void): Promise<number>;

    getPastLogs(options: PastLogsOptions, callback?: (error: Error, logs: Log[]) => void): Promise<Log[]>;

    getNetworkId(callback?: (error: Error, networkId: number) => void): Promise<number>;

    getProof(address: string, storageKey: string[], blockNumber: number | string | 'latest' | 'earliest', callback?: (error: Error, result: GetProof) => void): Promise<GetProof>;

    getPoolNonce(address: string, callback?: (error: Error, poolNonce: number) => void): Promise<number>;

    getPoolTransaction(transactionHash: string, callback?: (error: Error, transaction: Transaction) => void): Promise<Transaction>;

    getValidators(role: number, page: number, pageSize: number, blockNumber: string | number, callback?: (error: Error, validators: Validator[]) => void): Promise<Validator[]>;

    getValidatorByMainAddress(blockNumber: string | number, mainAddress: string, callback?: (error: Error, validator: Validator) => void): Promise<Validator>;

    getValidatorsStat(blockNumber: string | number, callback?: (error: Error, stat: Map<string, ValidatorsStat>) => void): Promise<Map<string, ValidatorsStat>>;

    getValidatorRewardsInfo(blockNumber: string | number, mainAddress: string, callback?: (error: Error, info: ValidatorRewardsInfo) => void): Promise<ValidatorRewardsInfo>;

    createValidator(name?: string,
                    operator?: string,
                    coinbase?: string,
                    mainPubKey?: string,
                    blsPubKey?: string,
                    value?: string,
                    role?: number,
                    nonce?: number, callback?: (error: Error, result: string) => void): Promise<string>;

    changeStatusValidator(identify?: string,
                          status?: number,
                          nonce?: number, callback?: (error: Error, result: string) => void): Promise<string>;

    depositValidator(identify?: string,
                     value?: string,
                     nonce?: number, callback?: (error: Error, result: string) => void): Promise<string>;

    withdrawValidator(mainAddress?: string,
                      recipient?: string,
                      value?: string,
                      nonce?: number, callback?: (error: Error, result: string) => void): Promise<string>;

    settleValidator(identify?: string,
                    nonce?: number, callback?: (error: Error, result: string) => void): Promise<string>;

    updateValidator(mainAddress?: string,
                    operator?: string,
                    coinbase?: string,
                    nonce?: number, callback?: (error: Error, result: string) => void): Promise<string>;

    getWithdrawRecords(blockNumber: string | number, callback?: (error: Error, records: ValidatorWithdrawRecord[]) => void): Promise<ValidatorWithdrawRecord[]>;

}

export interface Methods {
    property?: string;
    methods: Method[];
}

export interface Method {
    name: string;
    call: string;
    params?: number;
    inputFormatter?: Array<(() => void) | null>;
    outputFormatter?: () => void;
}

export interface Syncing {
    startingBlock: number;
    currentBlock: number;
    highestBlock: number;
    knownStates: number;
    pulledStates: number;
}

export interface BlockHeader {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    logsBloom: string;
    transactionRoot: string;
    stateRoot: string;
    receiptRoot: string;
    miner: string;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number;
    gasRewards: string;
    consensus: string;
    slashData: string;
    bltRoot: string;
    chtRoot: string;
    valRoot: string;
    certificate: string;
    signature: string;
    validator: string;
    version: string;
    nextVersion: string;
    nextApprovals: string;
    nextVoteBefore: string;
    nextSwitchOn: string;
}

export interface Block extends BlockHeader {
    transactions: Transaction[];
    size: number;
    difficulty: number;
    totalDifficulty: number;
}

export interface PastLogsOptions {
    fromBlock?: number | string;
    toBlock?: number | string;
    address: string | string[];
    topics?: Array<string | string[]>;
}

export interface Logs {
    fromBlock?: number;
    address?: string;
    topics?: Array<string | string[]>;
}

export interface Subscribe<T> {
    subscription: {
        id: string;
        subscribe(callback?: (error: Error, result: Subscribe<T>) => void): Subscribe<T>;
        unsubscribe(callback?: (error: Error, result: boolean) => void): void | boolean;
        options: {};
    };

    on(type: 'data', handler: (data: T) => void): void;

    on(type: 'changed', handler: (data: T) => void): void;

    on(type: 'error', handler: (data: Error) => void): void;
}

export interface GetProof {
    jsonrpc: string;
    id: number;
    result: {
        address: string;
        accountProof: string[];
        balance: string;
        codeHash: string;
        nonce: string;
        storageHash: string;
        storageProof: StorageProof[];
    };
}

export interface StorageProof {
    key: string;
    value: string;
    proof: string[];
}
