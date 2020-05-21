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

import YOUChain from 'youchain';

// $ExpectType Modules
YOUChain.modules;

// $ExpectType string | HttpProvider | IpcProvider | WebsocketProvider | null
YOUChain.givenProvider;

const youchain = new YOUChain('https://localhost:5000/');

// $ExpectType string | HttpProvider | IpcProvider | WebsocketProvider | null
YOUChain.givenProvider;

// $ExpectType Providers
YOUChain.providers;

// $ExpectType HttpProvider | IpcProvider | WebsocketProvider
youchain.currentProvider;

// $ExpectType Utils
youchain.utils;

// $ExpectType string
youchain.version;

// $ExpectType YOU
youchain.you;

// $ExpectType BatchRequest
new youchain.BatchRequest();
