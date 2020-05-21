const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    HttpProvider: 'youchain-providers',
    ProvidersModuleFactory: 'youchain-providers',
    ProviderDetector: 'youchain-providers',
    ProviderResolver: 'youchain-providers',
    MethodModuleFactory: 'youchain-core-method',
    GetPastLogsMethod: 'youchain-core-method',
    SubscriptionsFactory: 'youchain-core-subscriptions',
    LogSubscription: 'youchain-core-subscriptions',
    AbstractSubscription: 'youchain-core-subscriptions',
    formatters: 'youchain-core-helpers',
    Accounts: 'youchain-you-accounts',
    ContractModuleFactory: 'youchain-you-contract',
    AbiCoder: 'youchain-you-abi',
    Personal: 'youchain-you-personal',
    Network: 'youchain-net',
    Utils: 'youchain-utils',
    AbstractContract: 'youchain-you-contract'
});
