// Tampilan awal
calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: null,
};

// mengambil property displayNumber untuk ditampilkan
function updateDisplay() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

// fungsi tombol clear
function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = null;
}

// memasukan angka ke dalam nilai displayNumber
function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

const buttons = document.querySelectorAll(".button");

// mendapatkan nilai seluruh elemen button
for (let button of buttons) {
  button.addEventListener("click", function (event) {
    const target = event.target;

    // CE button
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    inputDigit(target.innerText);
    updateDisplay();
  });
}

function inverseNumber() {
  if (calculator.displayNumber == "0") {
    return;
  }

  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    // mengatur ulang nilai display number agar angka berikutnya dimulai dari 0
    calculator.displayNumber = "0";
  } else {
    alert("Operator Sudah ADA");
  }
}
// history
function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    alert("Anda belum menetapkan operator");
  }

  let result = 0;

  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
  }

  const history = {
    firstNumber : calculator.firstNumber,
    secondNumber : calculator.displayNumber,
    operator : calculator.operator,
    result : result
  }
  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}



