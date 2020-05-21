const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    'formatters': 'youchain-core-helpers',
    'AbiCoder': 'youchain-you-abi',
    'MethodModuleFactory': 'youchain-core-method',
    'EstimateGasMethod': 'youchain-core-method',
    'GetPastLogsMethod': 'youchain-core-method',
    'Accounts': 'youchain-you-accounts',
    'HttpProvider': 'youchain-providers',
    'ProvidersModuleFactory': 'youchain-providers',
    'ProviderDetector': 'youchain-providers',
    'ProviderResolver': 'youchain-providers',
    'Utils': 'youchain-utils'
});
