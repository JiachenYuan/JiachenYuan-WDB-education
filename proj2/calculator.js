var operand1=0;
var operand2=0;
var operator = "";

function displayResult() {
    let screen = document.getElementsByClassName("result-screen")[0];
    screen.innerHTML = toDisplay; 
}

function numberClicked(event) {
    newNumber = Number.parseInt(event.target.innerHTML);
    operand2 = 10 * operand2 + newNumber;
    toDisplay = operand2.toString(); 
    displayResult();

}

function operatorClicked(event) {
    if (operator != "") {
        executeClicked(null);
    }
    toDisplay = "0";
    displayResult();
    operator = event.target.innerHTML;

    operand1 = operand2;
    operand2 = 0;
}

function clearClicked(event) {
    operand1 = 0;
    operand2 = 0;
    operator = "";
    toDisplay = "0";
    displayResult();
}

function backspaceClicked(event) {
    operand2 = Math.floor(operand2/10);
    toDisplay = operand2.toString();
    displayResult();
}

function executeClicked(event) {
    switch (operator) {
            case "+":
                operand2 = operand1 + operand2;
                break;
            case "-":
                operand2 = operand1 - operand2;
                break;
            case "×":
                operand2 = operand1 * operand2;
                break;
            case "÷":
                operand2 = operand1 / operand2;
                break;
            default:
                break;
        }
    toDisplay = operand2;
    displayResult();
    operator = "";
}

function main() {
    var buttons = document.getElementsByClassName("buttons");
    for (let b of buttons) {
        if (Number.parseInt(b.innerHTML) >= 0 && Number.parseInt(b.innerHTML) <=9) {
            b.addEventListener('click', numberClicked);
        } else if (b.innerHTML === "C") {
            b.addEventListener('click', clearClicked);
        } else if (b.innerHTML === "←") {
            b.addEventListener('click', backspaceClicked);
        } else if (b.innerHTML === "=") {
            b.addEventListener('click', executeClicked);
        } else {
            b.addEventListener('click', operatorClicked);
        }
    }    
}

// Calling the main function to register EventListeners
main();


