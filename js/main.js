// Lista de palabras para adivinar
let palabras = ["messi", "armani", "dibu", "macallister", "gomez", "paredes", "alvarez", "montiel", "romero", "otamendi", "molina", "tagliafico"];

// Palabra aleatoria seleccionada
let palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];

// Número de intentos restantes
let intentosRestantes = 10;

// Arreglo para almacenar las letras adivinadas
let letrasAdivinadas = [];

// Variable para almacenar el nombre del jugador
let nombreJugador;

// Puntuación del jugador
let puntuacion = 0;

// Variable para contar las letras adivinadas consecutivamente
let letrasAdivinadasConsecutivas = 0;

// Array para almacenar las letras que podrían estar incluidas en la siguiente letra a adivinar
let letrasSugeridas = [];

// Variable para almacenar el índice de la próxima letra a adivinar
let indiceLetraAdivinar = 0;

// Función para obtener las letras no adivinadas en orden aleatorio
function obtenerLetrasNoAdivinadas() {
  let letrasNoAdivinadas = palabraSeleccionada.split('').filter(letra => !letrasAdivinadas.includes(letra));
  shuffleArray(letrasNoAdivinadas);
  return letrasNoAdivinadas;
}

// Función para mezclar un array en orden aleatorio (Fisher-Yates Shuffle)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Función para iniciar el juego
function iniciarJuego() {
  nombreJugador = prompt("Ingresa tu nombre:");
  alert("¡Bienvenido al juego del Ahorcadito, " + nombreJugador + "! Apreta en el botón JUGAR para adivinar la palabra.");
  mostrarPalabraAdivinada();

  // Agregar evento de click al botón de iniciar
  let startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", function() {
    adivinarLetra();
  });
}

// Función para mostrar la palabra adivinada con las letras adivinadas correctamente
function mostrarPalabraAdivinada() {
  let letrasNoAdivinadas = obtenerLetrasNoAdivinadas();
  let letrasMostradas = [];

  let palabraMostrada = palabraSeleccionada
    .split('')
    .map((letra, index) => {
      if (letrasAdivinadas.includes(letra) && !letrasMostradas.includes(letra)) {
        letrasMostradas.push(letra);
        return letra;
      }
      return index < indiceLetraAdivinar ? letra : '_';
    })
    .join(' ');

  alert(palabraMostrada);

  if (letrasAdivinadasConsecutivas >= 2) {
    alert("Letras sugeridas para la siguiente letra: " + letrasSugeridas.join(", "));
  }

  alert("Letras adivinadas anteriormente: " + letrasAdivinadas.join(", "));
  alert("Letras no adivinadas: " + letrasNoAdivinadas.join(", "));
  alert("Puntuación actual: " + puntuacion);
}


// Función para adivinar una letra
function adivinarLetra() {
  let letra = prompt(nombreJugador + ", escribí una letra:");
  if (letra === null || letra === "") {
    alert("Tenes que escribir una letra.");
    return;
  }

  letra = letra.toLowerCase();

  if (palabraSeleccionada[indiceLetraAdivinar] === letra) {
    // La letra adivinada es la correcta y en el orden correspondiente
    letrasAdivinadasConsecutivas++;
    letrasAdivinadas.push(letra);
    letrasAdivinadasConsecutivas >= 2 ? generarLetrasSugeridas() : letrasSugeridas = [];
    puntuacion += 10; // Incrementar la puntuación si la letra es correcta
    indiceLetraAdivinar++;

    if (indiceLetraAdivinar === palabraSeleccionada.length) {
      // Todas las letras se adivinaron correctamente
      alert("¡Felicitaciones, " + nombreJugador + "! ¡Adivinaste la palabra!");
      reiniciarJuego();
    } else {
      alert("¡Adivinaste una letra!");
      mostrarPalabraAdivinada();
      adivinarLetra(); // Se sigue adivinando la siguiente letra
    }
  } else {
    // La letra adivinada es incorrecta o no está en el orden correspondiente
    letrasAdivinadasConsecutivas = 0;
    letrasSugeridas = [];
    intentosRestantes--;
    puntuacion -= 5; // Reducir la puntuación si la letra es incorrecta
    alert("La letra no está en la palabra o no es la siguiente en el orden. Intentos restantes: " + intentosRestantes);
    if (intentosRestantes === 0) {
      alert("¡Perdiste, " + nombreJugador + "! La palabra era: " + palabraSeleccionada);
      reiniciarJuego();
    } else {
      mostrarPalabraAdivinada();
      adivinarLetra(); // Se sigue adivinando la siguiente letra
    }
  }
}

// Función para generar letras sugeridas para la siguiente letra a adivinar
function generarLetrasSugeridas() {
  let letrasNoAdivinadas = obtenerLetrasNoAdivinadas();
  let letrasRestantes = letrasNoAdivinadas.length;

  // Si quedan menos de 5 letras no adivinadas, mostrarlas todas como sugerencia
  if (letrasRestantes <= 5) {
    letrasSugeridas = letrasNoAdivinadas;
  } else {
    // Si quedan más de 5 letras no adivinadas, seleccionar aleatoriamente 5 como sugerencia
    while (letrasSugeridas.length < 5) {
      let letraSugerida = letrasNoAdivinadas[Math.floor(Math.random() * letrasRestantes)];
      if (!letrasSugeridas.includes(letraSugerida)) {
        letrasSugeridas.push(letraSugerida);
      }
    }
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  if (confirm(nombreJugador + ", ¿queres jugar de nuevo?")) {
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    intentosRestantes = 10;
    letrasAdivinadas = [];
    puntuacion = 0;
    letrasAdivinadasConsecutivas = 0;
    letrasSugeridas = [];
    indiceLetraAdivinar = 0;
    iniciarJuego();
  } else {
    alert("Gracias por jugar, " + nombreJugador + ". ¡Nos vemos!");
  }
}

// Función para verificar si se ha adivinado la palabra completa
function palabraAdivinadaCompleta() {
  return indiceLetraAdivinar === palabraSeleccionada.length;
}

// Iniciar el juego al cargar la página
window.onload = function() {
  iniciarJuego();
};
