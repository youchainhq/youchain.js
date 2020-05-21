const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    ProvidersModuleFactory: 'youchain-providers',
    ProviderDetector: 'youchain-providers',
    ProviderResolver: 'youchain-providers',
    BatchRequest: 'youchain-providers',
    WebsocketProvider: 'youchain-providers',
    HttpProvider: 'youchain-providers',
    IpcProvider: 'youchain-providers'
});
