import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import { MockAgent, setGlobalDispatcher } from 'undici';

describe('endpoints', { concurrency: true }, () => {
  let agent;
  beforeEach(() => {
    agent = new MockAgent();
    setGlobalDispatcher(agent);
  });
  it('should retrieve data', async () => {
    const endpoint = 'api/notifications';
    const code = 200;
    const data = {
      key: 'good',
      val: 'item',
    };
    agent
      .get('http://localhost:3000')
      .intercept({
        path: endpoint,
        method: 'GET',
      })
      .reply(code, data);
    
    // console.log('GET', agent);
  });
});