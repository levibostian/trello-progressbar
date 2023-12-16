import * as assert from "assert";
import { getTimeUsed } from './app.mjs';

describe('getTimeUsed', function () {
  it('given today is the start day, return 0 days used', function () {
    const result = getTimeUsed({
      start: new Date(),
      due: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),    
    })

    assert.equal(result, '0d used (0%)');
  });
});
