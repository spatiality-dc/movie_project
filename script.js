// Initial array of movies
let movies = ["The Matrix", "The Notebook", "Mr Robot", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
  let container = document.querySelector('#movies-view');
  removeAllChildNodes(container);

  let movie = $(this).attr("data-name");
  let queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {

    // Creating a div to hold the movie
    let movieDiv = $("<div class='movie'>");

    // Storing the rating data
    let rating = response.Rated;

    // Creating an element to have the rating displayed
    let pOne = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    movieDiv.append(pOne);

    // Storing the release year
    let released = response.Released;

    // Creating an element to hold the release year
    let pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    movieDiv.append(pTwo);

    // Storing the plot
    let plot = response.Plot;

    // Creating an element to hold the plot
    let pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(pThree);

    // Retrieving the URL for the image
    let imgURL = response.Poster;

    // Creating an element to hold the image
    let image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);
  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (let i = 0; i < movies.length; i++) {

    // Dynamically generating buttons for each movie in the array
    let a = $("<button>");
    // Adding a class of btn-outline-secondary
    a.addClass("btn-outline-secondary");
    // Adding a data-attribute
    a.attr("data-name", movies[i]);
    // Providing the initial button text
    a.text(movies[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
    //Set session storage

}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  let movie = $("#movie-input").val().trim();

  // Adding movie from the textbox to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "btn-outline-secondary"
$(document).on("click", ".btn-outline-secondary", displayMovieInfo);


// Calling the renderButtons function to display the initial buttons
renderButtons();



