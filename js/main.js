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
  let palabraMostrada = "";
  for (let i = 0; i < palabraSeleccionada.length; i++) {
    let letra = palabraSeleccionada[i];
    if (letrasAdivinadas.includes(letra)) {
      palabraMostrada += letra + " ";
    } else {
      palabraMostrada += "_ ";
    }
  }
  alert(palabraMostrada);
}

// Función para adivinar una letra
function adivinarLetra() {
  let letra = prompt(nombreJugador + ", escribí una letra:");
  if (letra === null || letra === "") {
    alert("Tenes que escribir una letra.");
    return;
  }

  letra = letra.toLowerCase();

  if (letrasAdivinadas.includes(letra)) {
    alert("Ya has adivinado esa letra. Intenta con otra.");
  } else if (palabraSeleccionada.includes(letra)) {
    letrasAdivinadas.push(letra);
    alert("¡Adivinaste una letra!");
    mostrarPalabraAdivinada();
  } else {
    intentosRestantes--;
    alert("La letra no está en la palabra. Intentos restantes: " + intentosRestantes);
    if (intentosRestantes === 0) {
      alert("¡Perdiste, " + nombreJugador + "! La palabra era: " + palabraSeleccionada);
      reiniciarJuego();
    }
  }

  if (!palabraAdivinadaCompleta()) {
    adivinarLetra();
  } else {
    alert("¡Felicitaciones, " + nombreJugador + "! ¡Adivinaste la palabra!");
    reiniciarJuego();
  }
}

// Función para reiniciar el juego
function reiniciarJuego() {
  if (confirm(nombreJugador + ", ¿queres jugar de nuevo?")) {
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    intentosRestantes = 10;
    letrasAdivinadas = [];
    iniciarJuego();
  } else {
    alert("Gracias por jugar, " + nombreJugador + ". ¡Nos vemos!");
  }
}

// Función para verificar si se ha adivinado la palabra completa
function palabraAdivinadaCompleta() {
  for (let i = 0; i < palabraSeleccionada.length; i++) {
    if (!letrasAdivinadas.includes(palabraSeleccionada[i])) {
      return false;
    }
  }
  return true;
}

// Iniciar el juego al cargar la página
window.onload = function() {
  iniciarJuego();
};
