// Unit tests using Mocha and unit.js
const { calculateValues } = require('./data_calculation');
const test = require('unit.js');

const mockData = [
  { account_category: 'revenue', total_value: 1000 },
  { account_category: 'revenue', total_value: 500 },
  { account_category: 'expense', total_value: 200 },
  { account_category: 'expense', total_value: 300 },
  { account_type: 'sales', value_type: 'debit', total_value: 400 },
  { account_type: 'sales', value_type: 'debit', total_value: 300 },
  { account_category: 'assets', value_type: 'debit', account_type: 'current', total_value: 1000 },
  { account_category: 'assets', value_type: 'credit', account_type: 'current', total_value: 200 },
  { account_category: 'liability', value_type: 'credit', account_type: 'current', total_value: 300 },
  { account_category: 'liability', value_type: 'debit', account_type: 'current', total_value: 100 }
];

describe('Metrics Calculations', () => {
  it('should correctly calculate revenue', () => {
    const { revenue } = calculateValues(mockData);
    const expectedRevenue = 1500; // 1000 + 500
    test.value(revenue).is(expectedRevenue);
    test.value(revenue).isA.number(); // Make sure it's a number
    test.string(revenue.toFixed(0)).is('1500'); // Format as currency without decimals
  });

  it('should correctly calculate expenses', () => {
    const { expenses } = calculateValues(mockData);
    const expectedExpenses = 500; // 200 + 300
    test.value(expenses).is(expectedExpenses);
    test.value(expenses).isA.number();
    test.string(expenses.toFixed(0)).is('500'); // Format as currency without decimals
  });

  it('should correctly calculate gross profit margin', () => {
    const { grossProfitMargin, revenue } = calculateValues(mockData);
    const expectedGrossProfitMargin = (700 / 1500) * 100; // (400 + 300) / 1500
    test.value(grossProfitMargin).isA.number();
    test.string(grossProfitMargin.toFixed(2)).is('46.67'); // Format as percentage with 2 decimal places
  });

  it('should correctly calculate net profit margin', () => {
    const { netProfitMargin, revenue, expenses } = calculateValues(mockData);
    const expectedNetProfitMargin = ((revenue - expenses) / revenue) * 100; // ((1500 - 500) / 1500)
    test.value(netProfitMargin).isA.number();
    test.string(netProfitMargin.toFixed(2)).is('66.67'); // Format as percentage with 2 decimal places
  });

  it('should correctly calculate working capital ratio', () => {
    const { workingCapitalRatio } = calculateValues(mockData);
    const expectedAssets = 1000 - 200; // 1000 debit (assets) - 200 credit (assets)
    const expectedLiabilities = 300 - 100; // 300 credit (liabilities) - 100 debit (liabilities)
    const expectedWorkingCapitalRatio = (expectedAssets / expectedLiabilities) * 100; // (800 / 200) * 100 = 400%
    test.value(workingCapitalRatio).isA.number();
    test.string(workingCapitalRatio.toFixed(2)).is('400.00'); // Format as percentage with 2 decimal places
  });
});
