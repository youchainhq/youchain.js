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

import {WebsocketProvider, IpcProvider} from 'youchain-providers';
import EventEmitter from 'eventemitter3';

export default class NewHeadsWatcher extends EventEmitter {
    /**
     * @param {SubscriptionsFactory} subscriptionsFactory
     *
     * @constructor
     */
    constructor(subscriptionsFactory) {
        super();
        this.subscriptionsFactory = subscriptionsFactory;
        this.confirmationInterval = null;
        this.confirmationSubscription = null;
        this.isPolling = false;
    }

    /**
     * Starts subscription on newHeads if supported or creates an interval to get the newHeads
     *
     * @method watch
     *
     * @param {AbstractYOUChainModule} moduleInstance
     *
     * @returns {NewHeadsWatcher}
     */
    watch(moduleInstance) {
        if (this.isSocketConnection(moduleInstance.currentProvider)) {
            this.confirmationSubscription = this.subscriptionsFactory
                .createNewHeadsSubscription(moduleInstance)
                .subscribe(() => {
                    this.emit('newHead');
                });

            return this;
        }

        this.isPolling = true;
        this.confirmationInterval = setInterval(() => {
            this.emit('newHead');
        }, 1000);

        return this;
    }

    /**
     * Clears the interval and unsubscribes the subscription
     *
     * @method stop
     */
    stop() {
        if (this.confirmationSubscription) {
            this.confirmationSubscription.unsubscribe();
        }

        if (this.confirmationInterval) {
            clearInterval(this.confirmationInterval);
        }

        this.removeAllListeners('newHead');
    }

    /**
     * Checks if the given provider is a socket provider
     *
     * @method isSocketConnection
     *
     * @param {WebsocketProvider|IpcProvider} provider
     *
     * @returns {Boolean}
     */
    isSocketConnection(provider) {
        return provider instanceof WebsocketProvider || provider instanceof IpcProvider;
    }
}
