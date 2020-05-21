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
import {Network} from 'youchain-net';
import {ProvidersModuleFactory} from 'youchain-providers';
import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import TxPoolModuleFactory from './factories/TxPoolModuleFactory';

/**
 * Returns the TxPool object
 *
 * @method TxPool
 *
 * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Accounts} accounts
 * @param {Object} options
 *
 * @returns {TxPool}
 */
export const TxPool = (provider, accounts, options = {}) => {

    return new TxPoolModuleFactory(Utils, formatters).createTxPoolModule(
        provider,
        new ProvidersModuleFactory(),
        new MethodModuleFactory(accounts),
        new Network(provider, options),
        options
    );
};
