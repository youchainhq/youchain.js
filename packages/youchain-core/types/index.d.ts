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

import * as net from 'net';
import {
    BatchRequest,
    HttpProvider,
    HttpProviderOptions,
    IpcProvider,
    provider,
    ProvidersModuleFactory,
    WebsocketProvider,
    WebsocketProviderOptions
} from 'youchain-providers';

export class AbstractYOUChainModule {
    constructor(
        provider: provider,
        providersModuleFactory: ProvidersModuleFactory,
        methodModuleFactory: any,
        methodFactory?: any,
        options?: YOUChainModuleOptions
    );

    BatchRequest: new () => BatchRequest;
    defaultBlock: string | number;
    transactionBlockTimeout: number;
    transactionConfirmationBlocks: number;
    transactionPollingTimeout: number;
    defaultGasPrice: string;
    defaultGas: number;
    static readonly providers: Providers;
    defaultAccount: string | null;
    readonly currentProvider: HttpProvider | IpcProvider | WebsocketProvider;
    readonly givenProvider: provider | null;

    setProvider(provider: provider, net?: net.Socket): boolean;

    isSameProvider(provider: provider): boolean;

    clearSubscriptions(subscriptionType: string): Promise<boolean>;
}

export interface YOUChainModuleOptions {
    defaultAccount?: string;
    defaultBlock?: string | number;
    transactionBlockTimeout?: number;
    transactionConfirmationBlocks?: number;
    transactionPollingTimeout?: number;
    defaultGasPrice?: string;
    defaultGas?: number;
}

export interface Providers {
    HttpProvider: new (host: string, options?: HttpProviderOptions) => HttpProvider;
    WebsocketProvider: new (host: string, options?: WebsocketProviderOptions) => WebsocketProvider;
    IpcProvider: new (path: string, net: any) => IpcProvider;
}

export interface PromiEvent<T> extends Promise<T> {
    once(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>;

    once(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;

    once(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>;

    once(type: 'error', handler: (error: Error) => void): PromiEvent<T>;

    once(
        type: 'error' | 'confirmation' | 'receipt' | 'transactionHash',
        handler: (error: Error | TransactionReceipt | string) => void
    ): PromiEvent<T>;

    on(type: 'transactionHash', handler: (receipt: string) => void): PromiEvent<T>;

    on(type: 'receipt', handler: (receipt: TransactionReceipt) => void): PromiEvent<T>;

    on(type: 'confirmation', handler: (confNumber: number, receipt: TransactionReceipt) => void): PromiEvent<T>;

    on(type: 'error', handler: (error: Error) => void): PromiEvent<T>;

    on(
        type: 'error' | 'confirmation' | 'receipt' | 'transactionHash',
        handler: (error: Error | TransactionReceipt | string) => void
    ): PromiEvent<T>;
}

export interface Transaction {
    from?: string | number;
    to?: string;
    gasPrice?: string;
    gas?: number | string;
    value?: number | string;
    networkId?: number;
    data?: string;
    nonce?: number;
    v?: string;
    r?: string;
    s?: string;
    hash?: string;
}

export interface RLPEncodedTransaction {
    raw: string;
    tx: Transaction;
}

export interface TransactionReceipt {
    status: boolean;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string;
    contractAddress: string;
    cumulativeGasUsed: number;
    gasUsed: number;
    logs?: Log[];
    events?: {
        [eventName: string]: EventLog;
    };
}

export interface EventLog {
    event: string;
    address: string;
    returnValues: object;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
    raw?: {data: string; topics: any[]};
}

export interface Log {
    address: string;
    data: string;
    topics: Array<string | string[]>;
    logIndex: number;
    transactionIndex: number;
    transactionHash: string;
    blockHash: string;
    blockNumber: number;
}

export interface TxPoolContent {
    pending: TxPool;
    queued: TxPool;
}

export interface TxPoolInspect {
    pending: TxPool;
    queued: TxPool;
}

export interface TxPool {
    [address: string]: {
        [nonce: number]: string[] | Transaction[];
    };
}

export interface TxPoolStatus {
    pending: number;
    queued: number;
}

export interface Validator {
    mainAddress?: string;
    identify?: string;
    operatorAddress?: string;
    coinbase?: string;
    token?: number | string;
    stake?: number | string;
    status?: string;
    mainPubKey?: string;
    blsPubKey?: string;
    role?: number;
    rewardsBase?: string;
    rewardsTotal?: string;
    expelled?: boolean;
    expelledExpired?: string;
}

export interface ValidatorsStat {
    token?: string;
    stake?: string;
    count?: number;
    offlineStake?: number | string;
    offlineToken?: number | string;
    offlineCount?: number | string;
    lastSettle?: number | string;
    rewardsResidue?: string;
    rewardsLevel?: string;
    rewardsTotal?: string;
}

export interface ValidatorRewardsInfo {
    settled?: string;
    pending?: string;
}

export interface ValidatorWithdrawRecord {
    validatorId?: string;
    nonce?: number | string;
    operatorAddress?: string;
    recipient?: string;
    creationHeight?: number | string;
    completionTime?: string;
    initialBalance?: string;
    finalBalance?: string;
    finished?: number;
}

export interface BroadcastValidatorBase {
    nonce?: string;
    from?: string;
    to?: string;
    gasPrice?: number | string;
    gas?: number | string;
    value?: string;
}

export interface BroadcastCreateValidatorInfo extends BroadcastValidatorBase {
    name?: string;
    operator?: string;
    coinbase?: string;
    mainPubKey?: string;
    blsPubKey?: string;
    role?: string;
}

export interface BroadcastUpdateValidatorInfo extends BroadcastValidatorBase {
    mainAddress?: string;
    operator?: string;
    coinbase?: string;
}

export interface BroadcastWithdrawValidatorInfo extends BroadcastValidatorBase {
    mainAddress?: string;
    recipient?: string;
}

export interface BroadcastChangeStatusValidatorInfo extends BroadcastValidatorBase {
    mainAddress?: string;
    status?: string;
}

export interface BroadcastSettleValidatorInfo extends BroadcastValidatorBase {
    mainAddress?: string;
}

export interface ValKeyInfo {
    address?: string;
    mainPubKey?: string;
    blsPubKey?: string;
}
