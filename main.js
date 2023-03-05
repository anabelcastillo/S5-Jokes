"use strict";
const API_URL_CHUCK = "https://api.chucknorris.io/jokes/random"; // URL de la API de Chuck Norris
const API_URL_JOKE = "https://icanhazdadjoke.com/"; // URL de la API de chistes
const header = {
    headers: {
        Accept: 'application/json'
    }
};
// Seleccionamos los elementos del DOM
const btnNext = document.getElementById("btn-next"); // Botón para obtener el siguiente chiste
const jokeText = document.getElementById("joke-text"); // Texto donde se mostrará el chiste
const scoreBtns = document.getElementById("score-buttons"); // Div donde se mostrarán los botones de puntuación
const weatherContainer = document.getElementById("weather-information"); // Div donde se mostrará el tiempo
const showBlob = document.getElementById("imagen");
// Obtener la posición actual del usuario usando la API de geolocalización
navigator.geolocation.getCurrentPosition(position => {
    // Usar las coordenadas de latitud y longitud para construir la URL de la API
    const apiKey = "d0047952dfbeb9ec30622425fe11ed84";
    const API_URL_WEATHER = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    // Obtener los datos meteorológicos de la API y mostrarlo en el DOM
    fetch(API_URL_WEATHER)
        .then(response => response.json())
        .then((data) => {
        weatherContainer.innerHTML = `${data.main.temp}°C`;
    })
        .catch((error) => console.log(error));
});
const reportJokes = [];
const d = new Date();
let text = d.toISOString();
const images = ["images/blob1.svg", "images/blob2.svg", "images/blob3.svg", "images/blob4.svg"];
let currentImageIndex = 0;
// Función para obtener el chiste de la API y mostrarlo en el DOM
function getJoke() {
    const jokeAPISs = [API_URL_JOKE, API_URL_CHUCK];
    const request = fetch(jokeAPISs[Math.floor(Math.random() * jokeAPISs.length)], header);
    request
        .then(response => response.json())
        .then((data) => {
        let joke;
        if (data.joke) {
            joke = data.joke;
        }
        else if (data.value) {
            joke = data.value;
        }
        jokeText.innerHTML = joke; // Muestra el chiste
        scoreBtns.style.display = "block"; // Mostramos los botones de puntuación
        showBlob.src = images[currentImageIndex]; // Cambio de la imagen
        //currentImageIndex = (currentImageIndex +1) % images.length;
        currentImageIndex = Math.floor(Math.random() * images.length);
    })
        .catch((error) => console.log(error));
}
function userScore(score) {
    const currentJoke = reportJokes.find((joke) => joke.joke === jokeText.innerHTML);
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
