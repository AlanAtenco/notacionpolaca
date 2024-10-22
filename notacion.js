// Función para verificar si es un operador
const esOperador = caracter => ['+', '-', '*', '/'].includes(caracter);

// Función para validar la expresión
const validarExpresion = expresion => {
    // Verificar que solo tenga números, operadores y espacios
    const regex = /^(\d+(\s[-+*/]\s\d+)+)$/; // Permite más operadores con espacios entre números y operadores

    // Validar si contiene letras o si la expresión no cumple con el formato correcto
    if (/[^0-9+\-*/\s]/.test(expresion)) {
        return 'La expresión contiene caracteres no permitidos (solo números y operadores).';
    }
    if (!regex.test(expresion)) {
        return 'La Notación no es válida. Asegúrate de que los operadores y números estén separados por espacios.';
    }
    return ''; // Si pasa todas las validaciones
};

// Función para determinar la prioridad de los operadores
const prioridad = operador => {
    if (operador === '+' || operador === '-') return 1;
    if (operador === '*' || operador === '/') return 2;
    return 0;
};

// Función para convertir una expresión infija a postfija
const infijaAPostfija = expresion => {
    let pila = [];
    let salida = [];
    let tokens = expresion.split(' '); // Dividimos la expresión en tokens

    tokens.forEach(token => {
        if (!isNaN(token)) {
            salida.push(token); // Si es un número, lo agregamos a la salida
        } else if (esOperador(token)) {
            while (pila.length && prioridad(pila[pila.length - 1]) >= prioridad(token)) {
                salida.push(pila.pop());
            }
            pila.push(token); // Empujamos el operador actual a la pila
        }
    });

    // Sacamos todos los operadores restantes de la pila
    while (pila.length) {
        salida.push(pila.pop());
    }

    return salida.join(' ');
};

// Función para convertir notación postfija a infija
const postfijaAInfija = expresion => {
    let pila = [];
    let tokens = expresion.split(' ');

    tokens.forEach(token => {
        if (!esOperador(token)) {
            pila.push(token); // Si no es un operador, lo empujamos a la pila
        } else {
            let operando2 = pila.pop();
            let operando1 = pila.pop();
            let expresionInfija = `(${operando1} ${token} ${operando2})`; // Combinamos los operandos con el operador
            pila.push(expresionInfija);
        }
    });

    return pila.pop(); // El resultado final será la expresión infija
};

// Función para resolver una expresión en notación postfija
const resolverPostfija = expresion => {
    let pila = [];
    let tokens = expresion.split(' ');

    tokens.forEach(token => {
        if (!esOperador(token)) {
            pila.push(parseFloat(token)); // Si no es un operador, lo empujamos a la pila como número
        } else {
            let operando2 = pila.pop();
            let operando1 = pila.pop();
            let resultado;

            switch (token) {
                case '+':
                    resultado = operando1 + operando2;
                    break;
                case '-':
                    resultado = operando1 - operando2;
                    break;
                case '*':
                    resultado = operando1 * operando2;
                    break;
                case '/':
                    resultado = operando1 / operando2;
                    break;
            }

            pila.push(resultado); // Empujamos el resultado de la operación a la pila
        }
    });

    return pila.pop(); // El resultado final es el valor de la expresión
};

// Evento del formulario para convertir la expresión al enviar
document.getElementById('form').addEventListener('submit', e => {
    e.preventDefault();
    const expresion = document.getElementById('expresion').value.trim();

    // Validar la expresión antes de procesarla
    const error = validarExpresion(expresion);
    if (error) {
        alert(error);
        return;
    }

    // Convertir infija a postfija
    const resultadoPostfija = infijaAPostfija(expresion);
    document.getElementById('resultadoPostfija').textContent = resultadoPostfija;

    // Convertir postfija a infija
    const resultadoInfija = postfijaAInfija(resultadoPostfija);
    document.getElementById('resultadoInfija').textContent = resultadoInfija;

    // Resolver expresión en postfija
    const resultadoOperacion = resolverPostfija(resultadoPostfija);
    document.getElementById('resultadoOperacion').textContent = resultadoOperacion;
});
