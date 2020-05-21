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
import {ProvidersModuleFactory} from 'youchain-providers';
import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import AccountsModuleFactory from './factories/AccountsModuleFactory';

/**
 * Returns the Accounts object
 *
 * @method Accounts
 *
 * @params {HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @params {Object} options
 *
 * @returns {Accounts}
 */
export const Accounts = (provider, options) => {
    return new AccountsModuleFactory(Utils, formatters).createAccounts(
        provider,
        new ProvidersModuleFactory(),
        new MethodModuleFactory(),
        options
    );
};
