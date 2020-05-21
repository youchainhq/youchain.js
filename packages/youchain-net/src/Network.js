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

import {AbstractYOUChainModule} from 'youchain-core';
import isFunction from 'lodash/isFunction';

export default class Network extends AbstractYOUChainModule {
    /**
     * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {ProvidersModuleFactory} providersModuleFactory
     * @param {MethodModuleFactory} methodModuleFactory
     * @param {MethodFactory} methodFactory
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Object} options
     *
     * @constructor
     */
    constructor(provider, providersModuleFactory, methodModuleFactory, methodFactory, utils, formatters, options) {
        super(provider, providersModuleFactory, methodModuleFactory, methodFactory, options);

        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Determines to which network youchain is currently connected
     *
     * @method getNetworkType
     *
     * @param {Function} callback
     *
     * @callback callback(error, result)
     * @returns {Promise<String|Error>}
     */
    async getNetworkType(callback) {
        try {
            const id = await this.getId();
            const genesisBlock = await this.getBlock(0, false);
            let returnValue = 'private';

            if (
                genesisBlock.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3' &&
                id === 1
            ) {
                returnValue = 'main';
            }

            if (isFunction(callback)) {
                callback(null, returnValue);
            }

            return returnValue;
        } catch (error) {
            if (isFunction(callback)) {
                callback(error, null);
            }

            throw error;
        }
    }
}
