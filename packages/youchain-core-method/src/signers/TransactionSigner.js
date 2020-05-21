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

import AbstractSigner from '../../lib/signers/AbstractSigner';

export default class TransactionSigner extends AbstractSigner {
    /**
     * @param {Accounts} accounts
     *
     * @constructor
     */
    constructor(accounts) {
        super(accounts);
    }

    /**
     * Signs the given transaction
     *
     * @method sign
     *
     * @param {Object} transaction
     *
     * @returns {Promise<Boolean|String|Error>}
     */
    async sign(transaction) {
        const wallet = this.getWallet(transaction.from);

        if (wallet && wallet.privateKey) {
            delete transaction.from;
            try {
                return await this.accounts.signTransaction(transaction, wallet.privateKey);
            } catch (error) {
                throw error;
            }
        }

        throw new Error('Wallet or privateKey in wallet is not set!');
    }
}
