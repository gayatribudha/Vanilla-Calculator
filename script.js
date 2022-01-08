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
        finalDisplay(infixArray(display.innerText));
        
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


function infixArray(infixExp) {
    console.log('Infix expression: ' + infixExp);
    let numbers = infixExp.split(/[^0-9\.]+/);   //creating new array of only from infixString   

    // removes extra empty value that comes in the array if expression starts and ends with brackets
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] === "" || numbers[i] === undefined) {
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
    

    let result = [];
   

    for (var i = 0, j = 0; i < numbers.length || j < operatorsStack.length; i++, j++) {
        if (i < numbers.length) {
            if (i === 0 && operatorsStack[j] === "(") {
                result.push(operatorsStack[j]);
                operatorsStack.splice(j, 1);

            }
            result.push(numbers[i]);
        }
        if (j < operatorsStack.length) {
            result.push(operatorsStack[j]);
            if (operatorsStack[j + 1] === "(") {
                result.push(operatorsStack[j + 1]);
                operatorsStack.splice(j + 1, 1);
            }

        }
        if (j === operatorsStack.length && operatorsStack[j] === ")") {
            result.push(operatorsStack[j + 1]);
            operatorsStack.splice(j + 1, 1);

        } if (operatorsStack[j] === ")" && operatorsStack[j + 2] === "(") {
            result.push(operatorsStack[j + 1]);
            result.push(operatorsStack[j + 2]);
            operatorsStack.splice(j, 1);
            operatorsStack.splice(j + 1, 1);


        } else if (operatorsStack[j] === ")") {
            result.push(operatorsStack[j + 1]);
            operatorsStack.splice(j + 1, 1);
        }

    }

    for (let i = 0; i < result.length; i++) {
        if (typeof result[i] == 'undefined') {
            console.log('yessss');
            result.pop();
        }
    }
    return infixToPostfix(result);
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


function infixToPostfix(s) {
    let st = []; // create stack for operators
    let result = []; // the output postfix expression

    for (let i = 0; i < s.length; i++) {
        let c = s[i];

        // if the incoming character is operand simply just add to the result 
        if (!isNaN(c)) {
            result.push(c);
        }

        // if the incoming character is opening bracket '(', simply just add to the stack
        else if (c == '(')
            st.push('(');

        // if the incoming character is closing bracket ')' 
        // then pop all the operators from the stack until opening bracket '(' comes
        else if (c == ')') {
            while (st[st.length - 1] != '(') {
                result.push(st[st.length - 1]);
                st.pop();
            }
            st.pop();
        }

        //If an incoming character is an operator
        else {
            // in case of an incoming operator's precedence is lower than the top operator in stack 
            // first pop the top operator to result
            while (st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
                result.push(st[st.length - 1]);
                st.pop();
            }
            // otherwise case just add the operator to the stack ( meaning: if an incoming operator's precendence is higher than the top operator in stack then just simply add the incoming operator to the stack
            st.push(c);
        }
    }

    // after completing analyzing expression if there remains any operators in the stack then add all the elements to the result
    while (st.length != 0) {
        result.push(st[st.length - 1]);
        st.pop();
    }

    return evaluatePostfix(result);
}

function evaluatePostfix(exp) {

    //create a stack
    let stack = [];

    // Scan all characters one by one
    for (let i = 0; i < exp.length; i++) {
        let c = exp[i];
        // If the scanned character is an operand (number here),
        // push it to the stack.
        if (!isNaN(parseInt(c))) {
            stack.push(c);
            //  If the scanned character is an operator, pop two
            // elements from stack apply the operator
        } else {
            let val1 = stack.pop();
            let val2 = stack.pop();

            switch (c) {
                case '+':
                    stack.push(parseInt(val2) + parseInt(val1));
                    break;

                case '-':
                    stack.push(parseInt(val2) - parseInt(val1));
                    break;

                case '/':
                    stack.push(parseInt(val2) / parseInt(val1));
                    break;

                case '*':
                    stack.push(parseInt(val2) * parseInt(val1));
                    break;
            }
        }
    }
    final = stack.pop();
    return final;

}

function finalDisplay(value) {
    display.innerText = value;
}


