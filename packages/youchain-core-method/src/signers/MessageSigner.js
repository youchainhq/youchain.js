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

export default class MessageSigner extends AbstractSigner {
    /**
     * @param {Accounts} accounts
     *
     * @constructor
     */
    constructor(accounts) {
        super(accounts);
    }

    /**
     * Signs a given message
     *
     * @method sign
     *
     * @param {String} data
     * @param {String} address
     *
     * @returns {String|Error}
     */
    sign(data, address) {
        const wallet = this.getWallet(address);
        if (wallet && wallet.privateKey) {
            return this.accounts.sign(data, wallet.privateKey).signature;
        }

        throw new Error('Wallet or privateKey in wallet is not set!');
    }
}
