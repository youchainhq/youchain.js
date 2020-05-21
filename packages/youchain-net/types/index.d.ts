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

import {provider} from 'youchain-providers';
import {AbstractYOUChainModule, YOUChainModuleOptions} from 'youchain-core';

export class Network extends AbstractYOUChainModule {
    constructor(provider: provider, options?: YOUChainModuleOptions);

    getNetworkType(callback?: (error: Error, returnValue: string) => void): Promise<string>;

    getId(callback?: (error: Error, id: number) => void): Promise<number>;

    isListening(callback?: (error: Error, listening: boolean) => void): Promise<boolean>;

    getPeerCount(callback?: (error: Error, peerCount: number) => void): Promise<number>;

    listShards(callback?: (error: Error, shards: number[]) => void): Promise<number[]>;
}
