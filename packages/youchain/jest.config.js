const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    HttpProvider: 'youchain-providers',
    WebsocketProvider: 'youchain-providers',
    IpcProvider: 'youchain-providers',
    YOU: 'youchain-you',
    Network: 'youchain-net',
    Personal: 'youchain-you-personal',
    Utils: 'youchain-utils'
});
