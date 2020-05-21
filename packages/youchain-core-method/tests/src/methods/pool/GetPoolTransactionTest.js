import {formatters} from 'youchain-core-helpers';
import * as Utils from 'youchain-utils';
import AbstractCallMethod from '../../../../lib/methods/AbstractCallMethod';
import GetPoolTransactionMethod from '../../../../src/methods/pool/GetPoolTransactionMethod';

// Mocks
jest.mock('Utils');
jest.mock('formatters');

/**
 * GetPoolTransactionTest test
 */
describe('GetPoolTransactionTest', () => {
    let method;

    beforeEach(() => {
        method = new GetPoolTransactionMethod(Utils, formatters);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractCallMethod);

        expect(method.rpcMethod).toEqual('you_getPoolTransaction');

        expect(method.parametersAmount).toEqual(1);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(formatters);
    });

    it('beforeExecution should call the inputCallFormatter', () => {
        method.parameters = [{}];

        formatters.inputCallFormatter.mockReturnValueOnce({empty: true});

        method.beforeExecution({});

        expect(method.parameters[0]).toHaveProperty('empty', true);

        expect(formatters.inputCallFormatter).toHaveBeenCalledWith({}, {});
    });

    it('afterExecution should call hexToNumber and return the response', () => {
        formatters.outputTransactionFormatter.mockReturnValueOnce({empty: false});

        expect(method.afterExecution({})).toHaveProperty('empty', false);

        expect(formatters.outputTransactionFormatter).toHaveBeenCalledWith({});
    });
});
