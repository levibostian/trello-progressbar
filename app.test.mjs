import * as assert from "assert";
import { getTimeUsed, getTimeLeft, setTime } from './app.mjs';

const timeNow = '2023-12-05T12:52:00.000Z'

beforeEach(function () {
  setTime(new Date(timeNow))
});

describe('getTimeUsed', function () {
  it('given today is the start day, return 0 days used', function () {
    let givenStart = '2023-12-05T16:52:00.000Z' // today, but add a few hours
    let givenDueDate = "2023-12-07T19:10:00.000Z" // 2 days from now

    const result = getTimeUsed({
      start: givenStart,
      due: givenDueDate,
    })

    assert.equal(result, '0d used (-8%)');
  });

  it('given 1 day after start, expect return 1 days used', function () {
    let givenStart = "2023-12-04T12:52:00.000Z" // 1 day in past 
    let givenDueDate = "2023-12-07T18:52:00.000Z" // a couple days from now. 

    const result = getTimeUsed({
      start: givenStart,
      due: givenDueDate,
    })

    assert.equal(result, '1d used (31%)');
  });
});

describe('getTimeLeft', function () {

  it('given due date in 2 days, expect return 2 days left', function () {
    let givenStart = timeNow
    let givenDueDate = "2023-12-07T18:52:00.000Z" // 2 days from now    

    const result = getTimeLeft({
      start: givenStart,
      due: givenDueDate,
    })

    assert.equal(result, '2d left');
  });

  it('given due date in less then 1 day, expect return number of hours until due date', function () {
    let givenStart = timeNow
    let givenDueDate = '2023-12-05T16:52:00.000Z'

    const result = getTimeLeft({
      start: givenStart,
      due: givenDueDate,
    })

    assert.equal(result, '4h left');    
  })
})
