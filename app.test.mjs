import * as assert from "assert";
import { getTimeUsed, getTimeLeft } from './app.mjs';

describe('getTimeUsed', function () {
  it('given today is the start day, return 0 days used', function () {
    let givenStart = new Date();
    let givenDueDate = getDayInFuture(2)

    const result = getTimeUsed({
      start: givenStart,
      due: givenDueDate,
    })

    assert.ok(result.includes('0d used'));
  });

  it('given 1 day after start, expect return 1 days used', function () {
    let givenStart = getDayInPast(1)
    let givenDueDate = getDayInFuture(2)

    const result = getTimeUsed({
      start: givenStart,
      due: givenDueDate,
    })

    assert.ok(result.includes('1d used'));
  });
});

describe('getTimeLeft', function () {

  it('given due date in 2 days, expect return 2 days left', function () {
    let givenStart = new Date();
    let givenDueDate = getDayInFuture(2)

    const result = getTimeLeft({
      start: givenStart,
      due: givenDueDate,
    })

    assert.ok(result.includes('2d left'));
  });

  it('given due date in less then 1 day, expect return number of hours until due date', function () {
    let givenStart = new Date();
    let givenDueDate = getDayInFuture(0.5)

    const result = getTimeLeft({
      start: givenStart,
      due: givenDueDate,
    })

    assert.ok(result.includes('h left'));
  })
})

function getDayInFuture(days) {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
}

function getDayInPast(days) {
  return new Date(Date.now() - 1000 * 60 * 60 * 24 * days);
}