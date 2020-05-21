import {
    BatchRequest,
    ProviderDetector,
    ProviderResolver,
    ProvidersModuleFactory,
    WebsocketProvider,
    HttpProvider,
    IpcProvider
} from 'youchain-providers';
import AbstractYOUChainModule from '../../src/AbstractYOUChainModule';
import MethodProxy from '../__mocks__/MethodProxy';
import MethodModuleFactory from '../__mocks__/MethodModuleFactory';
import MethodFactory from '../__mocks__/MethodFactory';

// Mocks
jest.mock('BatchRequest');
jest.mock('ProviderDetector');
jest.mock('ProvidersModuleFactory');
jest.mock('ProviderResolver');
jest.mock('WebsocketProvider');
jest.mock('HttpProvider');
jest.mock('IpcProvider');

/**
 * AbstractYOUChainModule test
 */
describe('AbstractYOUChainModuleTest', () => {
    let abstractYOUChainModule,
        providerDetectorMock,
        providerResolverMock,
        providersModuleFactoryMock,
        providerMock,
        methodModuleFactoryMock,
        methodFactoryMock;

    beforeEach(() => {
        methodFactoryMock = new MethodFactory();
        methodModuleFactoryMock = new MethodModuleFactory();

        new WebsocketProvider('HOST', {});
        providerMock = WebsocketProvider.mock.instances[0];
        providerMock.host = 'HOST';

        new ProvidersModuleFactory();
        providersModuleFactoryMock = ProvidersModuleFactory.mock.instances[0];

        new ProviderDetector();
        providerDetectorMock = ProviderDetector.mock.instances[0];

        new ProviderResolver();
        providerResolverMock = ProviderResolver.mock.instances[0];

        providerResolverMock.resolve = jest.fn(() => {
            return providerMock;
        });

        providerDetectorMock.detect = jest.fn(() => {
            return false;
        });

        providersModuleFactoryMock.createProviderResolver.mockReturnValueOnce(providerResolverMock);

        providersModuleFactoryMock.createProviderDetector.mockReturnValueOnce(providerDetectorMock);

        methodFactoryMock.hasMethod = jest.fn(() => {
            return false;
        });

        methodModuleFactoryMock.createMethodProxy = jest.fn((target, methodFactory) => {
            return new MethodProxy(target);
        });

        abstractYOUChainModule = new AbstractYOUChainModule(
            'WS',
            providersModuleFactoryMock,
            methodModuleFactoryMock,
            methodFactoryMock,
            {
                defaultAccount: '0x03c9a938ff7f54090d0d99e2c6f80380510ea078',
                defaultBlock: 'latest',
                defaultGasPrice: 100,
                defaultGas: 100
            }
        );
    });

    it('constructor throws error on missing required parameters', () => {
        expect(() => {
            new AbstractYOUChainModule();
        }).toThrow('Missing parameter: provider');

        expect(() => {
            new AbstractYOUChainModule('');
        }).toThrow('Missing parameter: ProvidersModuleFactory');
    });

    it('constructor defines all properties', () => {
        expect(abstractYOUChainModule.defaultAccount).toEqual('0x03C9A938fF7f54090d0d99e2c6f80380510Ea078');

        expect(abstractYOUChainModule.defaultBlock).toEqual('latest');

        expect(abstractYOUChainModule.transactionBlockTimeout).toEqual(50);

        expect(abstractYOUChainModule.transactionConfirmationBlocks).toEqual(24);

        expect(abstractYOUChainModule.transactionPollingTimeout).toEqual(750);

        expect(abstractYOUChainModule.defaultGasPrice).toEqual(100);

        expect(abstractYOUChainModule.defaultGas).toEqual(100);

        expect(abstractYOUChainModule.BatchRequest).toBeInstanceOf(Function);

        expect(abstractYOUChainModule.methodFactory).toEqual(methodFactoryMock);

        expect(abstractYOUChainModule.providerDetector).toEqual(providerDetectorMock);

        expect(abstractYOUChainModule.currentProvider).toEqual(providerMock);

        expect(methodModuleFactoryMock.createMethodProxy).toHaveBeenCalledWith(
            abstractYOUChainModule,
            methodFactoryMock
        );

        expect(providerResolverMock.resolve).toHaveBeenCalledWith('WS');
    });

    it('gets the BatchRequest property and it is of type BatchRequest', () => {
        const batchRequestMock = new BatchRequest();

        providersModuleFactoryMock.createBatchRequest.mockReturnValueOnce(batchRequestMock);

        expect(new abstractYOUChainModule.BatchRequest()).toBeInstanceOf(BatchRequest);

        expect(providersModuleFactoryMock.createBatchRequest).toHaveBeenCalledWith(abstractYOUChainModule);
    });

    it('sets the defaultAccount property validates the address and throws error', () => {
        try {
            abstractYOUChainModule.defaultAccount = '0';
        } catch (error) {
            expect(error.message).toEqual('Given address "0" is not a valid YOUChain address.');
        }
    });

    it('sets the defaultAccount property and validates the address', () => {
        abstractYOUChainModule.defaultAccount = '0x03c9a938ff7f54090d0d99e2c6f80380510ea078';
        expect(abstractYOUChainModule.defaultAccount).toEqual('0x03C9A938fF7f54090d0d99e2c6f80380510Ea078');
    });

    it('sets the defaultBlock property', () => {
        abstractYOUChainModule.defaultBlock = 'latest';
        expect(abstractYOUChainModule.defaultBlock).toEqual('latest');
    });

    it('sets the transactionBlockTimeout property', () => {
        abstractYOUChainModule.transactionBlockTimeout = 0;
        expect(abstractYOUChainModule.transactionBlockTimeout).toEqual(0);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        abstractYOUChainModule.transactionConfirmationBlocks = 0;
        expect(abstractYOUChainModule.transactionConfirmationBlocks).toEqual(0);
    });

    it('sets the transactionPollingTimeout property', () => {
        abstractYOUChainModule.transactionPollingTimeout = 0;
        expect(abstractYOUChainModule.transactionPollingTimeout).toEqual(0);
    });

    it('sets the defaultGasPrice property', () => {
        abstractYOUChainModule.defaultGasPrice = 0;
        expect(abstractYOUChainModule.defaultGasPrice).toEqual(0);
    });

    it('sets the defaultGas property', () => {
        abstractYOUChainModule.defaultGas = 0;
        expect(abstractYOUChainModule.defaultGas).toEqual(0);
    });

    it('gets the currentProvider property who is read-only', () => {
        try {
            abstractYOUChainModule.currentProvider = false;
        } catch (error) {
            expect(error.message).toEqual('The property currentProvider is read-only!');
        }
    });

    it('calls setProvider returns true and sets the provider as currentProvider', () => {
        expect(abstractYOUChainModule.setProvider('SOCKET_PROVIDER')).toEqual(true);

        expect(providerResolverMock.resolve).toHaveBeenNthCalledWith(1, 'WS');

        expect(providerResolverMock.resolve).toHaveBeenNthCalledWith(2, 'SOCKET_PROVIDER', undefined);

        expect(abstractYOUChainModule.currentProvider).toEqual(providerMock);
    });

    it('calls setProvider returns true, sets the provider and clears the subscriptions', () => {
        providerMock.subscriptions = [0, 1];
        providerMock.clearSubscriptions = jest.fn();

        expect(abstractYOUChainModule.setProvider('SOCKET_PROVIDER')).toEqual(true);

        expect(providerResolverMock.resolve).toHaveBeenNthCalledWith(1, 'WS');

        expect(providerResolverMock.resolve).toHaveBeenNthCalledWith(2, 'SOCKET_PROVIDER', undefined);

        expect(providerMock.clearSubscriptions).toHaveBeenCalled();

        expect(abstractYOUChainModule.currentProvider).toEqual(providerMock);
    });

    it('calls setProvider and throws an error because of the resolver', () => {
        providerResolverMock.resolve = jest.fn(() => {
            throw new Error('Invalid provider');
        });

        const provider = {
            constructor: {
                name: 'WebsocketProvider'
            },
            host: 'WS'
        };

        expect(() => {
            abstractYOUChainModule.setProvider(provider);
        }).toThrow('Invalid provider');

        expect(providerResolverMock.resolve).toHaveBeenCalledWith(provider, undefined);
    });

    it('calls setProvider and returns false because of the equal host', () => {
        expect(abstractYOUChainModule.setProvider('HOST')).toEqual(false);
    });

    it('calls setProvider and returns false because of the same constructor name', () => {
        const provider = {
            constructor: {
                name: 'WebsocketProvider'
            },
            host: 'HOST'
        };

        expect(abstractYOUChainModule.setProvider(provider)).toEqual(false);
    });

    it('calls isSameProvider and returns false', () => {
        const provider = {
            constructor: {
                name: 'HttpProvider'
            },
            host: 'HOST1'
        };

        expect(abstractYOUChainModule.isSameProvider(provider)).toEqual(false);
    });

    it('calls isSameProvider and returns true', () => {
        const provider = {
            constructor: {
                name: 'WebsocketProvider'
            },
            host: 'HOST'
        };

        expect(abstractYOUChainModule.isSameProvider(provider)).toEqual(true);
    });

    it('initiates a HttpProvider with the providers property of the module', () => {
        const url = 'HOST';
        const options = {};

        const httpProvider = new AbstractYOUChainModule.providers.HttpProvider(url, options);

        expect(httpProvider).toBeInstanceOf(HttpProvider);
    });
    it('initiates a WebsocketProvider with the providers property of the module', () => {
        const url = 'HOST';
        const options = {};

        const websocketProvider = new AbstractYOUChainModule.providers.WebsocketProvider(url, options);

        expect(websocketProvider).toBeInstanceOf(WebsocketProvider);
    });

    it('initiates a IpcProvider with the providers property of the module', () => {
        const path = 'HOST';
        const net = {};

        const ipcProvider = new AbstractYOUChainModule.providers.IpcProvider(path, net);

        expect(ipcProvider).toBeInstanceOf(IpcProvider);
    });
});
