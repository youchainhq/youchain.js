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

import {asciiToHex, BN} from 'youchain-utils';

// $ExpectType string
asciiToHex('I have 100!');

// $ExpectType string
asciiToHex('I have 100!', 32);

// $ExpectError
asciiToHex(345);
// $ExpectError
asciiToHex(new BN(3));
// $ExpectError
asciiToHex({});
// $ExpectError
asciiToHex(true);
// $ExpectError
asciiToHex(['string']);
// $ExpectError
asciiToHex([4]);
// $ExpectError
asciiToHex(null);
// $ExpectError
asciiToHex(undefined);
