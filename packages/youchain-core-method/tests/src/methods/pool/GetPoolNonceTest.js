import {formatters} from 'youchain-core-helpers';
import * as Utils from 'youchain-utils';
import AbstractCallMethod from '../../../../lib/methods/AbstractCallMethod';
import GetPoolNonceMethod from '../../../../src/methods/pool/GetPoolNonceMethod';

// Mocks
jest.mock('Utils');
jest.mock('formatters');

/**
 * GetPoolNonceTest test
 */
describe('GetPoolNonceTest', () => {
    let method;

    beforeEach(() => {
        method = new GetPoolNonceMethod(Utils, formatters);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractCallMethod);

        expect(method.rpcMethod).toEqual('you_getPoolNonce');

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
        Utils.hexToNumber.mockReturnValueOnce(100);

        expect(method.afterExecution({})).toEqual(100);

        expect(Utils.hexToNumber).toHaveBeenCalledWith({});
    });
});
