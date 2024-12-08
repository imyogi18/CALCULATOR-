document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    const backspaceButton = document.getElementById('backspace');

    let currentInput = '';

    const updateDisplay = () => {
        display.innerText = currentInput || '0';
    };

    const handleOperation = () => {
        try {
        
            const result = Function('"use strict";return (' + currentInput + ')')();
            currentInput = result.toString();
        } catch {
            currentInput = 'Error';
        }
        updateDisplay();
    };

    const handleButtonClick = (value) => {
        if (value === '=') {
            handleOperation();
            return;
        }

        if (value === 'C') {
            currentInput = '';
            updateDisplay();
            return;
        }

        if (value === '⌫') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
            return;
        }

        if (value === '.' && currentInput.includes('.')) return;

        currentInput += value;
        updateDisplay();
    };

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.dataset.value || e.target.innerText;
            handleButtonClick(value);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (!isNaN(key) || ['/', '*', '-', '+', '.'].includes(key)) {
            if (key === '.' && currentInput.includes('.')) return;
            currentInput += key;
            updateDisplay();
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (key === 'Enter') {
            handleOperation();
        } else if (key === 'Escape') {
            currentInput = '';
            updateDisplay();
        }
    });
});
