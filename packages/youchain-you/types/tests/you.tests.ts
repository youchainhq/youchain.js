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

import {Log, Transaction, TransactionReceipt, RLPEncodedTransaction} from 'youchain-core';
import {YOU, Subscribe, BlockHeader, Syncing, Block} from 'youchain-you';

const you = new YOU('http://localhost:8283');

// $ExpectType new (jsonInterface: AbiItem | AbiItem[], address?: string | undefined, options?: ContractOptions | undefined) => Contract
you.Contract;

// $ExpectType Personal
you.personal;

// $ExpectType Accounts
you.accounts;

// $ExpectType AbiCoder
you.abi;

// $ExpectType Network
you.net;

you.clearSubscriptions();

// $ExpectType Promise<Subscribe<Log>>
you.subscribe('logs');
// $ExpectType Promise<Subscribe<Log>>
you.subscribe('logs');
// $ExpectType Promise<Subscribe<Log>>
you.subscribe('logs', (error: Error, result: Subscribe<Log>) => {});
// $ExpectType Promise<Subscribe<Log>>
you.subscribe('logs', {});
// $ExpectType Promise<Subscribe<Log>>
you.subscribe('logs', {}, (error: Error, result: Subscribe<Log>) => {});

// $ExpectType Promise<Subscribe<any>>
you.subscribe('syncing');
// $ExpectType Promise<Subscribe<any>>
you.subscribe('syncing', (error: Error, result: Subscribe<any>) => {});

// $ExpectType Promise<Subscribe<BlockHeader>>
you.subscribe('newBlockHeaders');
// $ExpectType Promise<Subscribe<BlockHeader>>
you.subscribe('newBlockHeaders', (error: Error, result: Subscribe<BlockHeader>) => {});

// $ExpectType Promise<Subscribe<Transaction>>
you.subscribe('pendingTransactions');
// $ExpectType Promise<Subscribe<Transaction>>
you.subscribe('pendingTransactions', (error: Error, result: Subscribe<Transaction>) => {});

// $ExpectType Providers
YOU.providers;

// $ExpectType string | HttpProvider | IpcProvider | WebsocketProvider | null
you.givenProvider;

// $ExpectType BatchRequest
new you.BatchRequest();

// $ExpectType string | null
you.defaultAccount;

// $ExpectType string | number
you.defaultBlock;

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider
you.currentProvider;

// $ExpectType Promise<string>
you.getProtocolVersion();
// $ExpectType Promise<string>
you.getProtocolVersion((error: Error, protocolVersion: string) => {});

// $ExpectType Promise<boolean | Syncing>
you.isSyncing();
// $ExpectType Promise<boolean | Syncing>
you.isSyncing((error: Error, syncing: Syncing) => {});

// $ExpectType Promise<string>
you.getCoinbase();
// $ExpectType Promise<string>
you.getCoinbase((error: Error, coinbaseAddress: string) => {});

// $ExpectType Promise<boolean>
you.isMining();
// $ExpectType Promise<boolean>
you.isMining((error: Error, mining: boolean) => {});

// $ExpectType Promise<string>
you.getGasPrice();
// $ExpectType Promise<string>
you.getGasPrice((error: Error, gasPrice: string) => {});

// $ExpectType Promise<string[]>
you.getAccounts();
// $ExpectType Promise<string[]>
you.getAccounts((error: Error, accounts: string[]) => {});

// $ExpectType Promise<number>
you.getBlockNumber();
// $ExpectType Promise<number>
you.getBlockNumber((error: Error, blockNumber: number) => {});

