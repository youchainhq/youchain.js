import ProviderResolver from '../../../src/resolvers/ProviderResolver';
import ProvidersModuleFactory from '../../../src/factories/ProvidersModuleFactory';
import HttpProvider from '../../../src/providers/HttpProvider';
import WebsocketProvider from '../../../src/providers/WebsocketProvider';
import IpcProvider from '../../../src/providers/IpcProvider';

// Mocks
jest.mock('../../../src/factories/ProvidersModuleFactory');
jest.mock('../../../src/providers/HttpProvider');
jest.mock('../../../src/providers/WebsocketProvider');
jest.mock('../../../src/providers/IpcProvider');

/**
 * ProviderResolver test
 */
describe('ProviderResolverTest', () => {
    let providerResolver, providersModuleFactory, providersModuleFactoryMock;

    beforeEach(() => {
        providersModuleFactory = new ProvidersModuleFactory();
        providersModuleFactoryMock = ProvidersModuleFactory.mock.instances[0];

        providerResolver = new ProviderResolver(providersModuleFactory);
    });

    it('calls resolve with HTTP url', () => {
        new HttpProvider('host', {}, providersModuleFactoryMock);
        const httpProviderMock = HttpProvider.mock.instances[0];

        providersModuleFactory.createHttpProvider.mockReturnValueOnce(httpProviderMock);

        expect(providerResolver.resolve('http://localhost:8283')).toBeInstanceOf(HttpProvider);

        expect(providersModuleFactoryMock.createHttpProvider).toHaveBeenCalledWith('http://localhost:8283');
    });

    it('calls resolve with WebSocket url', () => {
        new WebsocketProvider({}, 1);
        const websocketProviderMock = WebsocketProvider.mock.instances[0];

        providersModuleFactory.createWebsocketProvider.mockReturnValueOnce(websocketProviderMock);

        expect(providerResolver.resolve('ws://127.0.0.1:8283')).toBeInstanceOf(WebsocketProvider);

        expect(providersModuleFactoryMock.createWebsocketProvider).toHaveBeenCalledWith('ws://127.0.0.1:8283');
    });

    it('calls resolve with Ipc path and net object', () => {
        new IpcProvider({}, '/path/to/the/socket');
        const ipcProviderMock = IpcProvider.mock.instances[0];

        const net = {connect: () => {}};

        providersModuleFactory.createIpcProvider.mockReturnValueOnce(ipcProviderMock);

        expect(providerResolver.resolve('/path/to/the/socket', net)).toBeInstanceOf(IpcProvider);

        expect(providersModuleFactoryMock.createIpcProvider).toHaveBeenCalledWith('/path/to/the/socket', net);
    });

    it('calls resolve with the HttpProvider', () => {
        new HttpProvider('host', {}, providersModuleFactoryMock);
        const httpProviderMock = HttpProvider.mock.instances[0];

        expect(providerResolver.resolve(httpProviderMock)).toBeInstanceOf(HttpProvider);
    });

    it('calls resolve with the WebsocketProvider', () => {
        new WebsocketProvider({}, 1);
        const websocketProviderMock = WebsocketProvider.mock.instances[0];

        expect(providerResolver.resolve(websocketProviderMock)).toBeInstanceOf(WebsocketProvider);
    });

    it('calls resolve with the IpcProvider', () => {
        new IpcProvider({}, '/path/to/the/socket');
        const ipcProviderMock = IpcProvider.mock.instances[0];

        expect(providerResolver.resolve(ipcProviderMock)).toBeInstanceOf(IpcProvider);
    });
});
