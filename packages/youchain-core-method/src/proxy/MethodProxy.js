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

import {PromiEvent} from 'youchain-core-promievent';

export default class MethodProxy {
    /**
     * @param {AbstractYOUChainModule} target
     * @param {AbstractMethodFactory} methodFactory
     *
     * @constructor
     */
    constructor(target, methodFactory) {
        return new Proxy(target, {
            /**
             * @param {AbstractYOUChainModule} target
             * @param {String|Symbol} name
             *
             * @returns {any}
             */
            get: (target, name) => {
                if (methodFactory.hasMethod(name)) {
                    if (typeof target[name] !== 'undefined') {
                        throw new TypeError(
                            `Duplicated method ${name}. This method is defined as RPC call and as Object method.`
                        );
                    }

                    const method = methodFactory.createMethod(name);

                    /* eslint-disable no-inner-declarations */
                    function anonymousFunction() {
                        method.arguments = arguments;

                        if (method.Type === 'CALL') {
                            return method.execute(target);
                        }

                        return method.execute(target, new PromiEvent());
                    }
                    /* eslint-enable no-inner-declarations */

                    anonymousFunction.method = method;
                    anonymousFunction.request = function() {
                        method.arguments = arguments;

                        return method;
                    };

                    return anonymousFunction;
                }

                return target[name];
            }
        });
    }
}
