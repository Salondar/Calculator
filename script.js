const buttons = document.querySelector('#buttons');
const display = document.querySelector('#display');
const DISPLAY_SIZE = 11;

function formattedResult(number) {
    let temp = number + '';

    if (Number.isInteger(number)) {
        return number;
    }
    else {
        if (temp.length < DISPLAY_SIZE) {
            return number;
        }
        else {
            i = temp.indexOf('.');
            return number.toPrecision(9);
        }
    }
}

function fitsOnDisplay(number) {
    let temp = number + '';
    if (Number.isInteger(number)) {
        if (temp.length < DISPLAY_SIZE) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        const i = temp.indexOf('.');
        if (i < DISPLAY_SIZE - 1) {
            return true;
        }
        else {
            return false;
        }
    }
}

function add(a, b) {
    let result = a + b;
    let fits = fitsOnDisplay(result);

    if (fits === true) {
        result = formattedResult(result);
        return result;
    }
    else {
        return 'NaN';
    }
}

function subtract(a, b) {
    let result = a - b;
    let fits = fitsOnDisplay(result);

    if (fits === true) {
        result = formattedResult(result);
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
    let result = a / b;
    let fits = fitsOnDisplay(result);

    if (fits === true) {
        result = formattedResult(result);
        return result;
    }
    else {
        return 'NaN';
    }
}

function multiply(a, b) {
    let result = a * b;
    let fits = fitsOnDisplay(result);

    if (fits === true) {
        result = formattedResult(result);
        return result;
    }
    else {
        return 'NaN';
    }
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

buttons.addEventListener('mousedown', (event) => {
    target = event.target;

    if (target.id === 'number') {
        target.style.backgroundColor = '#81C784';
           if (isOperatorON === false) {
            display.textContent = leftOperand;
            if (leftOperand.length < DISPLAY_SIZE) {
                leftOperand += target.textContent;
                display.textContent = leftOperand
            }
        }
        else if (isOperatorON === true) {
            display.textContent = rightOperand;
            if (rightOperand.length < DISPLAY_SIZE) {
                rightOperand += target.textContent;
                display.textContent = rightOperand;
            }
        }
    }
    else if (target.id === 'operator') {
        target.style.backgroundColor = '#4682B4';
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
        target.style.backgroundColor = '#2E8B57';
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
        target.style.backgroundColor = '#32612D';
        display.textContent = 0;
        leftOperand = '';
        rightOperand = '';
        isOperatorON = false;
    }
    else if (target.id === 'dot') {
        target.style.backgroundColor = '#81C784';
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
        target.style.backgroundColor = '#81C784';
        if (display.textContent.length === 1 && isOperatorON === false) {
            display.textContent = 0;
            leftOperand = '';
        }
        else if (display.textContent === 1 && isOperatorON === true) {
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

buttons.addEventListener("mouseup", (event) => {
    target = event.target;

    if (target.id === 'number' || 
       target.id === 'delete' || 
       target.id === 'dot' ||
       target.id === 'operator') {
        target.style.backgroundColor = 'white';
    }
    else if (target.id == 'equals') {
        target.style.backgroundColor = 'red';
    }
    else if (target.id === 'clear') {
        target.style.backgroundColor = '#1A2421'
    }
});