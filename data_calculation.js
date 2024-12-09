
function calculateValues() {
    //parse data
    const json_object = require('./data.json');
    const req_data = json_object["data"]
    //initialize values
    let total_revenue = 0
    let total_expenses = 0
    let gross_profit = 0
    let net_profit = 0
    let working_capital = 0

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
    }); 

    //final modifications to gross_profit
}

calculateValues()

module.exports = {calculateValues}