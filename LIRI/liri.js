require("dotenv").config();

var axios = require("axios");
var moment = require('moment');
var keys = require("./keys");
var Spotify = require('node-spotify-api');



var task = process.argv[2];
var lookUp = process.argv.slice(3).toString().replace(/,/g, " ");


switch (task) {
  case "concert-this":
    ConcertThis();

  case "spotify-this-song":
    runSpotify();

  case "movie-this":
    runMovie();

}




function ConcertThis(){
axios.get("https://rest.bandsintown.com/artists/" + lookUp + "/events?app_id=codingbootcamp").then(
  function(response) {

    for (var i = 0; i < 9; i++){

    var date = moment(response.data[i].datetime.toString(), moment.ISO_8601);
    var formattedDate = date.format("MM/DD/YYYY");

    console.log("+------------------------------------------");
    console.log( "Venue Name: " + response.data[i].venue.name);
    console.log("Venue City: " + response.data[i].venue.city);
    console.log("Venue Date: " + formattedDate);
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

}

function runSpotify(){
  var spotify = new Spotify(keys.spotify);
  console.log(spotify);
  
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

}


function runMovie(){
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + lookUp + "&y=&plot=short&apikey=trilogy";
var defaultUrl = "http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy"
if (lookUp === ""){
  axios.get(defaultUrl).then(
    function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country where Produces: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
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

}

else {
axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.Ratings[0].Value);
    console.log("Rotton Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country where Produces: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
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
}
}
