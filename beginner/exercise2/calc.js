const ADD = 'add';
const SUB = 'sub';
const MUL = 'mul';
const DIV = 'div';

let currentAction = '';
let savedArg = '0';
let eResult = document.querySelector(".result-text");

document.querySelector(".container").addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const ch = event.target.innerText;
        btnClicked(ch, eResult);
    }
});

// btnClicked function decides what action needs to be performed
// based on the ch string. After decided action is completed it
// updates text inside eResult element.
function btnClicked(ch, eResult) {
    if (ch >= '0' && ch <= '9') {
        if (eResult.innerText === '0') {
            eResult.innerText = '';
        }
        eResult.innerText += ch;
        return;
    }

    if (ch === 'C') {
        eResult.innerText = '0';
        currentAction = '';
        savedArg = '0';
        return;
    }

    if (ch === '=') {
        a = parseFloat(savedArg);
        b = parseFloat(eResult.innerText);
        res = calculate(a, b)
        eResult.innerText = `${res}`;
        savedArg = '0'
        return
    }

    if (ch === '\u00F7') {
        onActionClicked(DIV);
    }

    if (ch === '\u00D7') {
        onActionClicked(MUL);
    }

    if (ch === '\u002D') {
        onActionClicked(SUB);
    }

    if (ch === '\u002B') {
        onActionClicked(ADD);
    }

    // backspace
    eResult.innerText = eResult.innerText.substring(0, eResult.innerText.length - 1)
    if (eResult.innerText.length === 0) {
        eResult.innerText = '0'
    }
}

function onActionClicked(action) {
    currentAction = action;
    savedArg = eResult.innerText;
    eResult.innerText = '0';
}

function calculate(a, b) {
    switch (currentAction) {
        case ADD:
            return a + b;
        case SUB:
            return a - b;
        case MUL:
            return a * b;
        case DIV:
            if (b === 0) {
                return 'ERR: div by zero';
            }
            return a / b;
    }
}