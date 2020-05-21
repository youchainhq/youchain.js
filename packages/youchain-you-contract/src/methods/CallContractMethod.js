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

import {CallMethod} from 'youchain-core-method';

export default class CallContractMethod extends CallMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {AbiCoder} abiCoder
     * @param {AbiItemModel} abiItemModel
     *
     * @constructor
     */
    constructor(utils, formatters, abiCoder, abiItemModel) {
        super(utils, formatters);
        this.abiCoder = abiCoder;
        this.abiItemModel = abiItemModel;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {String} response
     *
     * @returns {Array|String}
     */
    afterExecution(response) {
        if (!response || response === '0x') {
            return null;
        }

        if (response.length >= 2) {
            response = response.slice(2);
        }

        const result = this.abiCoder.decodeParameters(this.abiItemModel.getOutputs(), response);

        if (Object.keys(result).length === 1) {
            return result[0];
        }

        return result;
    }
}
