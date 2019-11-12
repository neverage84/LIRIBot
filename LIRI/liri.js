var axios = require("axios");
var moment = require('moment');


var task = process.argv[2];
var lookUp = process.argv.slice(3).toString().replace(/,/g, " ");


switch (task) {
  case "concert-this":
    ConcertThis();


  default:
    console.log("That is not a valid command");
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
