import * as Utils from 'youchain-utils';
import AbstractCallMethod from '../../../../lib/methods/AbstractCallMethod';
import GetCoinbaseMethod from '../../../../src/methods/node/GetCoinbaseMethod';

// Mocks
jest.mock('Utils');

/**
 * GetCoinbaseMethod test
 */
describe('GetCoinbaseMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new GetCoinbaseMethod(Utils, null);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractCallMethod);

        expect(method.rpcMethod).toEqual('you_coinbase');

        expect(method.parametersAmount).toEqual(0);

        expect(method.utils).toEqual(Utils);

        expect(method.formatters).toEqual(null);
    });
});
