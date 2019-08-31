//let and const
//
//ES5
var name5   = 'Jane Smith';
var age5    = 23;
name5       = 'Jane Miller';
console.log(name5);

//ES6
const name6 = 'Jane Smith';
let age     = 25;

//name6       = 'Jane Miller';

function driversLicence5(passedTest){
    var yearOfBirth, firstName;
    if (passedTest){
        firstName = 'John';
        yearOfBirth = 1990;
    }
    
        
        console.log(firstName + ' born in ' + yearOfBirth + 'is now officially allowed to drive a car.')
    
}

driversLicence5(true);


function driversLicence6(passedTest){
    if (passedTest){
        const firstName = 'John';
        let yearOfBirth = 1990;
    }
        
      //won't work unless first name and yearOfBirht are taken out of the block.
    //console.log(firstName + ' born in ' + yearOfBirth + 'is now officially allowed to drive a car.')    
}

driversLicence6(true);


{
    const a = 1;
    let b = 2;
}

      //won't work unless a and b are taken out of the block.
//console.log( a + b );

//ES5
(function(){
    var c = 3;
})();

    let firstName = 'John';
    let lastName = 'Mwala';
    const yearOfBirth = 1990;
    
    function calculateAge(){
    return new Date().getFullYear() - yearOfBirth;
}
    console.log(firstName + ' ' + lastName + ' is ' + calculateAge() + ' years old.');

//ES6
console.log(`${firstName} ${lastName} is ${calculateAge()} years old.`);

const n = `${firstName} ${lastName}`;
//new methods startsWith.
console.log(n.startsWith('p'));
console.log(n.startsWith('j'));//lower case.
console.log(n.endsWith('a'));
console.log(n.includes('w'));
console.log('sing'.repeat(3));

/*
* Arrow functions
*/

//ES5
const years = [2012, 2013, 2014,2015,2016,2017,2018,2019]
var ages5 = years.map(function
                     (el){
    return new Date().getFullYear()-el;
})
console.log( ages5 );

let ages6 = years.map(el => new Date().getFullYear()-el);
console.log(ages6);

//more parameters
//ages6 = years.map((el, index)) => {
//    
//}


var box5 = {
    colour:'green',
    position: 1,
    clickMe: function(){
        var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box number' + self.position + 'and it is' + self.colour;
            alert(str);
        });
    }
}

//box5.clickMe();

//wrks as expected.
var box6 = {
    colour:'green',
    position: 1,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click', () =>{
            var str = 'This is box number' + this.position + 'and it is' + this.colour;
            alert(str);
        });
    }
}

box6.clickMe();

//this doesn't work as expected.
var box6_1 = {
    colour:'green',
    position: 1,
    clickMe: () =>{
        document.querySelector('.green').addEventListener('click', () =>{
            var str = 'This is box number' + this.position + 'and it is' + this.colour;
            alert(str);
        });
    }
}

function Person(name){
    this.name = name;
}

Person.prototype.myFriends5 = function(friends){
    var arr = friends.map(function(el){
        return this.name + ' is friends with ' +el;
    });
    console.log(arr);
}
//This doesn't work as this is bound to Person
var friends = ['j','k','l']
new Person('James').myFriends5(friends);


Person.prototype.myFriends5b = function(friends){
    var arr = friends.map(function(el){
        return this.name + ' is friends with ' +el;
    }.bind(this));
    console.log(arr);
}


//This works because bind is bound to the function.
var friends = ['a','b','c']
new Person('James Bind ').myFriends5b(friends);

//ES6
Person.prototype.myFriends6 = function(friends) {
    var arr = friends.map((el)=> `${this.name} is friends with ${el}`);
    console.log(arr);
}

var friends = ['m','n','o']
new Person('Joe').myFriends6(friends);


/*
* Destructuring
*/

//ES6
const [name,aged] = ['John',26];
console.log(name,aged);


const obj = {
    first: 'james',second : 'smith'
};

//works by using the property name
const {first, second} = obj;
console.log(first,second);

//works by assigning name to a different attribute.
const {first:fst, second:snd} = obj;
console.log(fst,snd);


/*
*Arrays
*/
const boxes = document.querySelectorAll(".box");

//ES5 - works
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function (cur){
    cur.style.backgroundColor = 'dodgerblue'; 
})

//ES6 works
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach ( cur => cur.style.backgroundColor = 'dodgerblue');

//Even shorter code
Array.from(boxes).forEach ( cur => cur.style.backgroundColor = 'dodgerblue');

//If we need to continue or break

//ES5
for (var i = 0 ; i < boxesArr5.length ; i ++){
    if (boxesArr5[i].className === 'box blue'){
        continue;
    }
    boxesArr5[i].textContent = 'I changed to blue';
}

