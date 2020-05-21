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

import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import SubscriptionsModuleFactory from './factories/SubscriptionsModuleFactory';

/**
 * Returns an object of type SubscriptionsFactory
 *
 * @method SubscriptionsFactory
 *
 * @returns {SubscriptionsFactory}
 */
export const SubscriptionsFactory = () => {
    return new SubscriptionsModuleFactory().createSubscriptionsFactory(Utils, formatters);
};

export LogSubscription from './subscriptions/you/LogSubscription';
export AbstractSubscription from '../lib/subscriptions/AbstractSubscription';
