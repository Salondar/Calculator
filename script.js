const buttons = document.querySelector('#buttons');
const display = document.querySelector('#display');
const DISPLAY_SIZE = 11;
const MAX_RESULT = 99999999999;
const MIN_RESULT = 0.000000001;

function add(a, b) {
    return ((a + b) > MAX_RESULT ? 'NaN': a + b);
}

function subtract(a, b) {
    result = (a - b) + '';
    if (result.length < DISPLAY_SIZE) {
        return result;
    }
    else {
        return 'NaN';
    }
}

function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    }
    result = (a / b) + '';
    if (result.length < DISPLAY_SIZE) {
        return result;
    }
    else {
        return 'NaN';
    }
}

function multiply(a, b) {
    return ((a * b) > MAX_RESULT ? 'NaN' : a * b);
}

function operate(a, op, b) {
    let result;
    switch(op) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        case "x":
            result = multiply(a, b);
            break;
    }
    return result;
}

let leftOperand = '';
let rightOperand;
let isOperatorON = false;
let operator;

buttons.addEventListener('click', (event) => {
    target = event.target;

    if (target.id === 'number' && isOperatorON === false) {
        display.textContent = leftOperand;
        if (leftOperand.length < DISPLAY_SIZE) {
            leftOperand += target.textContent;
            display.textContent = leftOperand
        }
    }
    else if (target.id === 'number' && isOperatorON === true) {
        display.textContent = rightOperand;
        if (rightOperand.length < DISPLAY_SIZE) {
            rightOperand += target.textContent;
            display.textContent = rightOperand;
        }
    }
    else if (target.id === 'operator') {
        if (isOperatorON === true) {
            if (rightOperand === '') {
                leftOperand = operate(Number(leftOperand), operator, Number(leftOperand));
            }
            else {
                leftOperand = operate(Number(leftOperand), operator, Number(rightOperand));
            }
            display.textContent = leftOperand;
        }
        rightOperand = '';
        operator = target.textContent;
        isOperatorON = true;
    }
    else if (target.id === 'equals') {
        if (rightOperand === '' && isOperatorON === true) {
            leftOperand = operate(Number(leftOperand), operator, Number(leftOperand));
        }
        else {
            leftOperand = operate(Number(leftOperand), operator, Number(rightOperand));
        }
        isOperatorON = false;
        rightOperand = '';
        display.textContent = leftOperand;
    }
    else if (target.id === 'clear') {
        display.textContent = 0;
        leftOperand = '';
        rightOperand = '';
        isOperatorON = false;
    }
    else if (target.id === 'dot') {
        if (display.textContent.includes('.') === false) {
            display.textContent += target.textContent;
            if (isOperatorON === false) {
                leftOperand = display.textContent;
            }
            else if (isOperatorON === true) {
                rightOperand = display.textContent;
            }
        }
    }
    else if (target.id === 'delete') {
        if (display.textContent === '' && isOperatorON === false) {
            display.textContent = 0;
            leftOperand = '';
        }
        else if (display.textContent === ''&& isOperatorON === true) {
            display.textContent = 0;
            rightOperand = '';
        }
        else if  (isOperatorON === false) {
            leftOperand = display.textContent.slice(0, display.textContent.length - 1);
            display.textContent = leftOperand;
        }
        else {
            rightOperand = display.textContent.slice(0, display.textContent.length - 1);
            display.textContent = rightOperand;
        }
    }
});