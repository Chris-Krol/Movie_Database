const pug = require("pug");
const fs = require("fs");
const express = require("express");
const app = express();

app.set("view engine", "pug");

app.use(express.static('public'))

app.locals.movies = require("./Data/movie-data-10.json");
app.locals.users = require("./Data/users.json");  //temporary for testing 
app.locals.people = require("./Data/people.json"); //temporary for testing
console.log(app.locals.users);
app.locals.searchResults = [{mID: "456", Title: "Bloodhound"}, {Title: "Deadpool 2", mID: "7678"},
{Title: "Deadpool 1", mID: "7677"},
{Title: "A love story", mID: "7123"}]; //temporary for testing 

//routers ^_^ 
let userRouter = require("./userRouter");
app.use("/users", userRouter);
let moviesRouter = require("./movieRouter");
app.use("/movies", moviesRouter);
let peopleRouter = require("./peopleRouter");
app.use("/persons", peopleRouter);

//homepage :) 
app.get("/", (req, res, next)=> { res.render("pages/index"); });


app.listen(3000);
console.log("Server listening at http://localhost:3000");
