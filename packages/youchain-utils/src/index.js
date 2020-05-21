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
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import * as utils from './Utils';
import * as units from './Units';
import randombytes from 'randombytes';

export {soliditySha3} from './SoliditySha3';

/**
 * Returns a random hex string by the given bytes size
 *
 * @param {Number} size
 *
 * @returns {string}
 */
export const randomHex = (size) => {
    return '0x' + randombytes(size).toString('hex');
};

/**
 * Should be used to create full function/event name from json abi
 *
 * @method jsonInterfaceMethodToString
 *
 * @param {Object} json
 *
 * @returns {String} full function/event name
 */
export const jsonInterfaceMethodToString = (json) => {
    if (isObject(json) && json.name && json.name.indexOf('(') !== -1) {
        return json.name;
    }

    return `${json.name}(${_flattenTypes(false, json.inputs).join(',')})`;
};

/**
 * Should be used to flatten json abi inputs/outputs into an array of type-representing-strings
 *
 * @method _flattenTypes
 *
 * @param {Boolean} includeTuple
 * @param {Object} puts
 *
 * @returns {Array} parameters as strings
 */
const _flattenTypes = (includeTuple, puts) => {
    // console.log("entered _flattenTypes. inputs/outputs: " + puts)
    const types = [];

    puts.forEach((param) => {
        if (typeof param.components === 'object') {
            if (param.type.substring(0, 5) !== 'tuple') {
                throw new Error('components found but type is not tuple; report on GitHub');
            }
            let suffix = '';
            const arrayBracket = param.type.indexOf('[');
            if (arrayBracket >= 0) {
                suffix = param.type.substring(arrayBracket);
            }
            const result = _flattenTypes(includeTuple, param.components);
            // console.log("result should have things: " + result)
            if (isArray(result) && includeTuple) {
                // console.log("include tuple word, and its an array. joining...: " + result.types)
                types.push(`tuple(${result.join(',')})${suffix}`);
            } else if (!includeTuple) {
                // console.log("don't include tuple, but its an array. joining...: " + result)
                types.push(`(${result.join(',')})${suffix}`);
            } else {
                // console.log("its a single type within a tuple: " + result.types)
                types.push(`(${result})`);
            }
        } else {
            // console.log("its a type and not directly in a tuple: " + param.type)
            types.push(param.type);
        }
    });

    return types;
};

/**
 * Should be called to get ascii from it's hex representation
 *
 * @method hexToAscii
 *
 * @param {String} hex
 *
 * @returns {String} ascii string representation of hex value
 */
export const hexToAscii = (hex) => {
    if (!utils.isHexStrict(hex)) throw new Error('The parameter must be a valid HEX string.');

    let str = '';

    let i = 0;
    const l = hex.length;

    if (hex.substring(0, 2) === '0x') {
        i = 2;
    }
    for (; i < l; i += 2) {
        const code = parseInt(hex.substr(i, 2), 16);
        str += String.fromCharCode(code);
    }

    return str;
};

/**
 * Should be called to get hex representation (prefixed by 0x) of ascii string
 *
 * @method asciiToHex
 *
 * @param {String} str
 * @param {Number} length
 *
 * @returns {String} hex representation of input string
 */
export const asciiToHex = (str, length = 32) => {
    let hex = '';

    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        const n = code.toString(16);
        hex += n.length < 2 ? `0${n}` : n;
    }

    return '0x' + utils.rightPad(hex, length * 2);
};

/**
 * Returns value of unit in Lu
 *
 * @method getUnitValue
 *
 * @param {String} unit the unit to convert to, default you
 *
 * @returns {BN} value of the unit (in Lu)
 * @throws error if the unit is not correct
 */
export const getUnitValue = (unit) => {
    unit = unit ? unit.toLowerCase() : 'you';
    if (!units.unitMap[unit]) {
        throw new Error(
            `This unit "${unit}" doesn't exist, please use the one of the following units${JSON.stringify(
                units.unitMap,
                null,
                2
            )}`
        );
    }

    return unit;
};

