//Note that a lot of this code is very similar to the user-router.js file
//This is because many of these operations are, in essense, the same
//We are retrieving a resource, creating/saving a resource, etc.
//As we cover more topics (databases, template engines), this code
// will become simplified. We will have less to do on our own
//This is related to the 'uniform interface' principle - we
// are doing the same types of operations on different resources

const express = require('express');
const path = require('path');
const fs = require("fs");
let router = express.Router();

//Requests for /movies
//Specify three functions to handle in order
//Why is this a good design?
router.get("/", queryParser); //parse the query parameters into something meaningful
router.get("/", loadMovies); //load the matching movies
router.get("/", respondMovies); //send the response containing the matching movies

//You can also specify multiple functions in a row
router.post("/", express.json(), createMovie);

//Requests for a person's profile
router.get("/:id", getMovie, sendSingleMovie);
router.put("/:id", express.json(), saveMovie);

//Parse the query parameters
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
//name: string to find in movie name to be considered a match
//minprice: the minimum price to find
//maxprice: the maximum price to find
function queryParser(req, res, next){
	const MAX_MOVIES = 50;

	try{
		if(!req.query.limit){
			req.query.limit = 10;
		}else{
			req.query.limit = Number(req.query.limit);

			if(req.query.limit > MAX_MOVIES){
				req.query.limit = MAX_MOVIES;
			}
		}
	}catch{
		req.query.limit = 10;
	}

	//Parse page parameter
	try{
		if(!req.query.page){
			req.query.page = 1;
		}else{
			req.query.page = Number(req.query.page);

			if(req.query.page < 1){
				req.query.page = 1;
			}
		}
	}catch{
		req.query.page = 1;
	}

	if(req.query.minprice){
		try{
			req.query.minprice = Number(req.query.minprice);
		}catch(err){
			req.query.minprice = undefined;
		}
	}

	if(req.query.maxprice){
		try{
			req.query.maxprice = Number(req.query.maxprice);
		}catch{
			req.query.maxprice = undefined;
		}
	}

	//Build up a matching query string to allow pagination
	let params = [];
	for(param in req.query){
		//We want all except the page query parameters
		//We will add the page manually for next/previous page links
		if(param == "page"){
			continue;
		}
		params.push(param + "=" + req.query[param]);
	}
	req.qstring = params.join("&");

	next();
}

//Loads a movie and adds it to request object
function getMovie(req, res, next){
	let id = req.params.id;
	if(fs.existsSync(fileName)){
		fs.readFile(fileName, "utf-8", function(err, data){
			if(err){
				console.log("Error reading file: " + err);
				res.status(500).send("Error reading data on server.");
				return;
			}
			req.movie = JSON.parse(data);
			next();
		})
	}else{
		res.status(404).send("Could not find user.");
	}
}

//Saves a movie using the request body
//Users for updating movies with a PUT request
function saveMovie(req, res, next){
	// let id = req.params.id;
	// let fileName = path.join(".", req.app.locals.config.movieDir, id + ".json");
	// if(fs.existsSync(fileName)){
	// 	fs.writeFileSync(fileName, JSON.stringify(req.body));
	// 	res.status(200).send("Movie saved.");
	// }else{
	// 	res.status(404).send("Could not find movie.");
	// }
}

//Helper function for determining whether a movie
// matches the query parameters. Compares the name,
// min price, and max price. All must be true.
//Again, different systems may have different logic
function movieMatch(movie, query){
	// let nameCheck = !query.name || movie.name.toLowerCase().includes(query.name.toLowerCase());
	// let minPriceCheck = !query.minprice || movie.price >= query.minprice;
	// let maxPriceCheck = !query.maxprice || movie.price <= query.maxprice;
	// return nameCheck && minPriceCheck && maxPriceCheck;
}

//Load the correct movies into the result object
//Works similar to user router, but has different checks
// for movie matching (min price, max price)
function loadMovies(req, res, next){
	// let results = [];
	// let startIndex = (req.query.page-1) * Number(req.query.limit);
	// let endIndex = startIndex + Number(req.query.limit);
	// let countLoaded = 0;
	// let failed = false;

	// //Read all files in the directory
	// fs.readdir(path.join(".", req.app.locals.config.movieDir), function(err, items) {
	// 	let count = 0;
	// 	//For each movie file
	// 	for (let fileNum=0; fileNum < items.length; fileNum++) {
	// 		//Read the movies data and create an object
	// 		let data = fs.readFileSync(path.join(".", req.app.locals.config.movieDir, items[fileNum]));
	// 		let movie = JSON.parse(data);

	// 		//If the movie matches the query parameters
	// 		if(movieMatch(movie, req.query)){
	// 			//Add to results if we are at the correct index
	// 			if(count >= startIndex){
	// 				results.push(movie);
	// 			}

	// 			//Stop if we have the correct number of results
	// 			if(results.length >= req.query.limit){
	// 				break;
	// 			}

	// 			count++;
	// 		}

	// 	}
	// 	//Set the property to be used in the response
	// 	res.movies = results;
	// 	next();
	// });
}

//Sends an array of movies in response to a request
//Uses the movies property added by previous middleware
//Sends either JSON or HTML
function respondMovies(req, res, next){
	// res.format({
	// 	"text/html": () => {res.render("pages/movies", {movies: res.movies, qstring: req.qstring, current: req.query.page } )},
	// 	"application/json": () => {res.status(200).json(res.movies)}
	// });
	// next();
}

//Create a new random movie in response to POST /movies
//Again, in a real system, we would likely provide a page
// to specify a new movies information
function createMovie(req, res, next){
	// //See the request body
	// //Really, it would contain the movie specification
	// //We can check the data, validate it, create the new movies
	// console.log(req.body);

	// //Generate a random movie
	// let p = {};
	// p.id = req.app.locals.config.nextMovieID;
	// p.name = faker.commerce.movieName();
	// p.price = faker.commerce.price();
	// p.reviews = [];
	// p.buyers = [];

	// //Update config and save the Movie to a file
	// req.app.locals.config.nextMovieID++;
	// fs.writeFileSync("config.json", JSON.stringify(req.app.locals.config));
	// fs.writeFileSync(path.join(".", req.app.locals.config.movieDir, p.id + ".json"), JSON.stringify(p));
	// res.status(201).send(p);
}

//Create and send representation of a single movie
//Sends either JSON or HTML
function sendSingleMovie(req, res, next){
	res.format({
		"application/json": function(){
			res.status(200).json(req.movie);
		},
		"text/html": () => { res.render("pages/movie", {movie: req.movie}); }
	});

	next();
}

//Export the router so it can be mounted in the main app
module.exports = router;
