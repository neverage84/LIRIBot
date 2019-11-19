require("dotenv").config();

const cTable = require('console.table');
var axios = require("axios");
var moment = require('moment');
var keys = require("./keys.js");
//var Spotify = require('node-spotify-api');
var http = require('http');
var fs = require('fs');
const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);




var task = process.argv[2];
var lookUp = process.argv.slice(3).toString().replace(/,/g, " ");

RunProgram();

function RunProgram(){
if (task === "concert-this" ){
  ConcertThis();
}
else if (task === "spotify-this-song"){
  runSpotify();
}
else if (task === "movie-this"){
  runMovie();
}
else if (task === "do-what-it-says"){
   doIt();
}

else {
  console.log("Wrong input");
}

}




function ConcertThis(){
axios.get("https://rest.bandsintown.com/artists/" + lookUp + "/events?app_id=codingbootcamp").then(
  function(response) {

    ConcertArr = [];

  

    for (var i = 0; i < 21; i++){

    
    var date = moment(response.data[i].datetime.toString(), moment.ISO_8601);
    var formattedDate = date.format("MM/DD/YYYY");

    // console.log("+------------------------------------------");
    // console.log( "Venue Name: " + response.data[i].venue.name);
    // console.log("Venue City: " + response.data[i].venue.city);
    // console.log("Venue Date: " + formattedDate);
    // console.log("+------------------------------------------");
      ConcertArr.push(
        { "Venue Name": response.data[i].venue.name,
          "Venue City": response.data[i].venue.city, 
          "Venue Date": formattedDate
      });
      
    }
    // console.log(ConcertArr);
    console.table(ConcertArr);
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
  if (lookUp === ""){
    spotify.search({ type: 'track', query: "The Sign Ace of Base" }, function(err, data) {
      if (err) {
       return console.log('Error occurred: ' + err);
     }
     console.table([
      {"Artist(s)": data.tracks.items[0].album.artists[0].name},
      {Song: data.tracks.items[0].name}, 
      {Preview_Link: data.tracks.items[0].preview_url},
      {Album: data.tracks.items[0].album.name}
    ]);

    });
  }
  
else{


  spotify.search({ type: 'track', query: lookUp }, function(err, data) {
    if (err) {
     return console.log('Error occurred: ' + err);
   }
   
  console.table([
  {"Artist(s)": data.tracks.items[0].album.artists[0].name},
  {Song: data.tracks.items[0].name}, 
  {Preview_Link: data.tracks.items[0].preview_url},
  {Album: data.tracks.items[0].album.name}
]);
  });
}

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

function doIt(){
  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    // We will then print the contents of data
    console.log(data);
  
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
  
    // We will then re-display the content as an array for later use.
     task = dataArr[0];
    lookUp = dataArr[1];
    RunProgram();
  
  });
}
