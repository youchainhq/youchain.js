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
import {ProvidersModuleFactory} from 'youchain-providers';
import * as Utils from 'youchain-utils';
import {YOU} from 'youchain-you';
import {Network} from 'youchain-net';
import {Personal} from 'youchain-you-personal';
import {version} from '../package.json';

export default class YOUChain extends AbstractYOUChainModule {
    /**
     * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {Net} net
     * @param {Object} options
     *
     * @constructor
     */
    constructor(provider, net, options = {}) {
        super(provider, new ProvidersModuleFactory(), null, null, options);

        this.you = new YOU(provider, options);
        this.utils = Utils;
        this.version = version;
    }

    /**
     * Sets the defaultGasPrice property on the you module
     *
     * @property defaultGasPrice
     *
     * @param {String} value
     */
    set defaultGasPrice(value) {
        super.defaultGasPrice = value;
        this.you.defaultGasPrice = value;
    }

    /**
     * Gets the defaultGasPrice property
     *
     * @property defaultGasPrice
     *
     * @returns {String|Number} value
     */
    get defaultGasPrice() {
        return super.defaultGasPrice;
    }

    /**
     * Sets the defaultGas property on the you module
     *
     * @property defaultGas
     *
     * @param {Number} value
     */
    set defaultGas(value) {
        super.defaultGas = value;
        this.you.defaultGas = value;
    }

    /**
     * Gets the defaultGas property
     *
     * @property defaultGas
     *
     * @returns {String|Number} value
     */
    get defaultGas() {
        return super.defaultGas;
    }

    /**
     * Sets the transactionBlockTimeout property on all contracts and on all sub-modules
     *
     * @property transactionBlockTimeout
     *
     * @param {Number} value
     */
    set transactionBlockTimeout(value) {
        this.you.transactionBlockTimeout = value;
        super.transactionBlockTimeout = value;
    }

    /**
     * Gets the transactionBlockTimeout property
     *
     * @property transactionBlockTimeout
     *
     * @returns {Number} value
     */
    get transactionBlockTimeout() {
        return super.transactionBlockTimeout;
    }

    /**
     * Sets the transactionConfirmationBlocks property on all contracts and on all sub-modules
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} value
     */
    set transactionConfirmationBlocks(value) {
        this.you.transactionConfirmationBlocks = value;
        super.transactionConfirmationBlocks = value;
    }

    /**
     * Gets the transactionConfirmationBlocks property
     *
     * @property transactionConfirmationBlocks
     *
     * @returns {Number} value
     */
    get transactionConfirmationBlocks() {
        return super.transactionConfirmationBlocks;
    }

    /**
     * Sets the transactionConfirmationBlocks property on all contracts and on all sub-modules
     *
     * @property transactionConfirmationBlocks
     *
     * @param {Number} value
     */
    set transactionPollingTimeout(value) {
        this.you.transactionPollingTimeout = value;
        super.transactionPollingTimeout = value;
    }

    /**
     * Gets the transactionPollingTimeout property
     *
     * @property transactionPollingTimeout
     *
     * @returns {Number} value
     */
    get transactionPollingTimeout() {
        return super.transactionPollingTimeout;
    }

    /**
     * Sets the defaultAccount property on the you module
     *
     * @property defaultAccount
     *
     * @param {String} value
     */
    set defaultAccount(value) {
        super.defaultAccount = value;
        this.you.defaultAccount = value;
    }

    /**
     * Gets the defaultAccount property
     *
     * @property defaultAccount
     *
     * @returns {String} value
     */
    get defaultAccount() {
        return super.defaultAccount;
    }

    /**
     * Sets the defaultBlock property on the you module
     *
     * @property defaultBlock
     *
     * @param {Number|String} value
     */
    set defaultBlock(value) {
        super.defaultBlock = value;
        this.you.defaultBlock = value;
    }

    /**
     * Gets the defaultBlock property
     *
     * @property defaultBlock
     *
     * @returns {String|Number} value
     */
    get defaultBlock() {
        return super.defaultBlock;
    }

    /**
     * Sets the provider for all packages
     *
     * @method setProvider
     *
     * @param {Object|String} provider
     * @param {Net} net
     *
     * @returns {Boolean}
     */
    setProvider(provider, net) {
        return super.setProvider(provider, net) && this.you.setProvider(provider, net);
    }

    /**
     * Returns the detected provider
     *
     * @returns {Object}
     */
    static get givenProvider() {
        return new ProvidersModuleFactory().createProviderDetector().detect();
    }

    /**
     * Returns an object with all public youchain modules
     *
     * @returns {Object}
     */
    static get modules() {
        const providerResolver = new ProvidersModuleFactory().createProviderResolver();

        return {
            YOU: (provider, options, net) => {
                return new YOU(providerResolver.resolve(provider, net), options);
            },
            Net: (provider, options, net) => {
                return new Network(providerResolver.resolve(provider, net), options);
            },
            Personal: (provider, options, net) => {
                return new Personal(providerResolver.resolve(provider, net), options);
            }
        };
    }
}
