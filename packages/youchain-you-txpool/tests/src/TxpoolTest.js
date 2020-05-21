import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import {HttpProvider, ProvidersModuleFactory, ProviderDetector, ProviderResolver} from 'youchain-providers';
import {
    MethodModuleFactory
} from 'youchain-core-method';
import {Network} from 'youchain-net';
import {AbstractYOUChainModule} from 'youchain-core';
import MethodFactory from '../../src/factories/MethodFactory';
import TxPool from '../../src/TxPool';

// Mocks
jest.mock('Utils');
jest.mock('formatters');
jest.mock('HttpProvider');
jest.mock('ProvidersModuleFactory');
jest.mock('ProviderDetector');
jest.mock('ProviderResolver');
jest.mock('MethodModuleFactory');
jest.mock('Network');

/**
 * TxPool test
 */
describe('TxpoolTest', () => {
    let txpool,
        providerMock,
        providersModuleFactoryMock,
        providerDetectorMock,
        providerResolverMock,
        methodModuleFactoryMock,
        methodFactory,
        networkMock;

    beforeEach(() => {
        new HttpProvider();
        providerMock = HttpProvider.mock.instances[0];

        new ProvidersModuleFactory();
        providersModuleFactoryMock = ProvidersModuleFactory.mock.instances[0];

        new ProviderDetector();
        providerDetectorMock = ProviderDetector.mock.instances[0];
        providerDetectorMock.detect = jest.fn(() => {
            return null;
        });

        new ProviderResolver();
        providerResolverMock = ProviderResolver.mock.instances[0];
        providerResolverMock.resolve = jest.fn(() => {
            return providerMock;
        });

        providersModuleFactoryMock.createProviderDetector.mockReturnValueOnce(providerDetectorMock);

        providersModuleFactoryMock.createProviderResolver.mockReturnValueOnce(providerResolverMock);

        new MethodModuleFactory();
        methodModuleFactoryMock = MethodModuleFactory.mock.instances[0];
        methodModuleFactoryMock.createMethodProxy = jest.fn();

        methodFactory = new MethodFactory(methodModuleFactoryMock, Utils, formatters);

        new Network();
        networkMock = Network.mock.instances[0];

        txpool = new TxPool(providerMock,
            providersModuleFactoryMock,
            methodModuleFactoryMock,
            methodFactory,
            networkMock,
            Utils,
            formatters,
            {});
    });

    it('constructor check', () => {
        expect(txpool.net).toEqual(networkMock);

        expect(txpool.utils).toEqual(Utils);

        expect(txpool.formatters).toEqual(formatters);

        expect(txpool).toBeInstanceOf(AbstractYOUChainModule);
    });

    it('calls setProvider and returns true', () => {
        networkMock.setProvider = jest.fn();
        networkMock.setProvider.mockReturnValueOnce(true);

        expect(txpool.setProvider(providerMock, 'net')).toEqual(true);

        expect(networkMock.setProvider).toHaveBeenCalledWith(providerMock, 'net');
    });

    it('sets the defaultGasPrice property', () => {
        txpool.defaultGasPrice = 10;

        expect(txpool.defaultGasPrice).toEqual(10);

        expect(networkMock.defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        txpool.defaultGas = 10;

        expect(txpool.defaultGas).toEqual(10);

        expect(networkMock.defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        txpool.transactionBlockTimeout = 10;

        expect(txpool.transactionBlockTimeout).toEqual(10);

        expect(networkMock.transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        txpool.transactionConfirmationBlocks = 10;

        expect(txpool.transactionConfirmationBlocks).toEqual(10);

        expect(networkMock.transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        txpool.transactionPollingTimeout = 10;

        expect(txpool.transactionPollingTimeout).toEqual(10);

        expect(networkMock.transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('0x2');

        txpool.defaultAccount = '0x0';

        expect(txpool.defaultAccount).toEqual('0x2');

        expect(networkMock.defaultAccount).toEqual('0x0');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x0');
    });

    it('sets the defaultBlock property', () => {
        txpool.defaultBlock = 1;

        expect(txpool.defaultBlock).toEqual(1);

        expect(networkMock.defaultBlock).toEqual(1);
    });
});
