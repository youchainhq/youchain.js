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

import ProvidersModuleFactory from './factories/ProvidersModuleFactory';

/**
 * Creates the HttpProvider object.
 *
 * @param {String} url
 * @param {Object} options
 *
 * @returns {HttpProvider}
 *
 * @constructor
 */
export const HttpProvider = (url, options) => {
    return new ProvidersModuleFactory().createHttpProvider(url, options);
};

/**
 * Creates the WebsocketProvider object
 *
 * @param {String} url
 * @param {Object} options
 *
 * @returns {WebsocketProvider}
 *
 * @constructor
 */
export const WebsocketProvider = (url, options) => {
    return new ProvidersModuleFactory().createWebsocketProvider(url, options);
};

/**
 * Creates the IpcProvider object
 *
 * @param {string} path
 * @param {Net} net
 *
 * @returns {IpcProvider}
 *
 * @constructor
 */
export const IpcProvider = (path, net) => {
    return new ProvidersModuleFactory().createIpcProvider(path, net);
};

/**
 * Creates the BatchRequest object
 *
 * @method BatchRequest
 *
 * @param {AbstractYOUChainModule} moduleInstance
 *
 * @returns {BatchRequest}
 *
 * @constructor
 */
export const BatchRequest = (moduleInstance) => {
    return new ProvidersModuleFactory().createBatchRequest(moduleInstance);
};

/**
 * Creates the ProviderResolver object
 *
 * @method ProviderResolver
 *
 * @returns {ProviderResolver}
 *
 * @constructor
 */
export const ProviderResolver = () => {
    return new ProvidersModuleFactory().createProviderResolver();
};

/**
 * Creates the ProviderDetector object
 *
 * @method detect
 *
 * @returns {ProviderDetector}
 *
 * @constructor
 */
export const ProviderDetector = () => {
    return new ProvidersModuleFactory().createProviderDetector();
};

export ProvidersModuleFactory from './factories/ProvidersModuleFactory';
