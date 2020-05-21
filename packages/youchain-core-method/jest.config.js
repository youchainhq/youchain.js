const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    WebsocketProvider: 'youchain-providers',
    HttpProvider: 'youchain-providers',
    AbstractYOUChainModule: 'youchain-core',
    Utils: 'youchain-utils',
    formatters: 'youchain-core-helpers',
    PromiEvent: 'youchain-core-promievent',
    Subscription: 'youchain-core-subscriptions',
    SubscriptionsFactory: 'youchain-core-subscriptions',
    AbstractSubscription: 'youchain-core-subscriptions'
});
