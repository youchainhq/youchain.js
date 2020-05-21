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

import {AbstractYOUChainModule} from 'youchain-core';
import {AbstractSocketProvider, ProvidersModuleFactory} from 'youchain-providers';

const abstractSocketProvider = new AbstractSocketProvider({});

// $ExpectType string
abstractSocketProvider.host;

// $ExpectType boolean
abstractSocketProvider.connected;

// $ExpectType void
abstractSocketProvider.registerEventListeners();

// $ExpectType Promise<object>
abstractSocketProvider.send('rpc_method', []);

// $ExpectType Promise<object[]>
abstractSocketProvider.sendBatch(
    [],
    new AbstractYOUChainModule('http://localhost:8283', new ProvidersModuleFactory(), {})
);

// $ExpectType Promise<string>
abstractSocketProvider.subscribe('you_subscribe', 'logs', []);

// $ExpectType Promise<boolean>
abstractSocketProvider.unsubscribe('subId', 'you_unsubscribe');

// $ExpectType Promise<boolean>
abstractSocketProvider.clearSubscriptions('you_unsubscribe');

// $ExpectType void
abstractSocketProvider.on('type', () => {});

// $ExpectType void
abstractSocketProvider.removeListener('type', () => {});

// $ExpectType void
abstractSocketProvider.removeAllListeners('type');

// $ExpectType void
abstractSocketProvider.reset();

// $ExpectType void
abstractSocketProvider.reconnect();

// $ExpectType void
abstractSocketProvider.disconnect(100, 'reason');
