let displayValue = document.querySelector(".displaytext");

let numButtons = document.querySelectorAll('.number');

let numDotButtonCount = 0;

let equalsButtonCount = 0;

for (i of numButtons) {
  i.addEventListener('click', function(e) {
        if (displayValue.textContent === "0" || numDotButtonCount === 0) {
            displayValue.textContent = e.target.textContent;
            numDotButtonCount++;
            equalsButtonCount = 0;
        } else {    
        displayValue.textContent += e.target.textContent;
        };
  });
};

let dot = document.querySelector("#dot");

dot.addEventListener('click', function(e) {
    if (numDotButtonCount === 0) {
        displayValue.textContent = "0.";
        numDotButtonCount++;
        equalsButtonCount = 0;
    } else {
        if (!displayValue.textContent.includes(".")) {
            displayValue.textContent += e.target.textContent;
        };
    };
});

let opButtons = document.querySelectorAll('.operator');

for (i of opButtons) {
  i.addEventListener('click', function(e) {
    if (!firstNum) {
        firstNum = displayValue.textContent;
        changeOperator(e);
        numDotButtonCount = 0;  
    } else if (!!firstNum && numDotButtonCount !== 0) {
        if (+displayValue.textContent === 0 && operatorChoice === "/") {
            alert("Silly human please don't divide by 0");
            displayValue.textContent = "0";
            numDotButtonCount = 0;
        } else {
            secondNum = displayValue.textContent;
            displayValue.textContent = operate(firstNum, operatorChoice, secondNum);
            firstNum = displayValue.textContent;
            changeOperator(e);
            secondNum = "";
            numDotButtonCount = 0;
        };
    } else if (!!firstNum && numDotButtonCount === 0) {
        changeOperator(e);
    };
  });
};

let equals = document.querySelector("#equals");

equals.addEventListener('click', function() {
    if (!!firstNum && !!operatorChoice && !!displayValue.textContent) {
        if (+displayValue.textContent === 0 && operatorChoice === "/") {
            alert("Silly human please don't divide by 0");
            displayValue.textContent = "0";
            numDotButtonCount = 0;
        } else if (equalsButtonCount === 0) {
            secondNum = displayValue.textContent;
            displayValue.textContent = operate(firstNum, operatorChoice, secondNum);
            firstNum = displayValue.textContent;
            numDotButtonCount = 0;
            equalsButtonCount++;
        } else if (equalsButtonCount !== 0) {
            displayValue.textContent = operate(firstNum, operatorChoice, secondNum);
            firstNum = displayValue.textContent;
        };
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
    deSelectOperator();
    secondNum = "";
    numDotButtonCount = 0;
    equalsButtonCount = 0;
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

function changeOperator(e) {
    if (!!operatorChoice) {
        document.querySelector(".currentOpChoice").classList.remove("currentOpChoice");
    };
    operatorChoice = e.target.textContent;
    console.log(e.target);
    e.target.classList.add("currentOpChoice");
}

function deSelectOperator() {
    if (!!operatorChoice) {
        document.querySelector(".currentOpChoice").classList.remove("currentOpChoice");
    }
    operatorChoice = "";
}

//keyboard support

// '-' -> '9' -> '-' = -9 (fix this)
