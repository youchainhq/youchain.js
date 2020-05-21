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

export default class MethodEncoder {
    /**
     * @param {AbiCoder} abiCoder
     *
     * @constructor
     */
    constructor(abiCoder) {
        this.abiCoder = abiCoder;
    }

    /**
     * Encodes the method with the given parameters
     *
     * @method encode
     *
     * @param {AbiItemModel} abiItemModel
     * @param {String} deployData
     *
     * @returns {String|Error}
     */
    encode(abiItemModel, deployData) {
        let encodedParameters = this.abiCoder
            .encodeParameters(abiItemModel.getInputs(), abiItemModel.contractMethodParameters)
            .replace('0x', '');

        if (abiItemModel.signature === 'constructor') {
            if (!deployData) {
                throw new Error(
                    'The contract has no contract data option set. This is necessary to append the constructor parameters.'
                );
            }

            return deployData + encodedParameters;
        }

        if (abiItemModel.isOfType('function')) {
            return abiItemModel.signature + encodedParameters;
        }

        return encodedParameters;
    }
}
