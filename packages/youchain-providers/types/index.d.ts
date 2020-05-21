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
import {AbstractYOUChainModule} from 'youchain-core';
import {AbstractMethod} from 'youchain-core-method';

export class BatchRequest {
    constructor(moduleInstance: AbstractYOUChainModule);

    add(method: AbstractMethod): void;

    execute(): Promise<{methods: AbstractMethod[]; response: object[]} | Error[]>;
}

export class ProviderDetector {
    detect(): provider | undefined;
}

export class ProvidersModuleFactory {
    createBatchRequest(moduleInstance: AbstractYOUChainModule): BatchRequest;

    createProviderResolver(): ProviderResolver;

    createProviderDetector(): ProviderDetector;

    createHttpProvider(url: string): HttpProvider;

    createWebsocketProvider(url: string): WebsocketProvider;

    createIpcProvider(path: string, net: net.Server): IpcProvider;
}

export class HttpProvider {
    constructor(host: string, options?: HttpProviderOptions);

    host: string;
    connected: boolean;

    send(method: string, parameters: any[]): Promise<object>;

    sendBatch(methods: AbstractMethod[], moduleInstance: AbstractYOUChainModule): Promise<object[]>;

    disconnect(): boolean;
}

export class IpcProvider extends AbstractSocketProvider {
    constructor(path: string, net: net.Server);
}

export class AbstractSocketProvider {
    constructor(connection: any, timeout?: number);

    host: string;
    connected: boolean;

    registerEventListeners(): void;

    send(method: string, parameters: any[]): Promise<object>;

    sendBatch(methods: AbstractMethod[], moduleInstance: AbstractYOUChainModule): Promise<object[]>;

    subscribe(subscribeMethod: string, subscriptionMethod: string, parameters: []): Promise<string>;

    unsubscribe(subscriptionId: string, unsubscribeMethod: string): Promise<boolean>;

    clearSubscriptions(unsubscribeMethod: string): Promise<boolean>;

    on(type: string, callback: () => void): void;

    removeListener(type: string, callback: () => void): void;

    removeAllListeners(type: string): void;

    reset(): void;

    reconnect(): void;

    disconnect(code: number, reason: string): void;
}
export class WebsocketProvider extends AbstractSocketProvider {
    constructor(host: string, options?: WebsocketProviderOptions);

    isConnecting(): boolean;
}

export class JsonRpcMapper {
    static toPayload(method: string, params: any[]): JsonRpcPayload;
}

export class ProviderResolver {
    constructor(providersPackageFactory: ProvidersModuleFactory);

    resolve(provider: provider, net: net.Socket): provider;
}

export class JsonRpcResponseValidator {
    static validate(response: JsonRpcPayload[] | JsonRpcPayload, payload?: object): boolean;

    static isResponseItemValid(response: JsonRpcPayload): boolean;
}

export type provider = HttpProvider | IpcProvider | WebsocketProvider | string;

export interface JsonRpcPayload {
    jsonrpc: string;
    method: string;
    params: any[];
    id?: string | number;
}

export interface HttpProviderOptions {
    host?: string;
    timeout?: number;
    headers?: {};
}

export interface WebsocketProviderOptions {
    host?: string;
    timeout?: number;
    headers?: {};
    protocol?: string;
    clientConfig?: string;
}
