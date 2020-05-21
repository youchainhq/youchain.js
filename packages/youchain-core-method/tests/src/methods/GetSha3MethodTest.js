import {formatters} from 'youchain-core-helpers';
import AbstractCallMethod from '../../../lib/methods/AbstractCallMethod';
import GetSha3Method from '../../../src/methods/GetSha3Method';

// Mocks
jest.mock('formatters');

/**
 * GetSha3Method test
 */
describe('GetSha3MethodTest', () => {
    let method;

    beforeEach(() => {
        method = new GetSha3Method(null, formatters);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractCallMethod);

        expect(method.rpcMethod).toEqual('youchain_sha3');

        expect(method.parametersAmount).toEqual(1);

        expect(method.utils).toEqual(null);

        expect(method.formatters).toEqual(formatters);
    });
});
