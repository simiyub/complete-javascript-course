function tip(bill){
    var rate = bill < 50 ? 0.2 : bill < 200 ? 0.15 : 0.1;
    return (bill * rate);
    }
var bills = [124,48,268];
var tips = [];
var totalBill = []

bills.forEach(function(element){
    var tipped = tip(element);
    tips.push(tipped);
    totalBill.push(tipped+element);
});

    console.log(bills,tips,totalBill);


