let display = document.getElementById('display');

function appendToDisplay(value) {
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else {
    // Evitar operadores consecutivos o punto decimal múltiple en el mismo número
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
      // Reemplazar operador
      display.value = display.value.slice(0, -1) + value;
      return;
    }
    if (value === '.' && display.value.split(/[\+\-\*\/]/).pop().includes('.')) {
      return; // No permitir dos puntos en el mismo número
    }
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '0';
}

function backspace() {
  if (display.value.length === 1 || display.value === 'Error') {
    display.value = '0';
  } else {
    display.value = display.value.slice(0, -1);
  }
}

function calculate() {
  try {
    // Reemplazar × por * si usaste ese símbolo (no aplica aquí, pero por si acaso)
    let expression = display.value
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');

    // Validar que no termine en operador
    if (['+', '-', '*', '/'].includes(expression.slice(-1))) {
      expression = expression.slice(0, -1);
    }

    if (expression === '') {
      display.value = '0';
      return;
    }

    // Evaluar la expresión
    const result = Function('"use strict"; return (' + expression + ')')();

    // Mostrar entero o decimal según sea necesario
    if (Number.isInteger(result)) {
      display.value = String(result);
    } else {
      // Limitar a 10 dígitos para evitar números muy largos
      display.value = parseFloat(result.toFixed(10)).toString();
    }
  } catch (e) {
    display.value = 'Error';
  }
}