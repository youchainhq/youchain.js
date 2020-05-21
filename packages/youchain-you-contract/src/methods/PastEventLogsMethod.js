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

export default class PastEventLogsMethod extends GetPastLogsMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {EventLogDecoder} eventLogDecoder
     * @param {AbiItemModel} abiItemModel
     * @param {EventOptionsMapper} eventOptionsMapper
     *
     * @constructor
     */
    constructor(utils, formatters, eventLogDecoder, abiItemModel, eventOptionsMapper) {
        super(utils, formatters);
        this.abiItemModel = abiItemModel;
        this.eventLogDecoder = eventLogDecoder;
        this.eventOptionsMapper = eventOptionsMapper;
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractYOUChainModule} moduleInstance - The package where the method is called from for example You.
     */
    beforeExecution(moduleInstance) {
        super.beforeExecution(moduleInstance);

        this.parameters[0] = this.eventOptionsMapper.map(this.abiItemModel, moduleInstance, this.parameters[0]);
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Array} response
     *
     * @returns {Array}
     */
    afterExecution(response) {
        const formattedLogs = super.afterExecution(response);

        return formattedLogs.map((logItem) => {
            return this.eventLogDecoder.decode(this.abiItemModel, logItem);
        });
    }
}
