import * as Utils from 'youchain-utils';
import {formatters} from 'youchain-core-helpers';
import {AbstractSubscription, LogSubscription, SubscriptionsFactory} from 'youchain-core-subscriptions';
import {
    CallMethod,
    EstimateGasMethod,
    GetAccountsMethod,
    GetBalanceMethod,
    GetBlockMethod,
    GetBlockNumberMethod,
    GetBlockTransactionCountMethod,
    GetCodeMethod,
    GetSha3Method,
    GetCoinbaseMethod,
    GetGasPriceMethod,
    GetNodeInfoMethod,
    GetPastLogsMethod,
    GetProtocolVersionMethod,
    GetStorageAtMethod,
    GetTransactionCountMethod,
    GetTransactionFromBlockMethod,
    GetTransactionMethod,
    GetTransactionReceipt,
    IsMiningMethod,
    IsSyncingMethod,
    MethodModuleFactory,
    RequestAccountsMethod,
    SendRawTransactionMethod,
    SendTransactionMethod,
    SignMethod,
    SignTransactionMethod
} from 'youchain-core-method';
import {AbiCoder} from 'youchain-you-abi';
import {Accounts} from 'youchain-you-accounts';
import {Personal} from 'youchain-you-personal';
import {Network} from 'youchain-net';
import {AbstractContract, ContractModuleFactory} from 'youchain-you-contract';
import {HttpProvider, ProviderDetector, ProviderResolver, ProvidersModuleFactory} from 'youchain-providers';
import MethodFactory from '../../src/factories/MethodFactory';
import YOU from '../../src/YOU';

// Mocks
jest.mock('HttpProvider');
jest.mock('ProvidersModuleFactory');
jest.mock('ProviderDetector');
jest.mock('ProviderResolver');
jest.mock('MethodModuleFactory');
jest.mock('AbstractSubscription');
jest.mock('LogSubscription');
jest.mock('GetPastLogsMethod');
jest.mock('SubscriptionsFactory');
jest.mock('AbiCoder');
jest.mock('Accounts');
jest.mock('Personal');
jest.mock('Network');
jest.mock('Utils');
jest.mock('formatters');
jest.mock('AbstractContract');
jest.mock('ContractModuleFactory');
jest.mock('../../src/factories/YOUModuleFactory');

/**
 * YOU test
 */
