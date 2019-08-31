/*
********NOTES********

Separate all the modules to achieve separation of concerns. This means we can enhance each module separately without impacting the other modules. So we separate the desired functionality as follows:
1. Add event handler (Controller)
2. Get input values (UI)
3. Add new item to a data structure. (Data)
4. Add new item to the UI.(UI)
5. Calculate the budget.(Data)
6. Display on the UI. (UI)

Controller
----------
*IIFE that returns an object. This will provide privacy as it has it's own scope.
runtime hist budgetController >the anonymous function is called > variables declared > the publicTest in the return is assigned to the budgetController after the return.

Because of Closures, the inner function still has access to the variables and functions of the outer function even after the other function has closed.

The IIFE i.e. the anonymous function has already done the addition and closed.

The publicTest method still has access to the methods in the IIFE.
*********************
*/

var budgetController = (function () {
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calculatePercentage = function(totalIncome){
        if (totalIncome > 0 ){
            this.percentage = Math.round((this.value /totalIncome)*100);
    }
        else{
            this.percentage = -1;
        }
    };
    
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }
    
    var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    };
    
    var data = {
        allItems :{
        exp: [],
        inc: []
    },
        totals:{
            exp : 0,
            inc : 0 
            
        },
        
        budget: 0,
        percentage : -1
               
    };
    
    var calculateTotal = function(type){
      var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        
        data.totals[type] = sum;
    };
    
    return {
        addItem : function(type, desc, val){
            var newItem, itemsData,ID,itemsDataLength;
            itemsData = data.allItems[type];
            itemsDataLength = itemsData[itemsData.length];
            itemsDataLength > 0 ? itemsData[itemsDataLength-1].id +1 : ID = 0;
            if (type === 'inc'){
                newItem = new Income(ID, desc, val);
            }
            else if (type === 'exp'){
                newItem = new Expense(ID, desc, val);
            }
            else{
                console.log('invalid type: ' + type + ' received.' );
            }
            
            data.allItems[type].push(newItem);
            return newItem;
        },
        
        calculateBudget: function(){
            //sum of total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //Calculate budget = income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //Calculate % of income spent
            //we don't want to divide by zero
            if (data.totals.inc >0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);                
            }
            else{
                data.percentage = -1;
            }

            
        },
        
        calculatePercentages : function(){
            data.allItems.exp.forEach(function(cur){
                                      cur.calculatePercentage(data.totals.inc);
                                      }
        );},
        
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                          return cur.getPercentage();        
                                  });
            return allPerc;
        },
        
        getBudgetShell: function(){
            console.log(data);
          return {
              budget    : 0,
              totalInc  : 0,
              totalExp  : 0,
              percentage: -1
          }
        },
        getBudget: function(){
            console.log(data);
            var budgetObj = this.getBudgetShell();
            budgetObj.budget = data.budget;
            budgetObj.totalInc = data.totals.inc;
            budgetObj.totalExp = data.totals.exp;
            budgetObj.percentage = data.percentage;
          return budgetObj;            
            
        },
        
        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current)
                                          {
                                              return current.id;
                                  
                                    });
            index = ids.indexOf(id);
            console.log(index, id, ids);
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
                                          
        },
        
            
        testing: function (){
            console.log(data);
        }
    
    };
    

})();



