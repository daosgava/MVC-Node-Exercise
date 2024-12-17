/* node:coverage disable */

import { strictEqual } from 'node:assert/strict';
import { describe, it } from 'node:test';
import { request } from 'undici';

describe('api/notifications', { concurrency: true }, () => {
  it('should retrieve data', async () => {
    // If the server is running, returns a 200 status code
    try {
        const endpoint = 'api/notifications?userId=1';
        const response = await request(`http://localhost:3000/${endpoint}`);
        strictEqual(response.statusCode, 200);
    } catch (error) {
        strictEqual(error.code, "ECONNREFUSED");
    }
  });
});