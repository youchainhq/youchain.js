import {YOU} from 'youchain-you';
import {Network} from 'youchain-net';
import {Personal} from 'youchain-you-personal';
import {AbstractYOUChainModule} from 'youchain-core';
import * as Utils from 'youchain-utils';
import YOUChain from '../../src/youchain';

// Mocks
jest.mock('YOU');
jest.mock('Network');
jest.mock('Personal');
jest.mock('Utils');

/**
 * YOUChain test
 */
describe('YOUChainTest', () => {
    let youchain;

    beforeEach(() => {
        youchain = new YOUChain('http://', {});
    });

    it('constructor check', () => {
        expect(youchain.you).toBeInstanceOf(YOU);

        expect(youchain).toBeInstanceOf(AbstractYOUChainModule);
    });

    it('sets the defaultGasPrice property', () => {
        youchain.defaultGasPrice = 10;

        expect(youchain.defaultGasPrice).toEqual(10);

        expect(YOU.mock.instances[0].defaultGasPrice).toEqual(10);
    });

    it('sets the defaultGas property', () => {
        youchain.defaultGas = 10;

        expect(youchain.defaultGas).toEqual(10);

        expect(YOU.mock.instances[0].defaultGas).toEqual(10);
    });

    it('sets the transactionBlockTimeout property', () => {
        youchain.transactionBlockTimeout = 10;

        expect(youchain.transactionBlockTimeout).toEqual(10);

        expect(YOU.mock.instances[0].transactionBlockTimeout).toEqual(10);
    });

    it('sets the transactionConfirmationBlocks property', () => {
        youchain.transactionConfirmationBlocks = 10;

        expect(youchain.transactionConfirmationBlocks).toEqual(10);

        expect(YOU.mock.instances[0].transactionConfirmationBlocks).toEqual(10);
    });

    it('sets the transactionPollingTimeout property', () => {
        youchain.transactionPollingTimeout = 10;

        expect(youchain.transactionPollingTimeout).toEqual(10);

        expect(YOU.mock.instances[0].transactionPollingTimeout).toEqual(10);
    });

    it('sets the defaultAccount property', () => {
        Utils.toChecksumAddress.mockReturnValue('0x2');

        youchain.defaultAccount = '0x1';

        expect(youchain.defaultAccount).toEqual('0x2');

        expect(YOU.mock.instances[0].defaultAccount).toEqual('0x1');

        expect(Utils.toChecksumAddress).toHaveBeenCalledWith('0x1');
    });

    it('sets the defaultBlock property', () => {
        youchain.defaultBlock = 10;

        expect(youchain.defaultBlock).toEqual(10);

        expect(YOU.mock.instances[0].defaultBlock).toEqual(10);
    });

    it('calls setProvider and returns true', () => {
        const youMock = YOU.mock.instances[0];

        youMock.setProvider = jest.fn().mockReturnValueOnce(true);

        expect(youchain.setProvider('http://localhost', 'net')).toEqual(true);

        expect(youchain.currentProvider.host).toEqual('http://localhost');

        expect(youMock.setProvider).toHaveBeenCalledWith('http://localhost', 'net');
    });

    it('calls the static modules property and gets the expected object', () => {
        const modules = YOUChain.modules;

        const you = new modules.YOU('http://', 'net');

        const net = new modules.Net('http://', 'net');

        const personal = new modules.Personal('http://', 'net');

        expect(you).toBeInstanceOf(YOU);

        expect(net).toBeInstanceOf(Network);

        expect(personal).toBeInstanceOf(Personal);
    });

    it('calls the static givenProvider property and gets the result', () => {
        expect(YOUChain.givenProvider).toEqual(null);
    });
});
