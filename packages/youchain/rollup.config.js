import pkg from './package.json';
import rollupConfig from '../../rollup.config';

export default rollupConfig('YOUChain', pkg.name, {
    'youchain-core': 'youchain-core',
    'youchain-core-helpers': 'youchain-core-helpers',
    'youchain-core-method': 'youchain-core-method',
    'youchain-providers': 'youchain-providers',
    'youchain-utils': 'youchain-utils',
    'youchain-you': 'youchain-you',
    'youchain-you-personal': 'youchain-you-personal',
    'youchain-net': 'youchain-net'
});