// $ExpectType Promise<string>
you.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
you.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
you.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
you.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
you.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<string>
you.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<string>
you.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000');
// $ExpectType Promise<string>
you.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
you.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000);
// $ExpectType Promise<string>
you.getStorageAt('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2, 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<string>
you.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<string>
you.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<string>
you.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, balance: string) => {});
// $ExpectType Promise<string>
you.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<string>
you.getCode('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, balance: string) => {});

// $ExpectType Promise<Block>
you.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Block>
you.getBlock(345);
// $ExpectType Promise<Block>
you.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', true);
// $ExpectType Promise<Block>
you.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', false);
// $ExpectType Promise<Block>
you.getBlock(345);
// $ExpectType Promise<Block>
you.getBlock(345, true);
// $ExpectType Promise<Block>
you.getBlock(345, false);
// $ExpectType Promise<Block>
you.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
you.getBlock(345, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
you.getBlock(345, true, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
you.getBlock(345, false, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
you.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', true, (error: Error, block: Block) => {});
// $ExpectType Promise<Block>
you.getBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', false, (error: Error, block: Block) => {});

// $ExpectType Promise<number>
you.getBlockTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
you.getBlockTransactionCount(345);
// $ExpectType Promise<number>
you.getBlockTransactionCount(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, numberOfTransactions: number) => {}
);
// $ExpectType Promise<number>
you.getBlockTransactionCount(345);

// $ExpectType Promise<Transaction>
you.getTransaction('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<Transaction>
you.getTransaction('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, transaction: Transaction) => {});

// $ExpectType Promise<Transaction>
you.getTransactionFromBlock('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 2);
// $ExpectType Promise<Transaction>
you.getTransactionFromBlock(345, 2);
// $ExpectType Promise<Transaction>
you.getTransactionFromBlock(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    2,
    (error: Error, transaction: Transaction) => {}
);
// $ExpectType Promise<Transaction>
you.getTransactionFromBlock(345, 2, (error: Error, transaction: Transaction) => {});

// $ExpectType Promise<TransactionReceipt>
you.getTransactionReceipt('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<TransactionReceipt>
you.getTransactionReceipt(
    '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
    (error: Error, transactionReceipt: TransactionReceipt) => {}
);

// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000);
// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000');
// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, count: number) => {});
// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', (error: Error, count: number) => {});
// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', 1000, (error: Error, count: number) => {});
// $ExpectType Promise<number>
you.getTransactionCount('0x407d73d8a49eeb85d32cf465507dd71d507100c1', '1000', (error: Error, count: number) => {});

const code = '603d80600c6000396000f3007c0';

// $ExpectType PromiEvent<TransactionReceipt>
you.sendTransaction({
    from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
    data: 'code'
});
// $ExpectType PromiEvent<TransactionReceipt>
you.sendTransaction(
    {
        from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe',
        data: 'code'
    },
    (error: Error, hash: string) => {}
);

// $ExpectType PromiEvent<TransactionReceipt>
you.sendSignedTransaction('0xf889808609184e72a0008227109');
// $ExpectType PromiEvent<TransactionReceipt>
you.sendSignedTransaction('0xf889808609184e72a0008227109', (error: Error, gas: string) => {});

// $ExpectType Promise<string>
you.sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe');
// $ExpectType Promise<string>
you.sign('Hello world', 3);
// $ExpectType Promise<string>
you.sign('Hello world', '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', (error: Error, signature: string) => {});
// $ExpectType Promise<string>
you.sign('Hello world', 3, (error: Error, signature: string) => {});

// $ExpectType Promise<RLPEncodedTransaction>
you.signTransaction({
    from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    gasPrice: '20000000000',
    gas: '21000',
    to: '0x3535353535353535353535353535353535353535',
    value: '1000000000000000000',
    data: ''
});
// $ExpectType Promise<RLPEncodedTransaction>
you.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0'
);
// $ExpectType Promise<RLPEncodedTransaction>
you.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    (error: Error, signedTransaction: RLPEncodedTransaction) => {}
);
// $ExpectType Promise<RLPEncodedTransaction>
you.signTransaction(
    {
        from: '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
        gasPrice: '20000000000',
        gas: '21000',
        to: '0x3535353535353535353535353535353535353535',
        value: '1000000000000000000',
        data: ''
    },
    '0xEB014f8c8B418Db6b45774c326A0E64C78914dC0',
    (error: Error, signedTransaction: RLPEncodedTransaction) => {}
);

// $ExpectType Promise<string>
you.call({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
    data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<string>
you.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100
);
// $ExpectType Promise<string>
you.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100'
);
// $ExpectType Promise<string>
you.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
you.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    '100',
    (error: Error, data: string) => {}
);
// $ExpectType Promise<string>
you.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<string>
you.call(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe', // contract address
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    100,
    (error: Error, data: string) => {}
);

// $ExpectType Promise<number>
you.estimateGas({
    to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
});
// $ExpectType Promise<number>
you.estimateGas(
    {
        to: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        data: '0xc6888fa10000000000000000000000000000000000000000000000000000000000000003'
    },
    (error: Error, gas: number) => {}
);

// $ExpectType Promise<Log[]>
you.getPastLogs({
    address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
    topics: ['0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
});
// $ExpectType Promise<Log[]>
you.getPastLogs(
    {
        address: '0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe',
        topics: ['0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234']
    },
    (error: Error, logs: Log[]) => {}
);

// $ExpectType Promise<number>
you.getNetworkId();

// $ExpectType Promise<number>
you.getNetworkId((error: Error, networkId: number) => {});

// $ExpectType Promise<number>
you.getPoolNonce(
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
);

// $ExpectType Promise<number>
you.getPoolNonce('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    (error: Error, poolNonce: number) => {}
);

// $ExpectType Promise<Transaction>
you.getPoolTransaction(
    '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
);

// $ExpectType Promise<Transaction>
you.getPoolTransaction('0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    (error: Error, transaction: Transaction) => {}
);
