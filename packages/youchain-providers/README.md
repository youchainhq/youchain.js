# youchain-providers

This is a sub package of [youchain.js][repo]

## Installation

```bash
npm install youchain-providers
```

## Usage Examples

#### HttpProvider

You can pass with the options object the timeout and all known HTTP headers.

```js
import {HttpProvider} from 'youchain-providers';

const options = {
    timeout: 20000,
    headers: [
        {
            name: 'Access-Control-Allow-Origin', value: '*'
        },
        ...
    ]
};

const httpProvider = new HttpProvider('http://localhost:8283', options);
```

#### WebsocketProvider

Instead of setting a authorization header you could also define the credentials over the URL with: `ws://username:password@localhost:8546`

```js
import {WebsocketProvider} from 'youchain-providers';
const options = {
    timeout: 30000,
    headers: {
        authorization: 'Basic username:password'
    }
};

const websocketProvider = new WebsocketProvider('ws://localhost:8283', options);
```

#### IpcProvider

```js
import {IpcProvider} from 'youchain-providers';
import net from 'net';

const ipcProvider = new IpcProvider('/Users/me/Library/youchain/youchain.ipc', net);
```

#### BatchRequest

The BatchRequest provides the possibility to send JSON-RPC requests as batch.

```js
import {ProvidersModuleFactory, BatchRequest} 'youchain-providers';

const provider = new ProvidersModuleFactory()
                        .createProviderResolver
                        .resolve('http://localhost:8283');

const batchRequest = new BatchRequest(provider);

batchRequest.add(youchain.you.getBalance.request(
    '0x0000000000000000000000000000000000000000',
    'latest',
    callback
));

await batchRequest.execute();
```

#### ProviderDetector

Checks if an provider is given from the environment and returns the provider.

```js
import {ProvidersModuleFactory} from 'youchain-providers';

const providerDetector = new ProvidersModuleFactory.createProviderDetector();
const givenProvider = providerDetector.detect();
```

#### ProviderResolver

The ProviderResolver resolves an url or an given provider object to the correct provider class. Because of the resolves does youchain has internally just one provider interface and we have no direct dependency to third party providers.

```js
import {ProvidersModuleFactory} 'youchain-providers';

const socketProviderAdapter = new ProvidersModuleFactory()
                        .createProviderResolver
                        .resolve('ws://localhost:8283');
```

## Types

All the typescript typings are placed in the types folder.

[repo]: https://github.com/youchainhq/youchain.js
