function calculateValues(req_data) {    
    //initialize values
    let total_revenue = 0;
    let total_expenses = 0;
    let gross_profit = 0;
    let net_profit = 0;
    let working_capital_assets = 0;
    let working_capital_liabilities = 0;

    //loop through data object
    req_data.forEach(item => {
        //add to revenue
        if (item.account_category === "revenue") {
            total_revenue += item.total_value;
        }
        //add to expenses
        if (item.account_category === "expense") {
            total_expenses += item.total_value; // fixed to add total_value to expenses
        }
        //add to gross profits
        if (item.account_category === "sales" && item.value_type === "debit") {
            gross_profit += item.total_value;
        }
        //add or subtract from assets
        if (item.account_category === "assets" && 
            (item.account_type === "current" || item.account_type === "bank" || item.account_type === "current_accounts_receivable")) {
            if (item.value_type === "debit") {
                working_capital_assets += item.total_value;
            }
            if (item.value_type === "credit") {
                working_capital_assets -= item.total_value;
            }
        }
        //add or subtract from liabilities
        if (item.account_category === "liability" && 
            (item.account_type === "current" || item.account_type === "current_accounts_receivable")) {
            if (item.value_type === "credit") {
                working_capital_liabilities += item.total_value;
            }
            if (item.value_type === "debit") {
                working_capital_liabilities -= item.total_value;
            }
        }
    });

    //final modifications to gross_profit
    gross_profit = gross_profit / total_revenue;
    //net profit calculation
    net_profit = (total_revenue - total_expenses) / total_revenue;
    //working capital ratio
    let working_capital_ratio = working_capital_assets / working_capital_liabilities;

    return {
        total_revenue,
        total_expenses,
        gross_profit,
        net_profit,
        working_capital_ratio
    };
}

function format_data(data) {
    const { revenue, expenses, grossProfitMargin, netProfitMargin, workingCapitalRatio } = data;

    // Format currency (check if values are valid numbers)
    const formatCurrency = (value) => {
        if (value != null && !isNaN(value)) {
            return `$${value.toLocaleString()}`;
        }
        return '$0'; // Fallback if the value is undefined or NaN
    };
    
    // Format percentages (check if values are valid numbers)
    const formatPercentage = (value) => {
        if (value != null && !isNaN(value)) {
            return `${value.toFixed(0)}%`;
        }
        return '0%'; // Fallback if the value is undefined or NaN
    };

    return `
    Revenue: ${formatCurrency(revenue)}
    Expenses: ${formatCurrency(expenses)}
    Gross Profit Margin: ${formatPercentage(grossProfitMargin)}
    Net Profit Margin: ${formatPercentage(netProfitMargin)}
    Working Capital Ratio: ${formatPercentage(workingCapitalRatio)}
  `;
}

//Usage:
//parse data
const json_object = require('./data.json');
const req_data = json_object["data"];
const { total_revenue, total_expenses, gross_profit, net_profit, working_capital_ratio } = calculateValues(req_data);

// Format the data
const formattedData = format_data({
    revenue: total_revenue,
    expenses: total_expenses,
    grossProfitMargin: gross_profit,
    netProfitMargin: net_profit,
    workingCapitalRatio: working_capital_ratio
});

console.log(formattedData);

module.exports = { calculateValues };
