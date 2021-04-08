const fs = require("fs");


let nextID=1;
let movieData = require("./movie-data-10.json");
let movies = {};
movieData.forEach(movie => {
	movies[nextID] = movie;
    movies[nextID].mID = nextID;
    nextID++;
});

console.log(JSON.stringify(movieData));