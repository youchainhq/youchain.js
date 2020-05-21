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

import AbstractMethod from './AbstractMethod';

export default class AbstractSendMethod extends AbstractMethod {
    /**
     * @param {String} rpcMethod
     * @param {Number} parametersAmount
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {TransactionConfirmationWorkflow} transactionConfirmationWorkflow
     *
     * @constructor
     */
    constructor(rpcMethod, parametersAmount, utils, formatters, transactionConfirmationWorkflow) {
        super(rpcMethod, parametersAmount, utils, formatters);
        this.transactionConfirmationWorkflow = transactionConfirmationWorkflow;
    }

    /**
     * Returns the commandType of this Method
     *
     * @property CommandType
     *
     * @returns {String}
     */
    static get Type() {
        return 'SEND';
    }

    /**
     * Sends the request and returns a PromiEvent Object
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
        this.beforeExecution(moduleInstance);

        if (this.parameters.length !== this.parametersAmount) {
            throw new Error(
                `Invalid Arguments length: expected: ${this.parametersAmount}, given: ${this.parameters.length}`
            );
        }

        moduleInstance.currentProvider
            .send(this.rpcMethod, this.parameters)
            .then((response) => {
                this.transactionConfirmationWorkflow.execute(this, moduleInstance, response, promiEvent);

                if (this.callback) {
                    this.callback(false, response);
                }

                promiEvent.emit('transactionHash', response);
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
}