describe('YOUTest', () => {
    let you,
        providerMock,
        providersModuleFactoryMock,
        providerDetectorMock,
        providerResolverMock,
        methodModuleFactoryMock,
        methodFactory,
        contractModuleFactoryMock,
        networkMock,
        accountsMock,
        personalMock,
        abiCoderMock,
        subscriptionsFactoryMock;

    beforeEach(() => {
        new HttpProvider();
        providerMock = HttpProvider.mock.instances[0];

        new ProvidersModuleFactory();
        providersModuleFactoryMock = ProvidersModuleFactory.mock.instances[0];

        new ProviderDetector();
        providerDetectorMock = ProviderDetector.mock.instances[0];
        providerDetectorMock.detect = jest.fn(() => {
            return null;
        });

        new ProviderResolver();
        providerResolverMock = ProviderResolver.mock.instances[0];
        providerResolverMock.resolve = jest.fn(() => {
            return providerMock;
        });

        providersModuleFactoryMock.createProviderDetector.mockReturnValueOnce(providerDetectorMock);

        providersModuleFactoryMock.createProviderResolver.mockReturnValueOnce(providerResolverMock);

        new MethodModuleFactory();
        methodModuleFactoryMock = MethodModuleFactory.mock.instances[0];
        methodModuleFactoryMock.createMethodProxy = jest.fn();

        methodFactory = new MethodFactory(methodModuleFactoryMock, Utils, formatters);

        new ContractModuleFactory();
        contractModuleFactoryMock = ContractModuleFactory.mock.instances[0];

        new Network();
        networkMock = Network.mock.instances[0];

        new Accounts();
        accountsMock = Accounts.mock.instances[0];

        new Personal();
        personalMock = Personal.mock.instances[0];

        new AbiCoder();
        abiCoderMock = AbiCoder.mock.instances[0];

        new SubscriptionsFactory();
        subscriptionsFactoryMock = SubscriptionsFactory.mock.instances[0];

        you = new YOU(
            providerMock,
            providersModuleFactoryMock,
            methodModuleFactoryMock,
            methodFactory,
            networkMock,
            accountsMock,
            personalMock,
            abiCoderMock,
            Utils,
            formatters,
            subscriptionsFactoryMock,
            contractModuleFactoryMock,
            {}
        );
    });

    it('constructor check', () => {
        expect(you.contractModuleFactory).toEqual(contractModuleFactoryMock);

        expect(you.net).toEqual(networkMock);

        expect(you.accounts).toEqual(accountsMock);

        expect(you.personal).toEqual(personalMock);

        expect(you.abi).toEqual(abiCoderMock);

        expect(you.utils).toEqual(Utils);

        expect(you.formatters).toEqual(formatters);

        expect(you.initiatedContracts).toEqual([]);

        expect(you.Contract).toBeInstanceOf(Function);
    });

    it('JSON-RPC methods check', () => {
        expect(you.methodFactory.methods).toEqual({
            getNodeInfo: GetNodeInfoMethod,
            getProtocolVersion: GetProtocolVersionMethod,
            getCoinbase: GetCoinbaseMethod,
            isMining: IsMiningMethod,
            isSyncing: IsSyncingMethod,
            getGasPrice: GetGasPriceMethod,
            getAccounts: GetAccountsMethod,
            getBlockNumber: GetBlockNumberMethod,
            getBalance: GetBalanceMethod,
            getStorageAt: GetStorageAtMethod,
            getCode: GetCodeMethod,
            getSha3: GetSha3Method,
            getBlock: GetBlockMethod,
            getBlockTransactionCount: GetBlockTransactionCountMethod,
            getTransaction: GetTransactionMethod,
            getTransactionFromBlock: GetTransactionFromBlockMethod,
            getTransactionReceipt: GetTransactionReceipt,
            getTransactionCount: GetTransactionCountMethod,
            sendSignedTransaction: SendRawTransactionMethod,
            signTransaction: SignTransactionMethod,
            sendTransaction: SendTransactionMethod,
            sign: SignMethod,
            call: CallMethod,
            estimateGas: EstimateGasMethod,
            getPastLogs: GetPastLogsMethod,
            requestAccounts: RequestAccountsMethod
        });
    });

    it('sets the defaultGasPrice property', () => {
        you.initiatedContracts = [{defaultGasPrice: 20}];
        you.defaultGasPrice = 10;

        expect(you.initiatedContracts[0].defaultGasPrice).toEqual(10);

        expect(you.defaultGasPrice).toEqual(10);

        expect(networkMock.defaultGasPrice).toEqual(10);

        expect(personalMock.defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        you.initiatedContracts = [{defaultGas: 20}];
        you.defaultGas = 10;

        expect(you.initiatedContracts[0].defaultGas).toEqual(10);

        expect(you.defaultGas).toEqual(10);

        expect(networkMock.defaultGas).toEqual(10);

        expect(personalMock.defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        you.initiatedContracts = [{transactionBlockTimeout: 20}];
        you.transactionBlockTimeout = 10;

        expect(you.initiatedContracts[0].transactionBlockTimeout).toEqual(10);

        expect(you.transactionBlockTimeout).toEqual(10);

        expect(networkMock.transactionBlockTimeout).toEqual(10);

        expect(personalMock.transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        you.initiatedContracts = [{transactionConfirmationBlocks: 20}];
        you.transactionConfirmationBlocks = 10;

        expect(you.initiatedContracts[0].transactionConfirmationBlocks).toEqual(10);

        expect(you.transactionConfirmationBlocks).toEqual(10);

        expect(networkMock.transactionConfirmationBlocks).toEqual(10);

        expect(personalMock.transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        you.initiatedContracts = [{transactionPollingTimeout: 20}];
        you.transactionPollingTimeout = 10;

        expect(you.initiatedContracts[0].transactionPollingTimeout).toEqual(10);

        expect(you.transactionPollingTimeout).toEqual(10);

        expect(networkMock.transactionPollingTimeout).toEqual(10);

        expect(personalMock.transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        you.initiatedContracts = [{defaultAccount: '0x0'}];

        Utils.toChecksumAddress.mockReturnValue('0x2');

        you.defaultAccount = '0x1';

        expect(you.initiatedContracts[0].defaultAccount).toEqual('0x2');

        expect(you.defaultAccount).toEqual('0x2');

        expect(networkMock.defaultAccount).toEqual('0x1');

        expect(personalMock.defaultAccount).toEqual('0x1');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x1');
    });

    it('sets the defaultBlock property', () => {
        you.initiatedContracts = [{defaultBlock: 20}];
        you.defaultBlock = 10;

        expect(you.initiatedContracts[0].defaultBlock).toEqual(10);

        expect(you.defaultBlock).toEqual(10);

        expect(networkMock.defaultBlock).toEqual(10);

        expect(personalMock.defaultBlock).toEqual(10);
    });

    it('calls subscribe wih "logs" as type', () => {
        new GetPastLogsMethod();
        const getPastLogsMethodMock = GetPastLogsMethod.mock.instances[0];

        const methodFactoryMock = {
            createMethod: jest.fn(() => {
                return getPastLogsMethodMock;
            })
        };

        you.methodFactory = methodFactoryMock;

        providersModuleFactoryMock.createProviderDetector.mockReturnValueOnce(providerDetectorMock);

        providersModuleFactoryMock.createProviderResolver.mockReturnValueOnce(providerResolverMock);

        subscriptionsFactoryMock.createLogSubscription = jest.fn();

        new LogSubscription();
        const logSubscriptionMock = LogSubscription.mock.instances[0];

        logSubscriptionMock.subscribe.mockReturnValueOnce(logSubscriptionMock);

        subscriptionsFactoryMock.createLogSubscription.mockReturnValueOnce(logSubscriptionMock);

        const callback = () => {};

        expect(you.subscribe('logs', {}, callback)).toBeInstanceOf(LogSubscription);

        expect(subscriptionsFactoryMock.createLogSubscription).toHaveBeenCalledWith({}, you, getPastLogsMethodMock);

        expect(logSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);

        expect(methodFactoryMock.createMethod).toHaveBeenCalledWith('getPastLogs');
    });

    it('calls subscribe wih "newBlockHeaders" as type', () => {
        subscriptionsFactoryMock.createNewHeadsSubscription = jest.fn();

        new AbstractSubscription();
        const abstractSubscriptionMock = AbstractSubscription.mock.instances[0];

        abstractSubscriptionMock.subscribe.mockReturnValueOnce(abstractSubscriptionMock);

        subscriptionsFactoryMock.createNewHeadsSubscription.mockReturnValueOnce(abstractSubscriptionMock);

        const callback = () => {};

        expect(you.subscribe('newBlockHeaders', {}, callback)).toBeInstanceOf(AbstractSubscription);

        expect(subscriptionsFactoryMock.createNewHeadsSubscription).toHaveBeenCalledWith(you);

        expect(abstractSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls subscribe wih "pendingTransactions" as type', () => {
        subscriptionsFactoryMock.createNewPendingTransactionsSubscription = jest.fn();

        new AbstractSubscription();
        const abstractSubscriptionMock = AbstractSubscription.mock.instances[0];

        abstractSubscriptionMock.subscribe.mockReturnValueOnce(abstractSubscriptionMock);

        subscriptionsFactoryMock.createNewPendingTransactionsSubscription.mockReturnValueOnce(abstractSubscriptionMock);

        const callback = () => {};

        expect(you.subscribe('pendingTransactions', {}, callback)).toBeInstanceOf(AbstractSubscription);

        expect(subscriptionsFactoryMock.createNewPendingTransactionsSubscription).toHaveBeenCalledWith(you);

        expect(abstractSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls subscribe wih "syncing" as type', () => {
        subscriptionsFactoryMock.createSyncingSubscription = jest.fn();

        new AbstractSubscription();
        const abstractSubscriptionMock = AbstractSubscription.mock.instances[0];

        abstractSubscriptionMock.subscribe.mockReturnValueOnce(abstractSubscriptionMock);

        subscriptionsFactoryMock.createSyncingSubscription.mockReturnValueOnce(abstractSubscriptionMock);

        const callback = () => {};

        expect(you.subscribe('syncing', {}, callback)).toBeInstanceOf(AbstractSubscription);

        expect(subscriptionsFactoryMock.createSyncingSubscription).toHaveBeenCalledWith(you);

        expect(abstractSubscriptionMock.subscribe).toHaveBeenCalledWith(callback);
    });

    it('calls subscribe wih unknown type', () => {
        expect(() => {
            you.subscribe('NOPE', {}, () => {});
        }).toThrow('Unknown subscription: NOPE');
    });

    it('calls the Contract factory method from the constructor', () => {
        contractModuleFactoryMock.createContract.mockReturnValueOnce(new AbstractContract());

        expect(new you.Contract()).toBeInstanceOf(AbstractContract);

        expect(you.initiatedContracts).toHaveLength(1);
    });

    it('calls setProvider and returns true', () => {
        you.initiatedContracts = [
            {
                setProvider: jest.fn(() => {
                    return true;
                })
            }
        ];

        networkMock.setProvider = jest.fn();
        personalMock.setProvider = jest.fn();
        accountsMock.setProvider = jest.fn();

        networkMock.setProvider.mockReturnValueOnce(true);

        personalMock.setProvider.mockReturnValueOnce(true);

        accountsMock.setProvider.mockReturnValueOnce(true);

        expect(you.setProvider('provider', 'net')).toEqual(true);

        expect(you.initiatedContracts[0].setProvider).toHaveBeenCalledWith('provider', 'net');

        expect(networkMock.setProvider).toHaveBeenCalledWith('provider', 'net');

        expect(personalMock.setProvider).toHaveBeenCalledWith('provider', 'net');

        expect(accountsMock.setProvider).toHaveBeenCalledWith('provider', 'net');
    });
});
