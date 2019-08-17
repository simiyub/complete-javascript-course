/**
*Variables and data types
*/
var firstName   = 'Bramwell'; //string
var lastName    = 'Simiyu'; //string
var age         = 18; //number
var adult       = (age >= 18); //boolean
var job; //undefined
console.log('hello ' + firstName + ' ' + lastName + ' ' + adult);

/*
*Variable mutation and type coercion
*/

var name    = 'John';
var age     = 28;
var job, married;
job = 'Teacher';
married = true;

age = prompt('How old are you?');
if (age > 18) {
    alert(name + ' is a ' + job + ' aged ' + age);
}


/**
* Basic operators|Operator precedence|If Else|Truthy, Falsy
*/

/**
Simple Interest calculator. 
*/
var amountRequired  =   prompt('How Much Do you need?');
var repaymentPeriodRequested      = prompt('Over how many years can you afford to repay?');
var repaymentPeriod;
var interestRate;
if (!isNaN(repaymentPeriodRequested)) {
    repaymentPeriod = repaymentPeriodRequested;
}

if (isNaN(amountRequired)) {
    amountRequired  =   prompt('You provided an invalid amount:' + amountRequired + '. How much do you require? (e.g. 100000, 245000)');
}

if (isNaN(amountRequired)) {
    throw new Error('You did not provide a valid amount to borrow. Program will exit');
}
else{
    if (10000 < amountRequired < 100000) {
        interestRate = 0.05;
        if (!repaymentPeriod) {
            repaymentPeriod = 10;
        }
    }

    else if (100001 < amountRequired < 250000) {
        interestRate=0.04;
        if(!repaymentPeriod) {
            repaymentPeriod = 20
        }        
    }
    else if (250001 < amountRequired < 500000) {
        interestRate = 0.03
        if (!repaymentPeriod) {
            repaymentPeriod = 30
        }        
    }
    else if (500001 < amountRequired < 1000000) {
        interestRate = 0.02
        if (!repaymentPeriod) {
            repaymentPeriod = 40
        }        
    }
    else{
        throw new Error('Sorry we cannot lend you '+amountRequired)        
    }
    //Wrong
    yearlyRepaymentAmount   = amountRequired/repaymentPeriod
    monthlyRepaymentAmount  = yearlyRepaymentAmount/12
    yearlyInterest          = yearlyRepaymentAmount * interestRate
    totalInterest           = yearlyInterest * repaymentPeriod
    monthlyInterest         = yearlyInterest/12
    
    //repaymentAmount = (amountRequired+(amountRequired*interest))/repaymentPeriod;
    alert('Interest for you to borrow £'+ amountRequired + ' over '+repaymentPeriod +'years is: '+interestRate*100+'%. \n'
          + 'So you will pay £'+ monthlyRepaymentAmount+monthlyInterest +' per month.')
    
}