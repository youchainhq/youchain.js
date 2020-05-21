import LogSubscription from '../../../src/subscriptions/you/LogSubscription';
import SubscriptionsFactory from '../../../src/factories/SubscriptionsFactory';
import NewHeadsSubscription from '../../../src/subscriptions/you/NewHeadsSubscription';
import NewPendingTransactionsSubscription from '../../../src/subscriptions/you/NewPendingTransactionsSubscription';
import SyncingSubscription from '../../../src/subscriptions/you/SyncingSubscription';

// Mocks
jest.mock('');

/**
 * SubscriptionsFactory test
 */
describe('SubscriptionsFactoryTest', () => {
    let subscriptionsFactory;

    beforeEach(() => {
        subscriptionsFactory = new SubscriptionsFactory({}, {});
    });

    it('createLogSubscription returns LogSubscription', () => {
        expect(subscriptionsFactory.createLogSubscription()).toBeInstanceOf(LogSubscription);
    });

    it('createNewHeadsSubscription returns NewHeadsSubscription', () => {
        expect(subscriptionsFactory.createNewHeadsSubscription()).toBeInstanceOf(NewHeadsSubscription);
    });

    it('createNewPendingTransactionsSubscription returns NewPendingTransactionsSubscription', () => {
        expect(subscriptionsFactory.createNewPendingTransactionsSubscription()).toBeInstanceOf(
            NewPendingTransactionsSubscription
        );
    });

    it('createSyncingSubscription returns SyncingSubscription', () => {
        expect(subscriptionsFactory.createSyncingSubscription()).toBeInstanceOf(SyncingSubscription);
    });
});
