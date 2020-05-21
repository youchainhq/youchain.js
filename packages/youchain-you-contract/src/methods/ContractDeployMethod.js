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

import {SendTransactionMethod} from 'youchain-core-method';

export default class ContractDeployMethod extends SendTransactionMethod {
    /**
     * @param {Utils} utils
     * @param {Object} formatters
     * @param {TransactionConfirmationWorkflow} transactionConfirmationWorkflow
     * @param {Accounts} accounts
     * @param {TransactionSigner} transactionSigner
     * @param {AbstractContract} contract
     *
     * @constructor
     */
    constructor(utils, formatters, transactionConfirmationWorkflow, accounts, transactionSigner, contract) {
        super(utils, formatters, transactionConfirmationWorkflow, accounts, transactionSigner);
        this.contract = contract;
    }

    /**
     * This method will be executed before the RPC request.
     *
     * @method beforeExecution
     *
     * @param {AbstractYOUChainModule} moduleInstance - The module where the method is called from for example You.
     */
    beforeExecution(moduleInstance) {
        super.beforeExecution(moduleInstance);
        delete this.parameters[0].to;
    }

    /**
     * This method will be executed after the RPC request.
     *
     * @method afterExecution
     *
     * @param {Object} response
     *
     * @returns {AbstractContract}
     */
    afterExecution(response) {
        const clonedContract = this.contract.clone();
        clonedContract.options.address = response.contractAddress;

        return clonedContract;
    }
}
