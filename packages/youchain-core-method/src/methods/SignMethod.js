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

import AbstractCallMethod from '../../lib/methods/AbstractCallMethod';

export default class SignMethod extends AbstractCallMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {Accounts} accounts
     * @param {MessageSigner} messageSigner
     *
     * @constructor
     */
    constructor(utils, formatters, accounts, messageSigner) {
        super('you_sign', 2, utils, formatters);
        this.accounts = accounts;
        this.messageSigner = messageSigner;
    }

    /**
     * Sends a JSON-RPC call request
     *
     * @method execute
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @callback callback callback(error, result)
     * @returns {Promise<Object|String>}
     */
    execute(moduleInstance) {
        if (this.hasWallets()) {
            this.beforeExecution(moduleInstance);

            return this.signOnClient();
        }

        return super.execute(moduleInstance);
    }

    /**
     * Signs the message on the client.
     *
     * @method signOnClient
     *
     * @returns {Promise<String>}
     */
    signOnClient() {
        let signedMessage;

        try {
            signedMessage = this.afterExecution(this.messageSigner.sign(this.parameters[0], this.parameters[1]));
        } catch (error) {
            if (this.callback) {
                this.callback(error, null);
            }

            throw error;
        }

        if (this.callback) {
            this.callback(false, signedMessage);
        }

        return Promise.resolve(signedMessage);
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractYOUChainModule} moduleInstance - The package where the method is called from for example You.
     */
    beforeExecution(moduleInstance) {
        this.parameters[0] = this.formatters.inputSignFormatter(this.parameters[0]);
        this.parameters[1] = this.formatters.inputAddressFormatter(this.parameters[1]);
        this.parameters.reverse();
    }
}
