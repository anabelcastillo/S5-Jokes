"use strict";
const API_URL_JOKE = "https://icanhazdadjoke.com/"; // URL de la API
const header = {
    headers: {
        Accept: 'application/json'
    }
};
// Seleccionamos los elementos del DOM
const btnNext = document.getElementById("btn-next"); // Botón para obtener el siguiente chiste
const jokeText = document.getElementById("joke-text"); // Texto donde se mostrará el chiste
const scoreBtns = document.getElementById("score-buttons"); // Div donde se mostrarán los botones de puntuación
const reportJokes = [];
const d = new Date();
let text = d.toISOString();
// Función para obtener el chiste y mostrarlo en el DOM
function getJoke() {
    fetch(API_URL_JOKE, header)
        .then(response => response.json())
        .then((data) => {
        jokeText.innerHTML = data.joke; // Muestra el chiste
        scoreBtns.style.display = "block"; // Mostramos los botones de puntuación
    })
        .catch(error => console.log(error));
}
// Función para actualizar la puntuación del chiste
function userScore(score) {
    const currentJoke = reportJokes.find(joke => joke.joke === jokeText.innerHTML);
    if (currentJoke) {
        currentJoke.score = score;
    }
    else {
        reportJokes.push({
            joke: jokeText.innerHTML,
            score: score,
            date: text,
        });
    }
    console.log(reportJokes); // Mostramos el array reportJokes en la consola
}
