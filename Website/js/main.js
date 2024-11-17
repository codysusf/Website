// Get references to elements
const movieNameInput = document.getElementById("movie-name");
const movieRatingInput = document.getElementById("movie-rating");
const tableBody = document.querySelector("table tbody");

// Event listener for adding a movie
document.getElementById("movieForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form from reloading the page

  const movieName = movieNameInput.value.trim();
  const movieRating = movieRatingInput.value.trim();

  if (!movieName || !movieRating) {
    alert("Please fill in both fields.");
    return;
  }

  // Save the movie to localStorage
  saveMovieToLocalStorage(movieName, movieRating);

  // Reload the table to update the display
  loadMovies();

  // Clear the input fields
  movieNameInput.value = "";
  movieRatingInput.value = "";
});

// Save the movie to localStorage
function saveMovieToLocalStorage(movieName, movieRating) {
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  movies.push({ name: movieName, rating: movieRating });
  localStorage.setItem("movies", JSON.stringify(movies));
}

// Add a new movie to the table
function addMovieToTable(movieName, movieRating, movieIndex) {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${movieIndex + 1}</td>
    <td>${movieName}</td>
    <td>${movieRating}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;

  // Add event listener for the delete button
  newRow.querySelector(".delete-btn").addEventListener("click", function () {
    deleteMovie(movieIndex);
  });

  tableBody.appendChild(newRow);
}

// Load and display movies from localStorage on page load
function loadMovies() {
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  tableBody.innerHTML = ""; // Clear existing rows

  movies.forEach((movie, index) => {
    addMovieToTable(movie.name, movie.rating, index);
  });
}

// Delete a movie from localStorage
function deleteMovie(movieIndex) {
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  movies.splice(movieIndex, 1); // Remove the movie from the array
  localStorage.setItem("movies", JSON.stringify(movies));

  // Reload the table to update the numbering
  loadMovies();
}

// Load movies when the page loads
window.addEventListener("load", loadMovies);
