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

import {jsonInterfaceMethodToString, AbiItem} from 'youchain-utils';

const abiItem: AbiItem = {
    constant: true,
    inputs: [
        {
            name: 'testMe',
            type: 'uint256[3]'
        }
    ],
    name: 'testName',
    outputs: [
        {
            name: 'test',
            type: 'uint256'
        }
    ],
    payable: false,
    stateMutability: 'pure',
    type: 'function'
};
// $ExpectType string
jsonInterfaceMethodToString(abiItem);

// $ExpectError
jsonInterfaceMethodToString(['string']);
// $ExpectError
jsonInterfaceMethodToString(234);
// $ExpectError
jsonInterfaceMethodToString([4]);
// $ExpectError
jsonInterfaceMethodToString(true);
// $ExpectError
jsonInterfaceMethodToString(null);
// $ExpectError
jsonInterfaceMethodToString(undefined);
