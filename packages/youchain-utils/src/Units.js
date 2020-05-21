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

import BN from 'bn.js';
import numberToBN from 'number-to-bn';

const zero = new BN(0);
const negative1 = new BN(-1);

// complete YOUChain unit map
export const unitMap = {
    noyou: '0',
    lu: '1',
    klu: '1000',
    Klu: '1000',
    mlu: '1000000',
    Mlu: '1000000',
    glu: '1000000000',
    Glu: '1000000000',
    micro: '1000000000000',
    milli: '1000000000000000',
    you: '1000000000000000000',
    kyou: '1000000000000000000000',
    myou: '1000000000000000000000000',
    gyou: '1000000000000000000000000000',
    tyou: '1000000000000000000000000000000'
};

/**
 * Returns value of unit in Lu
 *
 * @method getValueOfUnit
 * @param {String} unit the unit to convert to, default you
 * @returns {BigNumber} value of the unit (in Lu)
 * @throws error if the unit is not correct
 */
export const getValueOfUnit = (unitInput) => {
    const unit = unitInput ? unitInput.toLowerCase() : 'you';
    const unitValue = unitMap[unit];

    if (typeof unitValue !== 'string') {
        throw new TypeError(
            'the unit provided ' +
                unitInput +
                " doesn't exists, please use the one of the following units " +
                JSON.stringify(unitMap, null, 2)
        );
    }

    return new BN(unitValue, 10);
};

export const numberToString = (arg) => {
    if (typeof arg === 'string') {
        if (!arg.match(/^-?[0-9.]+$/)) {
            throw new Error(
                "while converting number to string, invalid number value '" +
                    arg +
                    "', should be a number matching (^-?[0-9.]+)."
            );
        }
        return arg;
    } else if (typeof arg === 'number') {
        return String(arg);
    } else if (typeof arg === 'object' && arg.toString && (arg.toTwos || arg.dividedToIntegerBy)) {
        if (arg.toPrecision) {
            return String(arg.toPrecision());
        } else {
            return arg.toString(10);
        }
    }
    throw new Error("while converting number to string, invalid number value '" + arg + "' type " + typeof arg + '.');
};

export const fromLu = (luInput, unit, optionsInput) => {
    let lu = numberToBN(luInput);
    let negative = lu.lt(zero);
    let base = getValueOfUnit(unit);
    let baseLength = unitMap[unit].length - 1 || 1;
    let options = optionsInput || {};

    if (negative) {
        lu = lu.mul(negative1);
    }

    let fraction = lu.mod(base).toString(10);

    while (fraction.length < baseLength) {
        fraction = '0' + fraction;
    }

    if (!options.pad) {
        fraction = fraction.match(/^(\d*[1-9]|0)(0*)/)[1];
    }

    let whole = lu.div(base).toString(10);

    if (options.commify) {
        whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    let value = '' + whole + (fraction === '0' ? '' : '.' + fraction);

    if (negative) {
        value = '-' + value;
    }

    return value;
};

export const toLu = (youInput, unit) => {
    let you = numberToString(youInput);
    let base = getValueOfUnit(unit);
    let baseLength = unitMap[unit].length - 1 || 1;

    // Is it negative?
    let negative = you.substring(0, 1) === '-';
    if (negative) {
        you = you.substring(1);
    }

    if (you === '.') {
        throw new Error('while converting number ' + youInput + ' to lu, invalid value');
    }

    // Split it into a whole and fractional part
    let comps = you.split('.');
    if (comps.length > 2) {
        throw new Error('while converting number ' + youInput + ' to lu,  too many decimal points');
    }

    let whole = comps[0];
    let fraction = comps[1];

    if (!whole) {
        whole = '0';
    }
    if (!fraction) {
        fraction = '0';
    }
    if (fraction.length > baseLength) {
        throw new Error('while converting number ' + youInput + ' to lu, too many decimal places');
    }

    while (fraction.length < baseLength) {
        fraction += '0';
    }

    whole = new BN(whole);
    fraction = new BN(fraction);
    let lu = whole.mul(base).add(fraction);

    if (negative) {
        lu = lu.mul(negative1);
    }

    return new BN(lu.toString(10), 10);
};
