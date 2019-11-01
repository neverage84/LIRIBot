var axios = require("axios");
var inquirer = require("inquirer");

inquirer
.prompt([
  // Here we create a basic text prompt.
  {
    type: "input",
    message: "What band are you searching for?",
    name: "Band"
  }
])
.then(function(inquirerResponse) {
  // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
  


// Then run a request with axios to the OMDB API with the movie specified
axios.get("https://rest.bandsintown.com/artists/" + inquirerResponse.Band + "/events?app_id=codingbootcamp").then(
  function(response) {

    for (var i = 0; i < 9; i++){
    console.log("+------------------------------------------");
    console.log( "Venue Name: " + response.data[i].venue.name);
    console.log("Venue City: " + response.data[i].venue.city);
    console.log("Venue Date: " + response.data[i].datetime);
    console.log("+------------------------------------------");

    }
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });



});
