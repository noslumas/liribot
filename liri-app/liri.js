var inquirer = require("inquirer");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);



inquirer
  .prompt([
    {
      type: "list",
      message: "Ask Liri what to do",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "command"
    },
  ]).then(function (inquirerResponse) {
    anotherFunction(inquirerResponse.command);
    if (inquirerResponse.command === "do-what-it-says") {
      doWhatItSays();
    }

  });

const anotherFunction = action => {
  switch (action) {
    case "concert-this": concertThis();
      break;
    case "spotify-this-song": spotifyThis();
      break;
    case "movie-this": movieThis();
      break;
  }
}

function concertThis() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What band do you want to see?",
        name: "band"
      }
    ]).then(function (response) {
      fs.appendFile("log.txt", response.band + "\n", function(err){

      });
      axios.get("https://rest.bandsintown.com/artists/" + response.band + "/events?app_id=codingbootcamp").then(function (response) {
        console.log("Band: " + response.data[0].lineup[0]);
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.country);
        console.log(response.data[0].venue.city);
        console.log(response.data[0].venue.region);
        console.log("Date of event: " + response.data[0].datetime);
      });
    })
}
function movieThis() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What movie do you want to see?",
        name: "movie"
      }
    ]).then(function (response) {
      fs.appendFile("log.txt", response.movie + "\n", function(err){

      });
      axios.get("http://www.omdbapi.com/?t=" + response.movie + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
          console.log("Movie Title: " + response.data.Title);
          console.log("Year of the movie: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Country: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Movie Plot: " + response.data.Plot);
          console.log("Actors: " + response.data.Actors);
        });
    })

}



function spotifyThis() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What song do you want to play?",
        name: "song"
      }
    ]).then(function (response) {
      fs.appendFile("log.txt", response.song, function(err){

      });
      spotify.search({ type: 'track', query: response.song + "\n" }, function (err, data) {
   
    console.log(data.tracks.items[0].artists[0].name); 
    console.log(data.tracks.items[0].name); 
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  });
  });

}