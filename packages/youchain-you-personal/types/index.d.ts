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

import {Accounts} from 'youchain-you-accounts';
import {provider} from 'youchain-providers';
import {
    AbstractYOUChainModule,
    Providers,
    RLPEncodedTransaction,
    Transaction,
    YOUChainModuleOptions,
    ValKeyInfo
} from 'youchain-core';

export class Personal extends AbstractYOUChainModule {
    constructor(provider: provider, accounts: Accounts, options?: YOUChainModuleOptions);

    newAccount(password: string, callback?: (error: Error, address: string) => void): Promise<string>;

    sign(
        dataToSign: string,
        address: string,
        password: string,
        callback?: (error: Error, signature: string) => void
    ): Promise<string>;

    ecRecover(
        dataThatWasSigned: string,
        signature: string,
        callback?: (error: Error, address: string) => void
    ): Promise<string>;

    signTransaction(
        transation: Transaction,
        password: string,
        callback?: (error: Error, RLPEncodedTransaction: RLPEncodedTransaction) => void
    ): Promise<RLPEncodedTransaction>;

    sendTransaction(
        transation: Transaction,
        password: string,
        callback?: (error: Error, transactionHash: string) => void
    ): Promise<string>;

    unlockAccount(
        address: string,
        password: string,
        unlockDuration: number,
        callback?: (error: Error) => void
    ): Promise<boolean>;

    lockAccount(address: string, callback?: (error: Error, success: boolean) => void): Promise<boolean>;

    getAccounts(callback?: (error: Error, accounts: string[]) => void): Promise<string[]>;

    importRawKey(privateKey: string, password: string): Promise<string>;

    newValKeyMethod(password: string, callback?: (error: Error, valKeyInfo: ValKeyInfo) => void): Promise<ValKeyInfo>;

    exportValKeyMethod(address: string, password: string, encryptPassword: string, callback?: (error: Error, privateKey: string) => void): Promise<string>;

    importValKeyMethod(privateKey: string, password: string, encryptPassword: string, callback?: (error: Error, valKeyInfo: ValKeyInfo) => void): Promise<ValKeyInfo>;

    delValKeyMethod(address: string, password: string, callback?: (error: Error, result: string) => void): Promise<string>;

    useValKeyMethod(address: string, password: string, keep: boolean, callback?: (error: Error, result: any) => void): Promise<any>;

    lockValKeyMethod(callback?: (error: Error, result: any) => void): Promise<any>;
}
