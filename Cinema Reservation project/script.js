let movieList = document.getElementById("movie");
let showroom = document.querySelector(".seat-map");
let seats = document.querySelectorAll(".seat:not(.occupied)");
let count = document.getElementById("count");
let total = document.getElementById("total");
let checkout = document.getElementById("checkout");

let seatN = 0;
let ticketPrice = 0;
let totalTicketsPrice = 0;

function addMovieToList(movie, value) {
  let listItem = document.createElement("option");
  listItem.innerHTML = movie;
  listItem.value = value;
  movieList.appendChild(listItem);
}

async function movieListDB() {
  let response = await fetch("http://localhost:3000/cinema");
  let data = await response.json();

  let showroomIndex = showroom.getAttribute("id").match(/\d+/)[0] - 1;

  data.showroom[showroomIndex].movies.forEach((movie) => {
    addMovieToList(movie.name, movie.price);
  });
  console.log(data.showroom[showroomIndex].movies);

  ticketPrice = movieList.value;

  movieList.addEventListener("change", (e) => {
    ticketPrice = e.target.value;
  });
}

showroom.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("selected") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.remove("selected");
    let selectedSeats = document.querySelectorAll(".seat.selected").length;
    count.innerText = selectedSeats;
    totalTicketsPrice = parseInt(totalTicketsPrice) - parseInt(ticketPrice);
    total.innerText = totalTicketsPrice;
  } else {
    e.target.classList.toggle("selected");
    let selectedSeats = document.querySelectorAll(".seat.selected").length;
    count.innerText = selectedSeats;
    totalTicketsPrice = parseInt(totalTicketsPrice) + parseInt(ticketPrice);
    total.innerText = totalTicketsPrice;
  }
});

function changeStatus(Id, id, status) {
  fetch(`http://localhost:3000/cinema/showroom/${id}/seat/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  });
}

movieListDB();
changeStatus(1, 1, "occupied");
