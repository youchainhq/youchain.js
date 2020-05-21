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

import {Utils} from 'youchain-utils';
import {AbstractYOUChainModule, PromiEvent} from 'youchain-core';
import {formatters} from 'youchain-core-helpers';

export class AbstractMethod {
    constructor(rpcMethod: string, parametersAmount: number, utils: Utils, formatters: formatters);

    utils: Utils;
    formatters: formatters;
    promiEvent: PromiEvent<any>;
    rpcMethod: string;
    parametersAmount: number;
    parameters: any[];
    arguments: object;
    isHash(parameter: string): boolean;
    hasWallets(): boolean;

    callback(error: string | Error, response: any): void;

    beforeExecution(moduleInstance: AbstractYOUChainModule): void;

    afterExecution(response: any): any;

    execute(moduleInstance: AbstractYOUChainModule): Promise<object | string> | PromiEvent<any> | string;

    clearSubscriptions(unsubscribeMethod: string): Promise<boolean | Error>;
}

export class MethodModuleFactory {} // TODO: Define methods
