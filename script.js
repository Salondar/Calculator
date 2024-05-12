const buttons = document.querySelector('#buttons');
const screen = document.querySelector('#screen');


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return 'ERROR';
    }
    return a / b;
}

function multiply(a, b) {
    return a * b;
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
let operatorON = false;
let operator;

buttons.addEventListener("click", (event)=> {
    target = event.target;
    
    if (target.id === 'number' && operatorON === false) {
        screen.textContent = leftOperand;
        screen.textContent += target.textContent;
        leftOperand = screen.textContent;
    }
    else if (target.id === 'number' && operatorON === true) {
        screen.textContent = rightOperand;
        screen.textContent += target.textContent;
        rightOperand = screen.textContent;
    }
    else if (target.id === 'operator') {
        operator = target.textContent;
        operatorON = true;
        rightOperand = '';
    }
    else if (target.id === 'clear') {
        leftOperand = '';
        rightOperand = '';
        operatorON = false;
        screen.textContent = 0;
    }
    else if (target.id === 'equals') {
        if (rightOperand === '') {
            leftOperand = operate(Number(leftOperand), operator, Number(leftOperand));
        }
        else {
            leftOperand = operate(Number(leftOperand), operator, Number(rightOperand));
        }
        screen.textContent = leftOperand;
    }
});