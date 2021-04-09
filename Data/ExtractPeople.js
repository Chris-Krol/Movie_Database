const fs = require("fs");

let nextPersonID = 1;
let nextID=1;
let movieData = require("./movie-data-1000.json");
let movies = [];
movieData.forEach(movie => {
	movies[nextID] = movie;
    movies[nextID].mID = nextID;
    nextID++;
});

let people = {};
let allPeople = [];

movies.forEach(movie => {
    movie.Writer.forEach(witer => {
        if(!people.hasOwnProperty(witer)){
            let newPerson = {};
            newPerson.uID = nextPersonID++;
            newPerson.name = witer;
            newPerson.director = [];
            newPerson.actor = [];
            newPerson.writer = [];
            allPeople.push(newPerson);
            people[newPerson.name] = newPerson;
        }
        let currPerson = people[witer];
        let WrittenMovie = {
            title: movie.Title,
            mID: movie.mID
        };
        console.log(currPerson);
        currPerson.writer.push(WrittenMovie);
    });
});

console.log(movies[0]);
console.log(allPeople[0]);