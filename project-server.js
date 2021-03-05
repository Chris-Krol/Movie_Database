const http = require('http');
const pug = require("pug");
const fs = require("fs");

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
    ]
    }
]

// start of temporary tester variables for template displaying
let nextID=1;
let movieData = require("./Data/movie-data-10.json");
let movies = {};
movieData.forEach(movie => {
	movies[nextID] = movie;
    nextID++;
});

let TemporaryActors = movies[1].Actors;
let TempWriters = movies[1].Writer;
let TempDirectors = movies[1].Director;

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
        }else if(request.url === "/users/"){
            //extracting the username to check if they exist and if they do to return the HTML
            //put other user profile page request here
            let pid = request.url.slice(7);
            try{
                let found = products.find(element => element.userid === pid);
                if(found){
                    console.log("Found: " + found);
                    let data = pug.renderFile()
                    response.statusCode = 200;
                    response.end(data);
                    return;
                }else{
                    send404(response);
                    return;
                }
            }catch{
                console.log(err);
                console.log("Exception casting pid");
                send404(response);
                return;
            }
        }else if(request.url === "/advancedsearch"){
            //put advanced search page request here
            let data = pug.renderFile("views/pages/advancedsearch.pug", {});
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
            let data = pug.renderFile("views/pages/MoviePreview.pug", {currMovie: testMovie, reviewsOfCurrentMovie: testreview, actors: TemporaryActors, writer: TempWriters, director: TempDirectors});
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
            let data = pug.renderFile("views/pages/MoviePreview.pug", {currMovie: testMovie, reviewsOfCurrentMovie: testreview, actors: TemporaryActors, writer: TempWriters, director: TempDirectors});
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