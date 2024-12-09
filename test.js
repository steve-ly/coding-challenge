// Unit tests using Mocha and unit.js
const { calculateValues } = require('./data_calculation');
const test = require('unit.js');

const mockData = [
  { account_category: 'revenue', total_value: 1000 },
  { account_category: 'revenue', total_value: 500 },
  { account_category: 'expense', total_value: 200 },
  { account_category: 'expense', total_value: 300 },
  { account_type: 'sales', value_type: 'debit', total_value: 400 },
  { account_type: 'sales', value_type: 'debit', total_value: 300 }
];

describe('Metrics Calculations', () => {
  it('should correctly calculate revenue', () => {
    const { revenue } = calculateValues(mockData);
    test.value(revenue).is(1500); // 1000 + 500
  });

  it('should correctly calculate expenses', () => {
    const { expenses } = calculateValues(mockData);
    test.value(expenses).is(500); // 200 + 300
  });

  it('should correctly calculate gross profit margin', () => {
    const { grossProfitMargin, revenue } = calculateValues(mockData);
    const expectedGrossProfitMargin = (700 / 1500) * 100; // (400 + 300) / 1500
    test.value(grossProfitMargin).is(expectedGrossProfitMargin); // should be 46.67%
  });

  it('should correctly calculate net profit margin', () => {
    const { netProfitMargin, revenue, expenses } = calculateValues(mockData);
    const expectedNetProfitMargin = ((revenue - expenses) / revenue) * 100; // ((1500 - 500) / 1500)
    test.value(netProfitMargin).is(expectedNetProfitMargin); // should be 66.67%
  });
});
