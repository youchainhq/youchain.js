const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    Utils: 'youchain-utils',
    formatters: 'youchain-core-helpers',
    HttpProvider: 'youchain-providers',
    ProvidersModuleFactory: 'youchain-providers',
    ProviderDetector: 'youchain-providers',
    ProviderResolver: 'youchain-providers',
    MethodModuleFactory: 'youchain-core-method',
    scryptsy: 'scrypt.js'
});
