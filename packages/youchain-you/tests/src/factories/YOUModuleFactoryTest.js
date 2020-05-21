import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import {MethodModuleFactory} from 'youchain-core-method';
import {PromiEvent} from 'youchain-core-promievent';
import {Accounts} from 'youchain-you-accounts';
import {AbiCoder} from 'youchain-you-abi';
import {ContractModuleFactory} from 'youchain-you-contract';
import {HttpProvider, ProvidersModuleFactory} from 'youchain-providers';
import YOU from '../../../src/YOU';
import YOUModuleFactory from '../../../src/factories/YOUModuleFactory';

// Mocks
jest.mock('HttpProvider');
jest.mock('ProvidersModuleFactory');
jest.mock('MethodModuleFactory');
jest.mock('Accounts');
jest.mock('ContractModuleFactory');
jest.mock('AbiCoder');
jest.mock('Utils');
jest.mock('formatters');
jest.mock('../../../src/YOU');

/**
 * YOUModuleFactoryTest test
 */
describe('YOUModuleFactoryTest', () => {
    let youModuleFactory,
        providerMock,
        providersModuleFactoryMock,
        methodModuleFactoryMock,
        accountsMock,
        contractModuleFactoryMock,
        abiCoderMock;

    beforeEach(() => {
        new HttpProvider();
        providerMock = HttpProvider.mock.instances[0];

        new ProvidersModuleFactory();
        providersModuleFactoryMock = ProvidersModuleFactory.mock.instances[0];

        new MethodModuleFactory();
        methodModuleFactoryMock = MethodModuleFactory.mock.instances[0];

        new Accounts();
        accountsMock = Accounts.mock.instances[0];

        new ContractModuleFactory();
        contractModuleFactoryMock = ContractModuleFactory.mock.instances[0];

        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];

        youModuleFactory = new YOUModuleFactory(
            providerMock,
            providersModuleFactoryMock,
            methodModuleFactoryMock,
            accountsMock,
            PromiEvent,
            Utils,
            formatters,
            contractModuleFactoryMock,
            abiCoderMock
        );
    });

    it('constructor check', () => {
        expect(youModuleFactory.provider).toEqual(providerMock);

        expect(youModuleFactory.providersModuleFactory).toEqual(providersModuleFactoryMock);

        expect(youModuleFactory.methodModuleFactory).toEqual(methodModuleFactoryMock);

        expect(youModuleFactory.accounts).toEqual(accountsMock);

        expect(youModuleFactory.PromiEvent).toEqual(PromiEvent);

        expect(youModuleFactory.utils).toEqual(Utils);

        expect(youModuleFactory.formatters).toEqual(formatters);

        expect(youModuleFactory.contractModuleFactory).toEqual(contractModuleFactoryMock);

        expect(youModuleFactory.abiCoder).toEqual(abiCoderMock);
    });

    it('calls createYOUModule and returns a Contract object', () => {
        expect(youModuleFactory.createYOUModule({}, '', {})).toBeInstanceOf(YOU);
    });
});
