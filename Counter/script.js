const counterDisplay = document.getElementById('counter-value');
const btnIncrement   = document.getElementById('btn-increment');
const btnDecrement   = document.getElementById('btn-decrement');
const btnReset       = document.getElementById('btn-reset');

let count = 0;

function updateDisplay() {
  counterDisplay.textContent = count;
}

btnIncrement.addEventListener('click', function() {
  count++;
  updateDisplay();
});

btnDecrement.addEventListener('click', function() {
  count--;
  updateDisplay();
});

btnReset.addEventListener('click', function() {
  count = 0;
  updateDisplay();
});