//ES6 New loop for of

for (const cur of boxesArr6){
    if(cur.className.includes('blue')){
        continue;
    }
    cur.textContent = 'I Changed to blue';
}

//ES 5 
var ages = [1,2,3,4,5,55];
var full = ages.map(function(cur){
    return cur >= 18;
});

console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur => cur >= 18));

console.log(ages.find(cur => cur >= 18));

//spread operator
function addAges(a,b,c,d,e){
    return a+b+c+d+e;
}

console.log(addAges(1,2,3,4,5));

var ages = [5,6,7,8,9];
var sum2 = addAges.apply(null,ages);
console.log(sum2);

//ES6
let ages2 = [1,2,3,4,5];
console.log(addAges(...ages));
console.log(addAges(...ages));

let fam1 = ['elise','aude','bram']
let fam2 = ['chloe', 'sonia', 'jason']
console.log([...fam1,'pappy','mamine', ...fam2]);

const h = document.querySelector('h1');
const boxs = document.querySelectorAll('.box');
const all = [h, ...boxs];
Array.from(all).forEach(cur => cur.style.color = 'yellow');

//ES5
function isFullAge(){
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);
    
    argsArr.forEach(function(cur){
        console.log((2019 - cur) >= 18)
    });
    
}

isFullAge(1995,1992,2018);

//ES6
function isFullAge6(...years){
    years.forEach(cur => console.log((2019 - cur) >= 18));
}

isFullAge6(1995,1992,2018)


//ES5
function isFullAge5a(limit){
    console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments,1);
    console.log(argsArr);
    argsArr.forEach(function(cur){
        console.log((2019 - cur) >= limit)
    });
    
}

isFullAge5a(1995,1992,2018);

////ES6
function isFullAge6a(limit,...years){
    years.forEach(cur => console.log((2019 - cur) >= limit));
}

isFullAge6a(1995,1992,2018)



/*
*DEfault parameters
*/
//ES5
function SmithPerson5(firstName, yearOfBirth, lastName, nationality){
    lastName === undefined ? this.lastName = 'Smith' : this.lastName = lastName;
    this.firstName      = firstName;
    this.yearOfBirth    = yearOfBirth;
    this.lastName       = lastName;
    this.nationality       = nationality;
}

var john = new SmithPerson5('John',1990);
console.log(john);

function SmithPerson6(firstName, yearOfBirth, lastName='Smith', nationality='British'){
    this.firstName      = firstName;
    this.yearOfBirth    = yearOfBirth;
    this.lastName       = lastName;
    this.nationality = nationality;
}

var james = new SmithPerson6('James',1998);
console.log(james);


/*
*Maps
*/

const question = new Map();
question.set('question','what is current version of JavaScript?');
question.set(1, 'ES5');
question.set(2,'ES6');
question.set(3,'ES2015');
question.set(4,'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer:D');
question.set(false,'Wrong, please try again!');

function language(){
    
}
console.log(question.get('question'));
console.log(question.size);
question.delete(4);
console.log(question);
//question.delete(4);
//console.log(question);
//question.clear();
//console.log(question);

question.forEach((value,key) => console.log(key,value));

for(let [key,value] of question.entries()){
    if(typeof(key) === 'number'){
        console.log(`answer'${key}:${value}`);
    }
}


/*
*Classes
*/

var Person5 = function(name,yearOfBirth,job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

class Person6{
    constructor(name, yearOfBirth,job){
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        
    }
    calculateAge(){
        let age = new Date().getFullYear - this.yearOfBirth;
        console.log(age);
        
        
    }
    
    static greeting(){
        console.log('Hi');
    }
}
const jake = new Person6()


var Person5 = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    
}

Person5.prototype.calculateAge = function(){
    console.log(new Date().getFullYear() - this.yearOfBirth);
}

var Athlete5 = function(name, yearOfBirth, job, olympicGames, medals){
    Person5.call(this,name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function(){
    this.medals++;
    console.log(this.medals);
}

var johnAthlete5 = new Athlete5('john',1990,'swimmer',3,10);

johnAthlete5.calculateAge();
johnAthlete5.wonMedal();

class Athlete6 extends Person5{
    constructor(name, yearOfBirth, job, olympicGames, medals){
        super(name, yearOfBirth, job);
        this.olympicGames = olympicGames;
        this.medals = medals;
    }
    
    wonMedals(){
        this.medals ++;
        console.log(this.medals);
    }
}

johnAthlete6 = new Athlete6('john',1920,'diver',3,2);
johnAthlete6.wonMedals();
johnAthlete6.calculateAge();
