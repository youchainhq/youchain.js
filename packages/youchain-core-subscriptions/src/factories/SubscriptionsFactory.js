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

import cloneDeep from 'lodash/cloneDeep';
import LogSubscription from '../subscriptions/you/LogSubscription';
import NewHeadsSubscription from '../subscriptions/you/NewHeadsSubscription';
import NewPendingTransactionsSubscription from '../subscriptions/you/NewPendingTransactionsSubscription';
import SyncingSubscription from '../subscriptions/you/SyncingSubscription';

export default class SubscriptionsFactory {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     *
     * @constructor
     */
    constructor(utils, formatters) {
        this.utils = utils;
        this.formatters = formatters;
    }

    /**
     * Returns an you log subscription
     *
     * @method createLogSubscription
     *
     * @param {Object} options
     * @param {AbstractYOUChainModule} moduleInstance
     * @param {GetPastLogsMethod} getPastLogsMethod
     *
     * @returns {LogSubscription}
     */
    createLogSubscription(options, moduleInstance, getPastLogsMethod) {
        return new LogSubscription(cloneDeep(options), this.utils, this.formatters, moduleInstance, getPastLogsMethod);
    }

    /**
     * Returns an you newHeads subscription
     *
     * @method createNewHeadsSubscription
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @returns {NewHeadsSubscription}
     */
    createNewHeadsSubscription(moduleInstance) {
        return new NewHeadsSubscription(this.utils, this.formatters, moduleInstance);
    }

    /**
     * Returns an you newPendingTransactions subscription
     *
     * @method createNewPendingTransactionsSubscription
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @returns {NewPendingTransactionsSubscription}
     */
    createNewPendingTransactionsSubscription(moduleInstance) {
        return new NewPendingTransactionsSubscription(this.utils, this.formatters, moduleInstance);
    }

    /**
     * Returns an you syncing subscription
     *
     * @method createSyncingSubscription
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @returns {SyncingSubscription}
     */
    createSyncingSubscription(moduleInstance) {
        return new SyncingSubscription(this.utils, this.formatters, moduleInstance);
    }
}
