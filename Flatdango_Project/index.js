document.addEventListener("DOMContentLoaded", () => {
    fetchMovie(1, displayFirstMovie);
    fetchAllMovies(displayAllMovies);
  });
  
  // Fetch data for a specific movie
  function fetchMovie(movieId, callback) {
    const url = `http://localhost:3000/films/${movieId}`;
    fetch(url)
      .then(resp => resp.json())
      .then(movie => callback(movie));
  }
  
  // Display the details of the first movie
  function displayFirstMovie(movie) {
    const homeScreen = document.querySelector("#homeScreen");
    const availableTickets = movie.capacity - movie.tickets_sold;
  
    homeScreen.innerHTML = `
      <h1>NOW IN CINEMA</h1>
      <img src="${movie.poster}" alt="movie poster">
      <br>
      <h1>${movie.title}</h1>
      <div id="time">
        <p>Runtime: ${movie.runtime} minutes</p>
        <p>Showtime: ${movie.showtime}</p>
      </div>
      <h2>Available Tickets: ${availableTickets}</h2>`;
  }
  
  // Fetch data for all movies
  function fetchAllMovies(callback) {
    const url = "http://localhost:3000/films/";
    fetch(url)
      .then(resp => resp.json())
      .then(movies => callback(movies));
  }
  
  // Display movie titles
  function displayAllMovies(movies) {
    const menu = document.querySelector(".menu");
  
    movies.forEach(movie => {
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = movie.title;
  
      listItem.appendChild(button);
      menu.appendChild(listItem);
  
      button.addEventListener("click", () => displayMovieDetails(movie));
    });
  }
  
 // Display movie details
function displayMovieDetails(movie) {
    const details = document.querySelector("#homeScreen");
    let availableTickets = movie.capacity - movie.tickets_sold;
  
    details.innerHTML = `
      <img src="${movie.poster}" alt="movie poster">
      <br>
      <h1>${movie.title}</h1>
      <h3>Description</h3>
      <p>${movie.description}</p>
      <div id="time">
        <p>Runtime: ${movie.runtime} minutes</p>
        <p>Showtime: ${movie.showtime}</p>
      </div>
      <button id="buy">BUY TICKET</button>
      <h2 id="ticket">Available Tickets: ${availableTickets}`;
  
    // Buying tickets
    let buy = document.querySelector("#buy");
    buy.addEventListener("click", () => {
      
      availableTickets--;
      if (availableTickets <= 0) {
        buy.textContent = "Sold Out";
        document.querySelector("#ticket").textContent = "Available Tickets 0";
        let soldMovie=document.querySelector("#details")
        soldMovie.innerHTML=`
        <ol>
        <li>${movie.title}</li>
        </ol>`
      } else {
        document.querySelector("#ticket").textContent = `Available Tickets ${availableTickets}`;
      }
    });
  }
  
  