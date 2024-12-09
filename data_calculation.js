
function calculateValues() {
    //parse data
    const json_object = require('./data.json');
    const req_data = json_object["data"]
    //initialize values
    let total_revenue = 0
    let total_expenses = 0
    let gross_profit = 0
    let net_profit = 0
    let working_capital_assets = 0
    let working_capital_liabilities = 0

    //loop through data object
    req_data.forEach(item => {
        //add to revenue 
        if (item.account_category === "revenue") {
            total_revenue = total_revenue + item.total_value
        }
        //add to expenses
        if (item.account_category === "expense") {
            total_revenue = total_revenue + item.total_value
        } 
        //add to gross profits
        if (item.account_category === "sales" && item.value_type === "debit") {
            total_revenue = total_revenue + item.total_value
        } 
        //add or subtract from assests
        if (item.account_category === "assets" && (item.account_type === "current" || item.account_type === "bank" || item.account_type === "current_accounts_receivable")) {
            if (item.value_type === "debit") {
                working_capital_assets = working_capital_assets + item.total_value
            }
            if (item.value_type === "credit") {
                working_capital_assets = working_capital_assets - item.total_value
            }
        }
        //add or subtract from liabilities 
        if (item.account_category === "liability" && (item.account_type === "current" || item.account_type === "current_accounts_receivable")) {
            if (item.value_type === "credit") {
                working_capital_assets = working_capital_assets + item.total_value
            }
            if (item.value_type === "debit") {
                working_capital_assets = working_capital_assets - item.total_value
            }
        }


    }); 

    //final modifications to gross_profit
    gross_profit = gross_profit / total_revenue
    //net profit calculation
    net_profit = (total_revenue - total_expenses) / total_revenue
}

calculateValues()

module.exports = {calculateValues}