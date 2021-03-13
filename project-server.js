const http = require('http');
const pug = require("pug");
const fs = require("fs");


// temporary data for project check in 

let users = [
    {userid: "Israel Adesanya",
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
]

let nextID=1;
let movieData = require("./Data/movie-data-10.json");
let movies = {};
movieData.forEach(movie => {
	movies[nextID] = movie;
    movies[nextID].mID = nextID;
    nextID++;
});

let testMovie = movies[1];
let testreview = [
    {
        identifier:"1",
        UserName:"Chris",
        Rating:"2",
        TheReview:"this sux"
    },
    {        
        identifier:"2",
        UserName:"Abby",
        Rating:"1",
        TheReview:"i just want to not be burnt out for one online semester and not constantly want to drop out but here we are anyways"}
];

let recommendedMovies = [];
for(i = 0; i < 6; i++){recommendedMovies[i]=movies[i+3];};


let testHuman = {
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

};


let SearchResults = [{mID: "456", Title: "Bloodhound"}, {Title: "Deadpool 2", mID: "7678"},
                    {Title: "Deadpool 1", mID: "7677"},
                    {Title: "A love story", mID: "7123"}];


// end :) 


function send404(response){
    response.statusCode = 404;
    response.write("Unknown resource.");
    response.end();
}

function send500(response){
    response.statusCode = 500;
    response.write("Server error.");
    response.end();
} 

const server = http.createServer(function (request, response) {
    if(request.method === "GET"){
        if(request.url === "/" || request.url === "/index.html"){
            let data = pug.renderFile("views/pages/index.pug", {});
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url === "/myprofile"){
            //put user profile page request here
            let data = pug.renderFile("views/pages/myprofile.pug", {user: users[0]});
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url.startsWith("/users/")){
            //put example user page here
            let data = pug.renderFile("views/pages/user.pug", {user: users[0]});
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url === "/advancedsearch"){
            //put advanced search page request here
            let data = pug.renderFile("views/pages/advancedsearch.pug", {});
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url.startsWith("/searchResults?")){
            //put user profile page request here
            let data = pug.renderFile("views/pages/SearchResultsPreview.pug", {user: users[0]});
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url === "/contribute"){
            //put contributer page request here
            let data = pug.renderFile("views/pages/contribute.pug", {});
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url === "/movies/MoviePreview"){
            let data = pug.renderFile("views/pages/MoviePreview.pug", {currMovie: testMovie, reviewsOfCurrentMovie: testreview, recMovies: recommendedMovies});
			response.statusCode = 200;
			response.end(data);
			return;
        }else if(request.url === "/persons/PeoplePreview"){
            let data = pug.renderFile("views/pages/peoplePreview.pug", {currHuman: testHuman});
			response.statusCode = 200;
			response.end(data);
			return;
        }else if(request.url === "/search/results"){
            let data = pug.renderFile("views/pages/searchResults.pug", {results: SearchResults});
			response.statusCode = 200;
			response.end(data);
			return;
        }else if(request.url === "/stylesheet.css"){
			fs.readFile("./stylesheet.css", function(err, data){
				if(err){
					send500(response);
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/css");
				response.end(data);
				return;
			});
        }else if(request.url === "/MoviePreviewJS.js"){
			fs.readFile("./MoviePreviewJS.js", function(err, data){
				if(err){
					send500(response);
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/json");
				response.end(data);
				return;
			});
        }else if(request.url.startsWith("/movies/")){
            // this should be done better with query etc but this is temporary
            //extract movie id, find it, send it, for now this will send the same movie regardless of id
            //let MovieID = request.uel.slice(8);
            //console.log("movie ID requested is: ")
            //console.log(MovieID);
            let data = pug.renderFile("views/pages/MoviePreview.pug", {currMovie: testMovie, reviewsOfCurrentMovie: testreview, recMovies: recommendedMovies});
			response.statusCode = 200;
			response.end(data);
			return;
        }else if(request.url.startsWith("/persons/")){
            // this should be done better with query etc but this is temporary
            let data = pug.renderFile("views/pages/peoplePreview.pug", {currHuman: testHuman});
			response.statusCode = 200;
			response.end(data);
			return;
        }else{
            send404(response);
        }
    }

});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');