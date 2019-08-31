/*
*Passing functions as an argument and returning function
*/

function dateBeforeAndAfter(beforeOrAfter){
            var today = new Date();
    if(beforeOrAfter === 'before') return function(days){
        console.log(new Date(today.setDate(today.getDate()-days)));
    }
    else if (beforeOrAfter === 'after') return function(days){
        console.log(new Date(today.setDate(today.getDate()+days)));       
    }
}

dateBeforeAndAfter('before')(10);
dateBeforeAndAfter('after')(10);


function dateAfterToday
(days){
    var today = new Date();
return new Date(today.setDate(today.getDate() + days));
}

function dateCalculator(arrayOfDays, fn){
    var arrayResult = [];
    for(var i = 0 ; i<arrayOfDays.length ; i++){
        arrayResult.push(fn(arrayOfDays[i]));
    }
    return arrayResult;
                        
}

var dates = dateCalculator([23,10,5], dateAfterToday
                          );
console.log(dates);




/**
*creating objects
*/
//method and variable to be borrowed
//You can mutate these types with something else
var Plan = function(name, type,from,durationInDays){
    this.name = name;
    this.type = type;
    this.from = from;
    this.durationInDays = durationInDays;
    new Object();
}
 Plan.prototype.setEndDate = function(){
    this.from = new Date();
    this.from.setDate(this.from.getDate()+this.durationInDays);
    return new Date(this.from);
}

var teachingPlan = new Plan('Autumn', 'Teaching');
teachingPlan.to = teachingPlan.setEndDate(8);
console.log(teachingPlan.to);

function newDateFromToday(daysTo){
    var endDate = new Date();
    return new Date(endDate.setDate(Plan.from.getDate()+daysTo));    
}

var dateUtility = {
    whenWillItBe:newDateFromToday
}
var workPlan = Object.create(dateUtility);
workPlan.name = 'Winter';
workPlan.type = 'Builder';
console.log(workPlan);

var dates2 = { dateAfterNow: {value: dateAfterToday}};
var dateCalculatorBeforeAndAfter = Object.create(dates,{ dateBeforeNow : {value:function(days){
    var today = new Date();
    today.setDate(today.getDate() - days);
return new Date(today);
}}                               
                                              });
console.log(dateCalculatorBeforeAndAfter.dateAfterNow, dateCalculatorBeforeAndAfter.dateBeforeNow(10));

//function constructor

var Plan = function(name, type){
    this.name = name;
    this.type = type;
}
/**
* Objects Vs Primitives
**/

var person = function( name,age){
                  this.name = name; this.age = age;      
                        }
var male = new person('george',45)
male.height = male.age;
male.age = 22;
console.log(male);

var school = function(male, female){
    this.male = male;
    this.female = female;
}
var school1 = new school(new person('Peter',50),new person('Patricia',22));
console.log(school,school1);
school1.secondMale = school1.male;
school1.male = new person('Unknown',1);

/*
** IIFE
**/
var parkingEnd;
(function(starting){
    var maxParkingStay = 2;
    if (starting){
        console.log(starting);
        parkingEnd = new Date(starting.setHours(starting.getHours()+maxParkingStay));
        console.log( parkingEnd);
    }
    else{
        from = new Date();
        console.log(from);
        parkingEnd = new Date(from.setHours(from.getHours()+maxParkingStay));
        console.log(parkingEnd);
    }
})(new Date(2019,8,1));

console.log(parkingEnd);

function millisecondsToHours(ms){
    return Math.floor(ms/(1000*60*60));
}

/**
*Closure
**/

function calculateParkingFine(startDate, endDate){

    var startTime = startDate.getHours();
    var monthName = ["January","February","March","April","May","June", "July", "August", "September", "October", "November", "December"];
    
    var timeOfDayRate = function(startTime){
        var fineRate;
            //morning fines    
    if(startTime >=7 && startTime < 12){
        fineRate = 10;
    }
    //afternoon fines
   else if (startTime >= 12 && startTime < 19){
       fineRate = 12;
   }
    //evening fines
    else {
        fineRate = 5;
    }
                        console.log(startTime,fineRate);        
        return fineRate;

    }
    
    
    
var todRate = timeOfDayRate(startDate.getHours());
        
console.log('fine rate @' + startTime +' on ' + startDate.getDate() + ' of ' + monthName[startDate.getMonth()] + ' is ' + todRate);
    
    return function repeatOffenceCharges(numberOfOffences){
        var additionalCharges = 0;
        if(numberOfOffences >= 10){
            additionalCharges = 100;
           }
           else if( 5 <= numberOfOffences < 10 ){
               additionalCharges = 50;
           }
        return (todRate * millisecondsToHours(endDate-startDate)) + additionalCharges;
    }
}

basicFine = calculateParkingFine(new Date(2019,7,23),new Date());
console.log(basicFine(10));