/**
 * Takes a number of lu and converts it to any other you unit.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - klu        --             --
 * - mlu        --             --
 * - glu        --             --
 * - --         --             --           micro
 * - --         --             --           milli
 * - you        --             --
 * - kyou                      --
 * - myou
 * - gyou
 * - tyou
 *
 * @method fromLu
 *
 * @param {String|BN} number can be a BigNumber, number string or a HEX of a decimal
 * @param {String} unit the unit to convert to, default you
 *
 * @returns {String} Returns a string
 */
export const fromLu = (number, unit) => {
    unit = getUnitValue(unit);

    if (!utils.isBN(number) && !isString(number)) {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }

    return utils.isBN(number) ? units.fromLu(number, unit) : units.fromLu(number, unit).toString(10);
};

/**
 * Takes a number of a unit and converts it to lu.
 *
 * Possible units are:
 *   SI Short   SI Full        Effigy       Other
 * - klu        --             --
 * - mlu        --             --
 * - glu        --             --
 * - --         --             --           micro
 * - --         --             --           milli
 * - you        --             --
 * - kyou                      --
 * - myou
 * - gyou
 * - tyou
 *
 * @method toLu
 *
 * @param {String|BN} number can be a number, number string or a HEX of a decimal
 * @param {String} unit the unit to convert from, default you
 *
 * @returns {String|BN} When given a BN object it returns one as well, otherwise a string
 */
export const toLu = (number, unit) => {
    unit = getUnitValue(unit);

    if (!utils.isBN(number) && !isString(number)) {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }

    return utils.isBN(number) ? units.toLu(number, unit) : units.toLu(number, unit).toString(10);
};

/**
 * Converts to a checksum address
 *
 * @method toChecksumAddress
 *
 * @param {String} address the given HEX address
 *
 * @returns {String}
 */
export const toChecksumAddress = (address) => {
    if (typeof address === 'undefined') return '';

    if (!/^(0x)?[0-9a-f]{40}$/i.test(address))
        throw new Error(`Given address "${address}" is not a valid YOUChain address.`);

    address = address.toLowerCase().replace(/^0x/i, '');
    const addressHash = utils.sha3(address).replace(/^0x/i, '');
    let checksumAddress = '0x';

    for (let i = 0; i < address.length; i++) {
        // If ith character is 9 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }

    return checksumAddress;
};

// aliases
export const keccak256 = utils.sha3;
export const sha3 = utils.sha3;
export const toDecimal = utils.hexToNumber;
export const hexToNumber = utils.hexToNumber;
export const fromDecimal = utils.numberToHex;
export const numberToHex = utils.numberToHex;
export const hexToString = utils.hexToUtf8;
export const toUtf8 = utils.hexToUtf8;
export const stringToHex = utils.utf8ToHex;
export const fromUtf8 = utils.utf8ToHex;
export const utf8ToHex = utils.utf8ToHex;
export const toAscii = hexToAscii;
export const fromAscii = asciiToHex;
export const padLeft = utils.leftPad;
export const padRight = utils.rightPad;
export const getSignatureParameters = utils.getSignatureParameters;
export const isAddress = utils.isAddress;
export const isBN = utils.isBN;
export const checkAddressChecksum = utils.checkAddressChecksum;
export const toBN = utils.toBN;
export const toHex = utils.toHex;
export const hexToNumberString = utils.hexToNumberString;
export const toTwosComplement = utils.toTwosComplement;
export const isHex = utils.isHex;
export const isHexStrict = utils.isHexStrict;
export const isBloom = utils.isBloom;
export const isTopic = utils.isTopic;
export const bytesToHex = utils.bytesToHex;
export const hexToBytes = utils.hexToBytes;
export const isBigNumber = utils.isBigNumber;
export const unitMap = units.unitMap;
