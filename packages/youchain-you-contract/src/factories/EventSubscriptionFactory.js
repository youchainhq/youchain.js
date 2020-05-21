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

import {GetPastLogsMethod} from 'youchain-core-method';
import EventLogSubscription from '../subscriptions/EventLogSubscription';
import AllEventsLogSubscription from '../subscriptions/AllEventsLogSubscription';

export default class EventSubscriptionFactory {
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
     * Returns an event log subscription
     *
     * @param {EventLogDecoder} eventLogDecoder
     * @param {AbstractContract} contract
     * @param {Object} options
     * @param {AbiItemModel} abiItemModel
     *
     * @returns {EventLogSubscription}
     */
    createEventLogSubscription(eventLogDecoder, contract, options, abiItemModel) {
        return new EventLogSubscription(
            options,
            this.utils,
            this.formatters,
            contract,
            new GetPastLogsMethod(this.utils, this.formatters),
            eventLogDecoder,
            abiItemModel
        );
    }

    /**
     * Returns an log subscription for all events
     *
     * @param {AllEventsLogDecoder} allEventsLogDecoder
     * @param {AbstractContract} contract
     * @param {Object} options
     *
     * @returns {AllEventsLogSubscription}
     */
    createAllEventsLogSubscription(allEventsLogDecoder, contract, options) {
        return new AllEventsLogSubscription(
            options,
            this.utils,
            this.formatters,
            contract,
            new GetPastLogsMethod(this.utils, this.formatters),
            allEventsLogDecoder,
            contract.abiModel
        );
    }
}
