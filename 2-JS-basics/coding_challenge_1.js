/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK 😀
*/
var person1Mass, person2Mass, person1Height, person2Height;

person1Mass     = prompt('what is the weight of the first person?');
person1Height   = prompt('what is the height of the first person?');
var bmi1            = person1Mass / (person1Height ** 2);
alert('BMI for the first person is:' + bmi1);
person2Mass     = prompt('what is the weight of the second person?');
person2Height   = prompt('what is the height of the second person?');
var bmi2            = person2Mass/person2Height**2;
alert('BMI for the second person is:' + bmi2);

if(bmi1>bmi2){
alert('person 1 has a higher bmi than person 2.')  ;  
}
else if (bmi2>bmi1){
    alert('person 2 has a higher BMI than person 1');
}
else{
    alert('person 1 and person 2 have the same BMI.')
}

      
                                       