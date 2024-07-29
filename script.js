let displayValue = document.querySelector(".displaytext")

let numButtons = document.querySelectorAll('.number');

for (i of numButtons) {
  i.addEventListener('click', function(e) {
    displayValue.textContent += e.target.textContent;
  });
}

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

let first 
let operator
let second

function operate(first, operator, second) {
    switch (operator) {
        case "+":
            add(first, second);
            break;
        case "-":
            subtract(first, second);
            break;
        case "*":
            multiply(first, second);
            break;
        case "/":
            divide(first, second);
            break;
    };
};