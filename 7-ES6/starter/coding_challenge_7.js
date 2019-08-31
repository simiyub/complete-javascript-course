class TownFeature{
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
    
    calculateAge(){
        return new Date().getFullYear() - this.buildYear;
    }
}

class Park extends TownFeature{
    constructor(name, buildYear, numberOfTrees, parkArea){
        super(name, buildYear)
        this.numberOfTrees = numberOfTrees;
        this.parkArea = parkArea;
    }
}
small = new Park('small',1800,40,500)
console.log(small);
console.log(small.calculateAge())

class Street extends TownFeature{
    constructor(name,buildYear, length ){
        super(name,buildYear);
        this.length = length;
    }
    
    sizeClassification(length){
        
    }
}