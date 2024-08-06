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
        e.target.blur();
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
    e.target.blur();
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
    e.target.blur();
  });
};

let equals = document.querySelector("#equals");

equals.addEventListener('click', function(e) {
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
    e.target.blur();
});

let backspace = document.querySelector("#delete");

backspace.addEventListener('click', function(e) {
    if (displayValue.textContent !== "0" && numDotButtonCount !== 0) {
        let newDisplayValue = displayValue.textContent.substring(0, displayValue.textContent.length-1);
        if (newDisplayValue === "") {
            newDisplayValue = "0";
        };
        displayValue.textContent = newDisplayValue;
    };
    e.target.blur();
});

let clear = document.querySelector("#clear");

clear.addEventListener('click', function(e) {
    displayValue.textContent = "0";
    firstNum = "";
    deSelectOperator();
    secondNum = "";
    numDotButtonCount = 0;
    equalsButtonCount = 0;
    e.target.blur();
});

function add(a, b) {
    ans = a + b;
    return Math.round((ans + Number.EPSILON) *100000)/100000;
};

function subtract(a, b) {
    ans = a - b;
    return Math.round((ans + Number.EPSILON) *100000)/100000;
};

function multiply(a, b) {
    ans = a * b;
    return Math.round((ans + Number.EPSILON) *100000)/100000;
};

function divide(a, b) {
    ans = a / b;
    return Math.round((ans + Number.EPSILON) *100000)/100000;
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
    e.target.classList.add("currentOpChoice");
}

function deSelectOperator() {
    if (!!operatorChoice) {
        document.querySelector(".currentOpChoice").classList.remove("currentOpChoice");
    }
    operatorChoice = "";
}

let allButtons = document.querySelectorAll("button");

addEventListener('keydown', function(e) {
    let key = e.key
    allButtons.forEach(function(ele) {
        if (ele.textContent.includes(key) || ele.classList.contains(`k${key}k`)) {
            ele.click();
        };
    });
});

// would like to figure out how to display numbers too large to fit in display

// would like to make rule to determine if an answer is too large to fit in display, 
// but has decimals, to round to needed decimal to fit display

// would like to make changes so display can round while the 
// actual value of firstNum/secondNum is stored in full