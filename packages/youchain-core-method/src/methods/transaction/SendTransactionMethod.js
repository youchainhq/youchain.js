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

import isObject from 'lodash/isObject';
import AbstractSendMethod from '../../../lib/methods/AbstractSendMethod';

// TODO: Clean up this method and move the signing logic etc. to the you module
export default class SendTransactionMethod extends AbstractSendMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {TransactionConfirmationWorkflow} transactionConfirmationWorkflow
     * @param {Accounts} accounts
     * @param {TransactionSigner} transactionSigner
     *
     * @constructor
     */
    constructor(utils, formatters, transactionConfirmationWorkflow, accounts, transactionSigner) {
        super('you_sendTransaction', 1, utils, formatters, transactionConfirmationWorkflow);
        this.accounts = accounts;
        this.transactionSigner = transactionSigner;
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractYOUChainModule} moduleInstance - The package where the method is called from for example You.
     */
    beforeExecution(moduleInstance) {
        this.parameters[0] = this.formatters.inputTransactionFormatter(this.parameters[0], moduleInstance);
    }

    /**
     * Checks if gasPrice is set, sends the request and returns a PromiEvent Object
     *
     * @method execute
     *
     * @param {AbstractYOUChainModule} moduleInstance
     * @param {PromiEvent} promiEvent
     *
     * @callback callback callback(error, result)
     * @returns {PromiEvent}
     */
    execute(moduleInstance, promiEvent) {
        if (!this.isGasLimitDefined()) {
            if (this.hasDefaultGasLimit(moduleInstance)) {
                this.parameters[0]['gas'] = moduleInstance.defaultGas;
            }
        }

        if (!this.isGasPriceDefined() && this.hasDefaultGasPrice(moduleInstance)) {
            this.parameters[0]['gasPrice'] = moduleInstance.defaultGasPrice;
        }

        if (!this.isGasPriceDefined() && !this.hasDefaultGasPrice(moduleInstance)) {
            moduleInstance.currentProvider.send('you_gasPrice', []).then((gasPrice) => {
                this.parameters[0]['gasPrice'] = gasPrice;
                this.execute(moduleInstance, promiEvent);
            });

            return promiEvent;
        }

        if (this.hasWallets()) {
            this.rpcMethod = 'you_sendRawTransaction';

            this.transactionSigner
                .sign(this.parameters[0])
                .then((response) => {
                    this.parameters = [response.rawTransaction];
                    super.execute(moduleInstance, promiEvent);
                })
                .catch((error) => {
                    if (this.callback) {
                        this.callback(error, null);
                    }

                    promiEvent.reject(error);
                    promiEvent.emit('error', error);
                    promiEvent.removeAllListeners();
                });

            return promiEvent;
        }

        super.execute(moduleInstance, promiEvent);

        return promiEvent;
    }

    /**
     * Checks if the given YOUChainModule has an default gasPrice defined
     *
     * @method hasDefaultGasPrice
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @returns {Boolean}
     */
    hasDefaultGasPrice(moduleInstance) {
        return moduleInstance.defaultGasPrice !== null && typeof moduleInstance.defaultGasPrice !== 'undefined';
    }

    /**
     * Checks if gasPrice is defined in the method options
     *
     * @method isGasPriceDefined
     *
     * @returns {Boolean}
     */
    isGasPriceDefined() {
        return isObject(this.parameters[0]) && typeof this.parameters[0].gasPrice !== 'undefined';
    }

    /**
     * Checks if the given YOUChainModule has an default gas limit defined
     *
     * @method hasDefaultGasLimit
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @returns {Boolean}
     */
    hasDefaultGasLimit(moduleInstance) {
        return moduleInstance.defaultGas !== null && typeof moduleInstance.defaultGas !== 'undefined';
    }

    /**
     * Checks if a gas limit is defined
     *
     * @method isGasLimitDefined
     *
     * @returns {Boolean}
     */
    isGasLimitDefined() {
        return isObject(this.parameters[0]) && typeof this.parameters[0].gas !== 'undefined';
    }
}
