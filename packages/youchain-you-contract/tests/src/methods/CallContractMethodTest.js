import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import {AbiCoder} from 'youchain-you-abi';
import {CallMethod} from 'youchain-core-method';
import AbiItemModel from '../../../src/models/AbiItemModel';
import CallContractMethod from '../../../src/methods/CallContractMethod';

// Mocks
jest.mock('Utils');
jest.mock('formatters');
jest.mock('AbiCoder');
jest.mock('../../../src/models/AbiItemModel');

/**
 * CallContractMethod test
 */
describe('CallContractMethodTest', () => {
    let callContractMethod, abiItemModelMock, abiCoderMock;

    beforeEach(() => {
        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];
        abiCoderMock.decodeParameters = jest.fn();

        new AbiItemModel();
        abiItemModelMock = AbiItemModel.mock.instances[0];

        callContractMethod = new CallContractMethod(Utils, formatters, abiCoderMock, abiItemModelMock);
    });

    it('constructor check', () => {
        expect(callContractMethod.utils).toEqual(Utils);

        expect(callContractMethod.formatters).toEqual(formatters);

        expect(callContractMethod.abiItemModel).toEqual(abiItemModelMock);

        expect(callContractMethod).toBeInstanceOf(CallMethod);
    });

    it('calls afterExecution with undefined response and returns the expected result', () => {
        expect(callContractMethod.afterExecution()).toEqual(null);
    });

    it('calls afterExecution and returns the result array', () => {
        abiCoderMock.decodeParameters.mockReturnValueOnce(['0x0', '0x0']);

        abiItemModelMock.getOutputs.mockReturnValueOnce([]);

        expect(callContractMethod.afterExecution('0x0')).toEqual(['0x0', '0x0']);

        expect(abiCoderMock.decodeParameters).toHaveBeenCalledWith([], '0');
    });

    it('calls afterExecution and returns the first array item as result', () => {
        abiCoderMock.decodeParameters.mockReturnValueOnce(['0x0']);

        abiItemModelMock.getOutputs.mockReturnValueOnce([]);

        expect(callContractMethod.afterExecution('0x0')).toEqual('0x0');

        expect(abiCoderMock.decodeParameters).toHaveBeenCalledWith([], '0');
    });

    it('calls afterExecution and response is empty', () => {
        expect(callContractMethod.afterExecution()).toEqual(null);
    });

    it('calls afterExecution and response has value "0x" is empty', () => {
        expect(callContractMethod.afterExecution('0x')).toEqual(null);
    });
});
