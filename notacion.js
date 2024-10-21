// Función para verificar si es un operador 
const esOperador = caracter => ['+', '-', '*', '/'].includes(caracter);

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
    let tokens = expresion.match(/\d+|[-+*/()]|\w+/g); // Dividimos la expresión en tokens

    tokens.forEach(token => {
        if (!isNaN(token) || /^[a-zA-Z]+$/.test(token)) {
            salida.push(token); // Si es un número o variable, lo agregamos a la salida
        } else if (token === '(') {
            pila.push(token); // Si es un paréntesis izquierdo, lo empujamos a la pila
        } else if (token === ')') {
            while (pila.length && pila[pila.length - 1] !== '(') {
                salida.push(pila.pop()); // Desempilamos hasta encontrar un paréntesis izquierdo
            }
            pila.pop(); // Quitamos el paréntesis izquierdo
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
    const expresion = document.getElementById('expresion').value;

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
