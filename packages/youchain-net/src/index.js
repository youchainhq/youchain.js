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

import {ProvidersModuleFactory} from 'youchain-providers';
import {MethodModuleFactory} from 'youchain-core-method';
import {formatters} from 'youchain-core-helpers';
import * as Utils from 'youchain-utils';
import NetworkModuleFactory from './factories/NetworkModuleFactory';

/**
 * Creates the Network Object
 *
 * @method Network
 *
 * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
 * @param {Object} options
 *
 * @returns {Network}
 */
export const Network = (provider, options) => {
    return new NetworkModuleFactory(Utils, formatters).createNetworkModule(
        provider,
        new ProvidersModuleFactory(),
        new MethodModuleFactory(),
        options
    );
};
