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

import * as Utils from 'youchain-utils';
import {ProvidersModuleFactory} from 'youchain-providers';
import {formatters} from 'youchain-core-helpers';
import {AbiCoder} from 'youchain-you-abi';
import {MethodModuleFactory} from 'youchain-core-method';
import {PromiEvent} from 'youchain-core-promievent';
import ContractModuleFactory from './factories/ContractModuleFactory';

export AbstractContract from './AbstractContract';
export ContractModuleFactory from './factories/ContractModuleFactory';

/**
 * Returns an object of type Contract
 *
 * @method Contract
 *
 * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Accounts} accounts
 * @param {Object} abi
 * @param {String} address
 * @param {Object} options
 *
 * @returns {AbstractContract}
 */
export const Contract = (provider, accounts, abi, address, options) => {
    return new ContractModuleFactory(
        Utils,
        formatters,
        new AbiCoder(),
        accounts,
        new MethodModuleFactory(accounts)
    ).createContract(provider, new ProvidersModuleFactory(), PromiEvent, abi, address, options);
};
