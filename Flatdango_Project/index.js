document.addEventListener("DOMContentLoaded",()=>{
    fetchmovie1();
    fetchAllMovies();
})
//Display the first movie details
function firstMovie(movie) {
    const first=document.querySelector("#homeScreen")
    let availableTickets=movie.capacity-movie.tickets_sold
    first.innerHTML=`
    <h1>NOW IN CINEMA</h1>
    <img src=${movie.poster} alt="movie poster>"
    <br>
    <h1>${movie.title}</h1>
    <div id="time">
    <p>Runtime :${movie.runtime} minutes</p>
    <p>Showtime :${movie.showtime}</p>
    </div>
    <h2>Available Tickets ${availableTickets}</h2>`
    
}
//Fetch data of the first movie from the server
function fetchmovie1(){
    fetch("http://localhost:3000/films/1")
    .then(resp=>resp.json())
    .then(movies=>firstMovie(movies))
}
//Display movie titles
function allMovies(movie){
    let placer = document.querySelector(".menu")
    let list = document.createElement("li")
    let btn = document.createElement("button")
    btn.textContent=movie.title
    list.appendChild(btn)
    placer.appendChild(list)
    btn.addEventListener("click",()=>displayDetails(movie))
}
//Display movie details
function displayDetails(movie){
    const first=document.querySelector("#details")
    let availableTickets=movie.capacity-movie.tickets_sold
    first.innerHTML=`
     <img src=${movie.poster} alt="movie poster>"
    <br>
    <h1>${movie.title}</h1>
    <h3>Description</h3>
    <p>${movie.description}</p>
    <div id="time">
    <p>Runtime :${movie.runtime} minutes</p>
    <p>Showtime :${movie.showtime}</p>
    </div>
    <button id="buy">BUY TICKET</button>
    <h2 id="ticket">Available Tickets ${availableTickets}`
    //Buying tickets
    let buy = document.querySelector("#buy")
    buy.addEventListener("click",()=>{
        availableTickets--;
        if(availableTickets<=0){
            buy.textContent="Sold Out";
            document.querySelector("#ticket").textContent=`Available Tickets 0`
        }else{
            document.querySelector("#ticket").textContent=`Available Tickets ${availableTickets}`
        }
        }
        
       
    )
}

//Fetch data for all movies
function fetchAllMovies(){
    fetch("http://localhost:3000/films/")
    .then(resp=>resp.json())
    .then((movies)=>{movies.forEach((movie)=>allMovies(movie))})
}