var UIController = (function(){
    
    //We store the names used in the html file in one place so we only ever have to change here if the html reference name changes.

    var DOMStrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:         '.add__value',
        inputButton:        '.add__btn',
        incomeContainer:    '.income__list',
        expenseContainer:   '.expenses__list',
        budgetLabel:        '.budget__value',
        incomeLabel:        '.budget__income--value',
        expenseLabel:       '.budget__expenses--value',
        percentageLabel:    '.budget__expenses--percentage',
        container:          '.container',
        expensesPercLabel   :'.item__percentage',
        dateLabel           :'.budget__title--month'
        
    }
    
    var formatNumber = function(num, type){          
            //2 decimal places.
            num = Math.abs(num);
            num = num.toFixed(2);
            
            
            //comma seperated thousands.  
            numSplit = num.split('.');
            int = numSplit[0];
            dec = numSplit[1];
            
            if (int.length > 3){
                int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3);
            }
            
            //-or+ before number
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
            
    }
    
    var nodeListForEach = function(list, callback){
        for (var i = 0; i<list.length; i++){
            callback(list[i],i);
        }
    };  
    
    return {
        getInput : function(){
            //best to encapsulate them in an object.
         return {   type : document.querySelector(DOMStrings.inputType).value,//will be either inc or exp
            description : document.querySelector(DOMStrings.inputDescription).value,
            value : parseFloat(document.querySelector(DOMStrings.inputValue).value)
        };
        },
        
        getDOMStrings: function(){
            return DOMStrings;
        },
        
        addListItem: function(obj, type){
            var html, newHtml, element;
            
            //create html string with the placeholder text.            
            if (type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'; 
            }
            else if (type === 'exp'){
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';               
            }
            //replace the placeholder text with actual data.
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type ));
            
            //insert the html into the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
            
            
        },
        
        clearFields: function(){
            var fields,fieldsArray;
            //QuerySelectorAll returns a list which we need to convert to an Array.
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(current, index, array){
                current.value = "";
            });
            fieldsArray[0].focus();
        },
        
        deleteListItems : function(selectorID){
          var elem = document.getElementById(selectorID);
            elem.parentNode.removeChild(elem);
        },
        
        displayBudget: function(obj){
            var type;  
            type = obj.budget > 0 ? type = 'inc' : 'exp';
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            var percentage;
            obj.percentage > 0? percentage = obj.percentage + '%' : percentage = '---';
            
            document.querySelector(DOMStrings.percentageLabel).textContent = percentage;
        },
        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);
            
            nodeListForEach (fields,function(current,index){
                             if(percentages[index] > 0){
                current.textContent = percentages[index] + '%';
            }
            else{
                current.textContent = '---';
            }
            });
        },
        
        displayMonth: function(){
            var now, year, month,monthNames;
            
            monthNames = ["January","February","March","April","May","June", "July", "August", "September", "October", "November", "December"];            
            
            now = new Date();
            year = now.getFullYear();
            month = monthNames[now.getMonth()];
            document.querySelector(DOMStrings.dateLabel).textContent = month + ' ' + year;
        },
        
        changedType: function(){
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue);
        nodeListForEach(fields,function(cur){
           cur.classList.toggle('red-focus'); 
        });
            document.querySelector(DOMStrings.inputButton).classList.toggle('red');
        }
    };})();

var controller = (function(budgetCtrl, UICtrl){
    //We use a different for the two modules passed in so we don't have to refactor if the modules change.    

    var setupEventListeners = function(){
    var DOM = UICtrl.getDOMStrings();        
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
    
    //We want the same result with the mouse click
    document.addEventListener('keypress',function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    }); 
         document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
    };
    
   
    
    var updateBudget = function(){
          //1. calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. Return budget
        var budget = budgetCtrl.getBudget();
        
        //. display the budget to the user inteface
        UICtrl.displayBudget(budget);
        console.log(budget);
        
    }
    
    var updatePercentages = function(){
        //1.Calculate percentages
        budgetCtrl.calculatePercentages();
        
        //2.Read from budget controller
        var percentages = budgetCtrl.getPercentages();
        
        //3.Update UI with new percentages.
        UICtrl.displayPercentages(percentages);
        
        console.log(percentages);
    };
    
    //Extract these actions into a seperate function so we can call it when the mouse is used and when the keyboard is used.
    var ctrlAddItem = function(){
        var input, newItem;
        //1. get input data
        input = UICtrl.getInput();
        
        if (input.description !="" 
            && !isNaN(input.value) 
            && input.value > 0){
        //2. add item to the budget controller        
        newItem = budgetCtrl.addItem(input.type, input.description,  input.value);

        //3. add new item to the user controller        
        UICtrl.addListItem(newItem, input.type);

        //4. clear the fields
        UICtrl.clearFields();
        
        //5. calculate and update budget
            updateBudget();
            
            // 6. Calculate and update percentages
            updatePercentages();            
        }

    };
    
    var ctrlDeleteItem = function(event){
       var itemID,splitID; 
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            //console.log(type,ID);
            
            //delete item from data structure.
            budgetCtrl.deleteItem(type,ID);
            //delete from the UI
            UICtrl.deleteListItems(itemID);
            //update and show the budget
            updateBudget();
            
            //calculate and update percentages
            updatePercentages();
        }
    }
    return {
        init: function(){
            UICtrl.displayMonth();
            UICtrl.displayBudget(budgetCtrl.getBudgetShell());
            setupEventListeners();
        }
    };

})(budgetController,UIController);

controller.init();