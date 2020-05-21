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

import {BN, fromLu} from 'youchain-utils';

const bigNumber = new BN(3);

// $ExpectType string
fromLu(bigNumber);
// $ExpectType string
fromLu('1');
// $ExpectType string
fromLu(bigNumber, 'you');
// $ExpectType string
fromLu('1', 'you');

// $ExpectError
fromLu(232);
// $ExpectError
fromLu(['string']);
// $ExpectError
fromLu([4]);
// $ExpectError
fromLu({});
// $ExpectError
fromLu(true);
// $ExpectError
fromLu(null);
// $ExpectError
fromLu(undefined);
// $ExpectError
fromLu(new BN(3), 'blah');
