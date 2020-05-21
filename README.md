# youchain.js - YOUChain JavaScript API

You need to run a local or remote YOUChain node to use this library.

## Installation

### Node

```bash
npm install youchain
```

### Yarn

```bash
yarn add youchain
```

## Usage

```js
import YOUChain from 'youchain';

const youchain = new YOUChain('http://localhost:8283');
console.log(youchain);
> {
    you: ... ,
    utils: ...,
    ...
}
```

Additionally you can set a provider using `youchain.setProvider()` (e.g. HttpProvider)

```js
youchain.setProvider('http://localhost:8283');
// or
youchain.setProvider(new YOUChain.providers.HttpProvider('http://localhost:8283'));
```

There you go, now you can use it:

```js
youchain.you.getAccounts().then(console.log);
```

### Usage with TypeScript

We do support types within the repo itself. Please open an issue here if you find any wrong types.

You can use `youchain.js` as follows:

```typescript
import YOUChain from 'youchain';
const youchain = new YOUChain('http://localhost:8283');
```

## Contributing

-   All contributions have to go into the 1.0 branch
-   Please follow the code style of the other files, we use 4 spaces as tabs.

### Requirements

-   [Node.js](https://nodejs.org)
-   npm

### Commands

```bash
npm run clean // removes all the node_modules folders in all modules
npm run bootstrap // install all dependencies and symlinks the internal modules for all modules
npm run test // runs all tests
npm run build // runs rollup
npm run dev // runs rollup with a watcher
```

[repo]: https://github.com/youchainhq/youchain.js
