const button = document.querySelector(".keys");
const display = document.querySelector(".display");

let displayValue = "0";  // initial value in the dislay panel
let numbers = [];        // queue for storing nubers from given expression
let operators = [];      // stack for storing operators from given expression
let digitToNum = "";     // initial value of the number that is produced by concating each digit clicked by the user

button.addEventListener("click", calculate);
function calculate(event) {
    const clickedButtonValue = event.target.innerText;
    console.log(clickedButtonValue);
    if (clickedButtonValue === "=") {
        console.log(display.innerText);
        evaluate(display.innerText);
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

function evaluate() {
    display.innerText(eval('5*2+3'));  // not a good practice
    // here where I'll be writing my own code to evaluate :)
}

function finalDisplay(value) {
    display.innerText = value;
}