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

import MethodFactory from './MethodFactory';
import YOU from '../YOU';

export default class YOUModuleFactory {
    /**
     * @param {HttpProvider|WebsocketProvider|IpcProvider|String} provider
     * @param {ProvidersModuleFactory} providersModuleFactory
     * @param {MethodModuleFactory} methodModuleFactory
     * @param {Accounts} accounts
     * @param {PromiEvent} PromiEvent
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {ContractModuleFactory} contractModuleFactory
     * @param {AbiCoder} abiCoder
     *
     * @constructor
     */
    constructor(
        provider,
        providersModuleFactory,
        methodModuleFactory,
        accounts,
        PromiEvent,
        utils,
        formatters,
        contractModuleFactory,
        abiCoder
    ) {
        this.provider = provider;
        this.providersModuleFactory = providersModuleFactory;
        this.methodModuleFactory = methodModuleFactory;
        this.accounts = accounts;
        this.utils = utils;
        this.formatters = formatters;
        this.contractModuleFactory = contractModuleFactory;
        this.PromiEvent = PromiEvent;
        this.abiCoder = abiCoder;
    }

    /**
     * Returns an object of type YOU
     *
     * @method createYOUModule
     *
     * @param {Network} net
     * @param {Personal} personal
     * @param {SubscriptionsFactory} subscriptionsFactory
     * @param {Object} options
     *
     * @returns {YOU}
     */
    createYOUModule(net, personal, subscriptionsFactory, options) {
        return new YOU(
            this.provider,
            this.providersModuleFactory,
            this.methodModuleFactory,
            this.createMethodFactory(),
            net,
            this.accounts,
            personal,
            this.abiCoder,
            this.utils,
            this.formatters,
            subscriptionsFactory,
            this.contractModuleFactory,
            options
        );
    }

    /**
     * Returns an object of type MethodFactory
     *
     * @method createMethodFactory
     *
     * @returns {MethodFactory}
     */
    createMethodFactory() {
        return new MethodFactory(this.methodModuleFactory, this.utils, this.formatters);
    }
}
