import filterResults from '../mainViewCounters.js';
import itResult from '../itunes-result.js';

describe('Test for ebooks counting', () => {
  test('Array with data and option matches', () => {
    expect(filterResults(itResult.results, '9031').length).toBe(17);
  });

  test('Array with data and option no matches', () => {
    expect(filterResults(itResult.results, '99999999').length).toBe(0);
  });

  test('Array void and real option', () => {
    expect(filterResults([], '9031').length).toBe(0);
  });

  test('Both void parameters', () => {
    expect(filterResults([], '').length).toBe(0);
  });
});
