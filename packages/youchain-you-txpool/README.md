# youchain-you-txpool

This is a sub package of [youchain.js][repo]

This is the TxPool module. This is an independent module. If you want to use this module, you need to import it in your project.
Please read the [documentation][docs] for more.

## Installation

```bash
npm install youchain-you-txpool
```

## Usage

```js
import {TxPool} from 'youchain-you-txpool';

const txPool = new TxPool(
    'http://127.0.0.1:8546',
    null,
    options
);
```

## Types

All the typescript typings are placed in the types folder.

[repo]: https://github.com/youchainhq/youchain.js
