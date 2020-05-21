import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import {ContentMethod, InspectMethod, StatusMethod} from 'youchain-core-method';

import MethodFactory from '../../../src/factories/MethodFactory';

// Mocks
jest.mock('youchain-utils');
jest.mock('youchain-core-helpers');

/**
 * MethodFactory test
 */
describe('MethodFactoryTest', () => {
    let methodFactory;

    beforeEach(() => {
        methodFactory = new MethodFactory(Utils, formatters);
    });

    it('constructor check', () => {
        expect(methodFactory.utils).toEqual(Utils);

        expect(methodFactory.formatters).toEqual(formatters);
    });

    it('JSON-RPC methods check', () => {
        expect(methodFactory.methods).toEqual({
            getContent: ContentMethod,
            getInspection: InspectMethod,
            getStatus: StatusMethod
        });
    });
});
