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

/* eslint-disable no-new-func */
let global;
try {
    global = new Function('return this')();
} catch (error) {
    global = window;
}
/* eslint-enable */

export default class ProviderDetector {
    /**
     * Detects which provider is given in the current environment
     *
     * @method detect
     *
     * @returns {Object|null} provider
     */
    detect() {
        if (typeof global.youchain !== 'undefined' && global.youchain.currentProvider) {
            return global.youchain.currentProvider;
        }

        return null;
    }
}
