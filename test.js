//Unit tests using Mocha and unit.js
const { calculateValues } = require('./data_calculation');
const test = require('unit.js');

const mockData = [
  { account_category: 'revenue', total_value: 1000 },
  { account_category: 'revenue', total_value: 500 },
  { account_category: 'expense', total_value: 200 },
  { account_category: 'expense', total_value: 300 },
];

describe('Metrics Calculations', () => {
  it('should correctly calculate revenue', () => {
    const revenue = calculateValues(mockData);
    test.value(revenue).is(1500); // 1000 + 500
  });

  it('should correctly calculate expenses', () => {
    const expenses = calculateValues(mockData);
    test.value(expenses).is(500); // 200 + 300
  });

});