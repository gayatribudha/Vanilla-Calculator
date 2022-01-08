const button = document.querySelector(".keys");
const display = document.querySelector(".display");

let displayValue = "0";  // initial value in the dislay panel
let numbers = [];        // queue for storing nubers from given expression
let operators = [];      // stack for storing operators from given expression
let digitToNum = "";     // initial value of the number that is produced by concating each digit clicked by the user


button.addEventListener("click", calculate);
function calculate(event) {
    const clickedButtonValue = event.target.innerText;
    if (clickedButtonValue === "=") {
        infixArray(display.innerText);
    } else if (clickedButtonValue === "C") {
        displayValue = "";
        numbers = [];
        operators = [];
        digitToNum = "";
        finalDisplay(displayValue);
    } else if (clickedButtonValue === "--") {
        displayValue = displayValue.substring(0, displayValue.length - 1);
        finalDisplay(displayValue);
    } else {
        displayValue += clickedButtonValue;
        finalDisplay(displayValue);
    }
}

function prec(operator) {
    if (operator === '+' || operator === '-') {
        return 1;
    } else if (operator === '*' || operator === '/') {
        return 2;
    } else {
        return 0;
    }
}

function infixArray(infixExp) {

    let numbers = infixExp.split(/[^0-9\.]+/);   //creating new array of only from infixString   

    // this a calual
    // removes extra empty value that comes in the array if expression starts and ends with brackets
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === "") {
            numbers.splice(i, 1);
            i--;
        }
    }

    // creates an array of operators and parenthesis 
    let operatorsStack = [];
    let operators = infixExp.replace(/[0-9]+/g, "#");
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] !== "#") {
            operatorsStack.push(operators[i]);
        }
    }
    console.log(numbers);
    console.log(operatorsStack);

    let result = [];
    // creating new result array by adding number from numbers array and operator from operators array alternatively
    for (i = 0; i < numbers.length; i++) {
        result.push(numbers[i]);
        if (i < operatorsStack.length) {
            result.push(operatorsStack[i]);

            // to add bracket ( ) simultaneously 
            if (operatorsStack[i + 1] === "(") {
                result.push(operatorsStack[i + 1]);
                operatorsStack.splice(i + 1, 1);
            } else if (operatorsStack[i] === ")") {
                result.push(operatorsStack[i + 1]);
                operatorsStack.splice(i + 1, 1);
            }
        }
    }
    console.log(result);
    evaluatePostfix(result);
}

function evaluatePostfix(exp) {
    
    let sta = [];
    let output = [];
    console.log(exp);
}


function finalDisplay(value) {
    display.innerText = value;
}


