let displayValue = document.querySelector(".displaytext");

let numButtons = document.querySelectorAll('.number');

let numDotButtonCount = 0;

for (i of numButtons) {
  i.addEventListener('click', function(e) {
    if (!operatorChoice) {
        if (displayValue.textContent === "0") {
            displayValue.textContent = e.target.textContent;
        } else {    
        displayValue.textContent += e.target.textContent;
        };
    } else if (!secondNum) {
        if (numDotButtonCount === 0) {
            displayValue.textContent = e.target.textContent;
            numDotButtonCount++;
        } else {
            displayValue.textContent += e.target.textContent;
        }
        // first numbutton or dot press replaces displayValue.textConter, unless dot, then "0."
        // subsequent numbutton presses behave like normal
    };
  });
};

let dot = document.querySelector("#dot");

dot.addEventListener('click', function(e) {
    if (!operatorChoice) {
        if (!displayValue.textContent.includes(".")) {
        displayValue.textContent += e.target.textContent;
        };
    } else if (!secondNum) {
        if (numDotButtonCount === 0) {
            displayValue.textContent = "0.";
            numDotButtonCount++;
        } else {
            if (!displayValue.textContent.includes(".")) {
                displayValue.textContent += e.target.textContent;
            };
        };
    };
});

let opButtons = document.querySelectorAll('.operator');

for (i of opButtons) {
  i.addEventListener('click', function(e) {
    if (!!displayValue.textContent && !firstNum) {
        firstNum = displayValue.textContent;
        operatorChoice = e.target.textContent;
        numDotButtonCount = 0;  
    } else if (!!displayValue.textContent && !!firstNum) {
        if (+displayValue.textContent === 0 && operatorChoice === "/") {
            alert("Silly human please don't divide by 0");
            displayValue.textContent = "0";
            numDotButtonCount = 0;
        } else {
            secondNum = displayValue.textContent;
            displayValue.textContent = operate(firstNum, operatorChoice, secondNum);
            firstNum = displayValue.textContent;
            operatorChoice = e.target.textContent;
            secondNum = "";
            numDotButtonCount = 0;
        };
    };
  });
};
//if displayValue is negative, pressing any operator or equals changes display
//value to 0

let equals = document.querySelector("#equals");

equals.addEventListener('click', function() {
    if (!!firstNum && !!operatorChoice && !!displayValue.textContent) {
        if (+displayValue.textContent === 0 && operatorChoice === "/") {
            alert("Silly human please don't divide by 0");
            displayValue.textContent = "0";
            numDotButtonCount = 0;
        } else {
            secondNum = displayValue.textContent;
            displayValue.textContent = operate(firstNum, operatorChoice, secondNum);
            firstNum = displayValue.textContent;
            secondNum = "";
            numDotButtonCount = 0;
        };
        // need to be able to keep hitting = button to add the entered 
        // secondNum to the displayed firstNum, similar problem with operator
        // buttons
    };
});

let backspace = document.querySelector("#delete");

backspace.addEventListener('click', function() {
    if (displayValue.textContent !== "0" && numDotButtonCount !== 0) {
        let newDisplayValue = displayValue.textContent.substring(0, displayValue.textContent.length-1);
        if (newDisplayValue === "") {
            newDisplayValue = "0";
        };
        displayValue.textContent = newDisplayValue;
    };
});

let clear = document.querySelector("#clear");

clear.addEventListener('click', function() {
    displayValue.textContent = "0";
    firstNum = "";
    operatorChoice = "";
    secondNum = "";
});

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

let firstNum 
let operatorChoice
let secondNum

function operate(first, operator, second) {
    switch (operator) {
        case "+":
            return add(Number(first), Number(second));
            break;
        case "-":
            return subtract(Number(first), Number(second));
            break;
        case "*":
            return multiply(Number(first), Number(second));
            break;
        case "/":
            return divide(Number(first), Number(second));
            break;
    };
};

//would like current operatorChoice to be highlighted