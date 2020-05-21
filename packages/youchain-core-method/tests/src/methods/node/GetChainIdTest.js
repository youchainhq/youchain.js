import {formatters} from 'youchain-core-helpers';
import * as Utils from 'youchain-utils';
import AbstractCallMethod from '../../../../lib/methods/AbstractCallMethod';
import GetChainIdTest from '../../../../src/methods/node/GetChainIdMethod';

// Mocks
jest.mock('Utils');
jest.mock('formatters');

/**
 * GetChainIdTest test
 */
describe('GetChainIdTest', () => {
    let method;

    beforeEach(() => {
        method = new GetChainIdTest(Utils, formatters);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractCallMethod);

        expect(method.rpcMethod).toEqual('you_chainId');

        expect(method.parametersAmount).toEqual(0);

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
