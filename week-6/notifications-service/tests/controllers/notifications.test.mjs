import { describe, it, mock } from 'node:test';
import notificationsController from '../../controllers/notifications.mjs';
import notificationsModel from '../../models/notifications.mjs';
import assert from 'node:assert/strict';

describe('Notifications Controller', () => {
    it('should save a notification', async () => {
        const req = {
            body: {
                userId: 1,
                type: 'info',
                message: 'Hello, world!',
            },
        };

        // Mock the response object
        const res = {
            send: mock.fn(),
            status: mock.fn(() => res),
        };

        // Mock the saveNotification method from the notificationsModel
        mock.method(notificationsModel, 'saveNotification', () => ({
            acknowledged: true,
            insertedCount: 1,
        }));

        await notificationsController.saveNotification(req, res);

        // Check if the saveNotification method was called with the correct arguments
        assert.strictEqual(res.send.mock.calls.length, 1);
        // Check if the response was sent with the correct message
        assert.strictEqual(res.send.mock.calls[0].arguments[0], 'Notification saved');
    });

    it('should return an error if the notification was not saved', async () => {
        const req = {
            body: {
                userId: 1,
                type: 'info',
                message: 'Hello, world!',
            },
        };

        const res = {
            send: mock.fn(),
            status: mock.fn(() => res),
        };

        mock.method(notificationsModel, 'saveNotification', () => ({
            acknowledged: true,
            insertedCount: 0,
        }));

        await notificationsController.saveNotification(req, res);

        assert.strictEqual(res.status.mock.calls.length, 1);
        assert.strictEqual(res.status.mock.calls[0].arguments[0], 400);
        assert.strictEqual(res.send.mock.calls.length, 1);
        assert.strictEqual(res.send.mock.calls[0].arguments[0], 'Notification not saved');
    });

    it('should return an error if an internal server error occurs', async () => {
        const req = {
            body: {
                userId: 1,
                type: 'info',
                message: 'Hello, world!',
            },
        };

        const res = {
            send: mock.fn(),
            status: mock.fn(() => res),
        };

        mock.method(notificationsModel, 'saveNotification', () => {
            throw new Error('Internal server error');
        });

        await notificationsController.saveNotification(req, res);

        assert.strictEqual(res.status.mock.calls.length, 1);
        assert.strictEqual(res.status.mock.calls[0].arguments[0], 500);
        assert.strictEqual(res.send.mock.calls.length, 1);
        assert.strictEqual(res.send.mock.calls[0].arguments[0], 'Internal server error');
    });

    it('should get notifications', async () => {
        const req = {
            query: {
                userId: 1,
            },
        };

        const res = {
            send: mock.fn(),
            status: mock.fn(() => res),
        };

        mock.method(notificationsModel, 'getNotifications', () => [
            {
                _id: '1',
                type: 'info',
                message: 'Hello, world!',
                seen: false,
            },
        ]);

        await notificationsController.getNotifications(req, res);

        assert.strictEqual(res.send.mock.calls.length, 1);
        assert.deepStrictEqual(res.send.mock.calls[0].arguments[0], [
            {
                _id: '1',
                type: 'info',
                message: 'Hello, world!',
                seen: false,
            },
        ]);
    });

    it('should return an error if an internal server error occurs', async () => {
        const req = {
            query: {
                userId: 1,
            },
        };

        const res = {
            send: mock.fn(),
            status: mock.fn(() => res),
        };

        mock.method(notificationsModel, 'getNotifications', () => {
            throw new Error('Internal server error');
        });

        await notificationsController.getNotifications(req, res);

        assert.strictEqual(res.status.mock.calls.length, 1);
        assert.strictEqual(res.status.mock.calls[0].arguments[0], 500);
        assert.strictEqual(res.send.mock.calls.length, 1);
        assert.strictEqual(res.send.mock.calls[0].arguments[0], 'Internal server error');
    });
});
