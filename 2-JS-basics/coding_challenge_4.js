var person1 = {
    name : prompt('what is your name?'),
    mass : prompt('what is your weight?'),
    height : prompt('how tall are you?'),
    calcBMI : function(){
        this.BMI = this.mass/this.height**2;
}
}

var person2 = new Object();
person2.name = prompt('what is the name of the second person?');
person2.mass = prompt('what is the weight of the second person?');
person2.height = prompt('how tall is the second person?');
person2.BMI = person2.mass/person2.height**2;

person1.calcBMI();
console.log(person1,person2);