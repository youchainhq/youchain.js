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

import {MethodModuleFactory} from 'youchain-core-method';
import {formatters} from 'youchain-core-helpers';
import {PromiEvent} from 'youchain-core-promievent';
import {SubscriptionsFactory} from 'youchain-core-subscriptions';
import {Accounts} from 'youchain-you-accounts';
import {ContractModuleFactory} from 'youchain-you-contract';
import {Personal} from 'youchain-you-personal';
import {AbiCoder} from 'youchain-you-abi';
import {ProvidersModuleFactory} from 'youchain-providers';
import {Network} from 'youchain-net';
import * as Utils from 'youchain-utils';
import YOUModuleFactory from './factories/YOUModuleFactory';

/**
 * Creates the YOU object
 *
 * @method YOU
 *
 * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Object} options
 *
 * @returns {YOU}
 */
export const YOU = (provider, options) => {
    const accounts = new Accounts(provider, options);

    const abiCoder = new AbiCoder();

    const methodModuleFactory = new MethodModuleFactory(accounts);

    return new YOUModuleFactory(
        provider,
        new ProvidersModuleFactory(),
        methodModuleFactory,
        accounts,
        PromiEvent,
        Utils,
        formatters,
        new ContractModuleFactory(Utils, formatters, abiCoder, accounts, methodModuleFactory),
        abiCoder
    ).createYOUModule(
        new Network(provider, options),
        new Personal(provider, accounts, options),
        new SubscriptionsFactory(),
        options
    );
};
