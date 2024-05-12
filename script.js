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
        case "*":
            result = multiply(a, b);
            break;
    }
    return result;
}

let leftOperand = '';
let rightOperand = '';
buttons.addEventListener("click", (event)=> {
    target = event.target;
    
    if (target.id === 'number') {
        screen.textContent = leftOperand;
        screen.textContent += target.textContent;
        leftOperand = screen.textContent;
    }
    else if (target.id === 'clear') {
        leftOperand = '';
        screen.textContent = 0;
    }
});