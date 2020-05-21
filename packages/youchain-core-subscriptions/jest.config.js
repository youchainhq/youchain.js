const jestConfig = require('../../jest.config');

module.exports = jestConfig({
    Utils: 'youchain-utils',
    formatters: 'youchain-core-helpers'
});
