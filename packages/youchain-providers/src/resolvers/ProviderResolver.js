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

import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';

/* eslint-disable no-new-func */
// let global;
// try {
//     global = new Function('return this')();
// } catch (error) {
//     global = window;
// }
/* eslint-enable */

export default class ProviderResolver {
    /**
     * @param {ProvidersModuleFactory} providersModuleFactory
     *
     * @constructor
     */
    constructor(providersModuleFactory) {
        this.providersModuleFactory = providersModuleFactory;
    }

    /**
     * Resolves the correct provider with his adapter
     *
     * @method resolve
     *
     * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {Net} net
     *
     * @returns {HttpProvider|WebsocketProvider|IpcProvider|Error}
     */
    resolve(provider, net) {
        if (typeof provider === 'string') {
            // HTTP
            if (/^http(s)?:\/\//i.test(provider)) {
                return this.providersModuleFactory.createHttpProvider(provider);
            }
            // WS
            if (/^ws(s)?:\/\//i.test(provider)) {
                return this.providersModuleFactory.createWebsocketProvider(provider);
            }

            // IPC
            if (provider && isObject(net) && isFunction(net.connect)) {
                return this.providersModuleFactory.createIpcProvider(provider, net);
            }
        }

        return provider;
    }
}
