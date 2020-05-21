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

import {AbstractMethod} from 'youchain-core-method';
import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import {ProvidersModuleFactory} from 'youchain-providers';
import {AbstractYOUChainModule} from 'youchain-core';

const abstractYOUChainModule = new AbstractYOUChainModule('http://localhost:8283', new ProvidersModuleFactory(), {}, {});
const abstractMethod = new AbstractMethod('rpc_method', 1, Utils, formatters);

// $ExpectType Utils
abstractMethod.utils;

// $ExpectType formatters
abstractMethod.formatters;

// $ExpectType PromiEvent<any>
abstractMethod.promiEvent;

// $ExpectType string
abstractMethod.rpcMethod;

// $ExpectType number
abstractMethod.parametersAmount;

// $ExpectType any[]
abstractMethod.parameters;

// $ExpectType object
abstractMethod.arguments;

// $ExpectType boolean
abstractMethod.isHash('string');

// $ExpectType boolean
abstractMethod.hasWallets();

// $ExpectType void
abstractMethod.callback('error', 'response');

// $ExpectType void
abstractMethod.beforeExecution(abstractYOUChainModule);

// $ExpectType any
abstractMethod.afterExecution('response');

// $ExpectType string | PromiEvent<any> | Promise<string | object>
abstractMethod.execute(abstractYOUChainModule);

// $ExpectType Promise<boolean | Error>
abstractMethod.clearSubscriptions('you_unsubscribe');
