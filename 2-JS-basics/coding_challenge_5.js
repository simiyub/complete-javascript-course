var johnsTips = {
    bills:[124,48,268,180,42],
    calcTip: function (bill){
    var rate = bill < 50 ? 0.2 : bill <= 200 ? .15 : .1
    return  bill*rate;
    },
    calcTips: function (){
        
    for (var i=0; i<this.bills.length; i++){
        this.tips.push(this.calcTip(this.bills[i]));
        this.totalBill.push(this.tips[i]+this.bills[i]);
    }
    },
    tips: [],
    totalBill:[]

}

johnsTips.calcTips();
console.log(johnsTips);

var marksTips = new Object();
marksTips.bills = [77,375,110,45];
marksTips.tips = []
marksTips.totalBill = []
marksTips.calcTip = function(bill){
    var rate = bill < 100 ? .2 : bill <= 300 ? .1 : .25;
    return bill * rate;
}
marksTips.calcTips = function(){
    marksTips.bills.forEach(function(element){
        var tip = marksTips.calcTip(element);
        marksTips.tips.push(tip);
        marksTips.totalBill.push(element+tip);
    });
}

marksTips.calcTips();
console.log(marksTips);

function averageTip(tips){
    var totalTips = 0;
    for(var i=0; i<tips.length; i++){
        totalTips += tips[i];

    }    
        console.log(totalTips);
}

var marksTips = averageTip(marksTips.tips);
var johnsTips = averageTip(johnsTips.tips);
console.log("%s gave the most tips",marksTips < johnsTips ? 'john' : 'mark')