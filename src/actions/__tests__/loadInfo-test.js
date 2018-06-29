import {expect} from 'chai';
import timeInfo from '../timeInfo';
import timekeeper from 'timekeeper';

describe('timeInfo', () => {
  it('loads the current date', () => {
    const now = Date.now();
    timekeeper.freeze(now);

    return timeInfo().then(data => {
      expect(data).to.deep.equal({time: now, message: 'This came from the api server'});
    });
  });
});
