import AbstractCallMethod from '../../../../lib/methods/AbstractCallMethod';
import ListShardsMethod from '../../../../src/methods/network/ListShardsMethod';

/**
 * GetProtocolVersionMethod test
 */
describe('ListShardsMethodTest', () => {
    let method;

    beforeEach(() => {
        method = new ListShardsMethod(null, null);
    });

    it('constructor check', () => {
        expect(method).toBeInstanceOf(AbstractCallMethod);

        expect(method.rpcMethod).toEqual('net_listShards');

        expect(method.parametersAmount).toEqual(0);

        expect(method.utils).toEqual(null);

        expect(method.formatters).toEqual(null);
    });
});
