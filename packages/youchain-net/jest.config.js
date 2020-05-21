const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    formatters: 'youchain-core-helpers',
    Utils: 'youchain-utils',
    HttpProvider: 'youchain-providers',
    ProvidersModuleFactory: 'youchain-providers',
    ProviderDetector: 'youchain-providers',
    ProviderResolver: 'youchain-providers',
    MethodModuleFactory: 'youchain-core-method'
});
