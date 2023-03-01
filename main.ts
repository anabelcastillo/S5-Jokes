const API_URL_JOKE: string = "https://icanhazdadjoke.com/";
const header = {
  headers: {
    Accept: 'application/json'
  }
};

const divJoke: HTMLElement | null = document.getElementById("show-joke");
const btnNextJoke: HTMLElement | null = document.getElementById("btn-next");

function getJoke() {
  fetch(API_URL_JOKE, header)
  .then(response => response.json())
  .then(data => {
    divJoke.innerHTML = data.joke;
    console.log(data.joke);
  })
  .catch(error => console.log(error));
}