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
  it('should correctly calculate total revenue', () => {
    const { total_revenue } = calculateValues(mockData);
    test.value(total_revenue).is(1500); // 1000 + 500
  });

  it('should correctly calculate total expenses', () => {
    const { total_expenses } = calculateValues(mockData);
    test.value(total_expenses).is(500); // 200 + 300
  });

  it('should correctly calculate gross profit margin', () => {
    const { gross_profit, total_revenue } = calculateValues(mockData);
    const expectedGrossProfitMargin = (700 / 1500) * 100; // (400 + 300) / 1500
    test.value(gross_profit * 100).is(expectedGrossProfitMargin); // should be 46.67%
  });

  it('should correctly calculate net profit margin', () => {
    const { net_profit, total_revenue, total_expenses } = calculateValues(mockData);
    const expectedNetProfitMargin = ((total_revenue - total_expenses) / total_revenue) * 100; // ((1500 - 500) / 1500)
    test.value(net_profit * 100).is(expectedNetProfitMargin); // should be 66.67%
  });

  it('should correctly calculate working capital ratio', () => {
    const { working_capital_ratio } = calculateValues(mockData);
    const expectedAssets = 1000 - 200; // 1000 debit (assets) - 200 credit (assets)
    const expectedLiabilities = 300 - 100; // 300 credit (liabilities) - 100 debit (liabilities)
    const expectedWorkingCapitalRatio = (expectedAssets / expectedLiabilities); // (800 / 200) = 4 (400% when expressed as percentage)
    
    test.value(working_capital_ratio).is(expectedWorkingCapitalRatio); // should be 4 (or 400% if converted to percentage)
  });
});
