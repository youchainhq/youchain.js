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
import {ProvidersModuleFactory, HttpProvider, IpcProvider, WebsocketProvider} from 'youchain-providers';
import {AbstractYOUChainModule, YOUChainModuleOptions} from 'youchain-core';

const options = {
    timeout: 20000,
    headers: [
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        }
    ]
};
const httpProvider = new HttpProvider('http://localhost:8283', options);
const ipcProvider = new IpcProvider('/Users/myuser/Library/Ethereum/geth.ipc', new net.Server());
const websocketProvider = new WebsocketProvider('ws://localhost:8283');

const providersModuleFactory = new ProvidersModuleFactory();

const abstractYOUChainModule = new AbstractYOUChainModule(
    httpProvider,
    providersModuleFactory,
    {
        HttpProvider: httpProvider,
        WebsocketProvider: websocketProvider,
        IpcProvider: ipcProvider
    },
    {}
);

// $ExpectType BatchRequest
new abstractYOUChainModule.BatchRequest();

// $ExpectType string | number
abstractYOUChainModule.defaultBlock;

// $ExpectType number
abstractYOUChainModule.transactionBlockTimeout;

// $ExpectType number
abstractYOUChainModule.transactionConfirmationBlocks;

// $ExpectType number
abstractYOUChainModule.transactionPollingTimeout;

// $ExpectType string
abstractYOUChainModule.defaultGasPrice;

// $ExpectType number
abstractYOUChainModule.defaultGas;

// $ExpectType Providers
AbstractYOUChainModule.providers;

// $ExpectType string | HttpProvider | IpcProvider | WebsocketProvider | null
abstractYOUChainModule.givenProvider;

// $ExpectType string | null
abstractYOUChainModule.defaultAccount;

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider
abstractYOUChainModule.currentProvider;

// $ExpectType string | HttpProvider | IpcProvider | WebsocketProvider | null
abstractYOUChainModule.givenProvider;

// $ExpectType boolean
abstractYOUChainModule.setProvider(httpProvider);

// $ExpectType boolean
abstractYOUChainModule.setProvider('http://localhost:8283');

// $ExpectType boolean
abstractYOUChainModule.isSameProvider('http://localhost:8283');

// $ExpectType boolean
abstractYOUChainModule.isSameProvider(httpProvider);

// $ExpectType Promise<boolean>
abstractYOUChainModule.clearSubscriptions('you_unsubscribe');
