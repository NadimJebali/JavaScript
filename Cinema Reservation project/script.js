let movieList = document.getElementById("movie");
let showroom = document.querySelector(".seat-map");
let seats = document.querySelectorAll(".seat:not(.occupied)");
let count = document.getElementById("count");
let total = document.getElementById("total");
let checkout = document.getElementById("checkout");
let screen = document.querySelector(".screen");

let seatN = 0;
let ticketPrice = 0;
let totalTicketsPrice = 0;
let showroomId = showroom.getAttribute("id").match(/\d+/)[0] - 1;

function addMovieToList(movie, value) {
  let listItem = document.createElement("option");
  listItem.innerHTML = movie;
  listItem.value = value;
  movieList.appendChild(listItem);
}

async function movieListDB() {
  let response = await fetch("http://localhost:3000/cinema");
  let data = await response.json();

  data.showroom[showroomId].movies.forEach((movie) => {
    addMovieToList(movie.name, movie.price);
  });
  console.log(data.showroom[showroomId].movies);

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
  } else if (e.target.classList.contains("occupied")){
    alert("This seat is already occupied");
    return;
  }else{
    e.target.classList.toggle("selected");
    let selectedSeats = document.querySelectorAll(".seat.selected").length;
    count.innerText = selectedSeats;
    totalTicketsPrice = parseInt(totalTicketsPrice) + parseInt(ticketPrice);
    total.innerText = totalTicketsPrice;
  }
});

function changeStatus(showroomId, seatId, seatStatus) {
  fetch(`http://localhost:3000/cinema/showroom/${showroomId}/seats/${seatId}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: seatStatus,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function checkingSeatsStatus() {
  let response = await fetch("http://localhost:3000/cinema");
  let data = await response.json();

  data.showroom[showroomId].seats.forEach((seat) => {
    if (seat.status === "occupied") {
      document.getElementById(seat.id).classList.add("occupied");
    }
  });
}

checkout.addEventListener("click", () => {
  let selectedSeats = document.querySelectorAll(".seat.selected");
  if (selectedSeats.length === 0) {
    alert("Please select a seat");
    return;
  }

  selectedSeats.forEach((seat) => {
    seat.classList.remove("selected");
    seat.classList.add("occupied");
    changeStatus(showroomId, seat.id, "occupied");
  });

  alert("Thank you for your purchase!");

  count.innerText = 0;
  total.innerText = 0;
  totalTicketsPrice = 0;
});

screen.addEventListener("click", () => {
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley", "_blank");
});

movieListDB();
checkingSeatsStatus();
changeStatus(1, 1, "occupied");
