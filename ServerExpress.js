const pug = require("pug");
const fs = require("fs");
const app = require("express");

app.set("view engine", "pug");


app.locals.movies = require("./Data/movie-data-10.json");
app.locals.users = [
    {
    uID = "5345";
    userid: "Israel Adesanya",
    password: "Hello123",
    contributor: true,
    pfollow: ["Dwayne Johnson", "Kevin Hart", "Jack Black", "Karen Gillan", "Nick Jonas"],
    ufollow: ["Jan Blachowicz", "Amanda Nunes", "Megan Anderson"],
    watched: ["Jumanji: Welcome to the Jungle", "Jumanji: The Next Level", "Iron Man", "Iron Man 2", "Iron Man 3"],
    recommended: ["Sherlock Holmes", "Avengers: Infinity War", "Fast & Furious", "Central Intelligence"],
    notifications: [
        {title: "Jumanji: The Next Level", note: "Dwayne Johnson has come out with a new movie"},
        {title: "Jumanji: The Next Level", note: "Kevin Hart has come out with a new movie"},
        {title: "Jumanji: The Next Level", note: "Jack Black has come out with a new movie"},
        {title: "Jumanji: The Next Level", note: "Karen Gillan has come out with a new movie"},
        {title: "Jumanji: The Next Level", note: "Nick Jonas has come out with a new movie"},
        {title: "Jumanji: The Next Level", note: "Amanda Nunes has added a new review"}
    ],
    reviews: [
        {title: "Iron Man", review: "The best movie in the history of movies!!!"},
        {title: "Jumanji: The Next Level", review: "Hilarious :)"}

    ]
    }
];  //temporary for testing 
app.locals.people = [{
    Name: "Ryan Reynolds",
    Directed: [{Title: "Deadpool 2", mID: "7678"},
                {Title: "Deadpool 1", mID: "7677"},
                {Title: "Wolverine", mID: "7623"},
            ],
    Acted: [{Title: "Deadpool 2", mID: "7678"},
            {Title: "Deadpool 1", mID: "7677"},
            {Title: "A love story", mID: "7123"},],
    Written: [{Title: "Deadpool 2", mID: "7678"},
            {Title: "Deadpool 1", mID: "7677"},
            {Title: "Bad Xmen Movie 23", mID: "1125"},],
    Collab: [{Name: "The Rock", pID: "231"},
            {Name: "Ellie white", pID: "2123"},
            {Name: "Abby Quentin", pID: "2111"},
            ]

}]; //temporary for testing 
app.locals.searchResults = [{mID: "456", Title: "Bloodhound"}, {Title: "Deadpool 2", mID: "7678"},
{Title: "Deadpool 1", mID: "7677"},
{Title: "A love story", mID: "7123"}]; //temporary for testing 

//routers ^_^ 
let userRouter = require("./userRouter");
app.use("/users", userRouter);
let moviesRouter = require("./movieRouter");
app.use("/movies", moviesRouter);
let peopleRouter = require("./personRouter");
app.use("/persons", peopleRouter);

//homepage :) 
app.get("/", (req, res, next)=> { res.render("views/pages/index"); });


app.listen(3000);
console.log("Server listening at http://localhost:3000");
