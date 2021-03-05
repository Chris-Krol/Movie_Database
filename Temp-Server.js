
const http = require('http');
const pug = require("pug");
const fs = require("fs");
nextID=1;
let movieData = require("./movie-data-10.json");
let movies = {}; //Stores all of the cards, key=id
movieData.forEach(movie => {
	movies[nextID] = movie;
    nextID++;
});

let TemporaryActors = movies[1].Actors;
let TempWriters = movies[1].Writer;
let TempDirectors = movies[1].Director;


//Helper function to send a 404 error
function send404(response){
	response.statusCode = 404;
	response.write("Unknown resource.");
	response.end();
}

//Helper function to send a 500 error
function send500(response){
	response.statusCode = 500;
	response.write("Server error.");
 	response.end();
}

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

const server = http.createServer(function (request, response) {
	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/index.html"){
			let data = pug.renderFile("index.pug", {currMovie: testMovie, reviewsOfCurrentMovie: testreview, actors: TemporaryActors, writer: TempWriters, director: TempDirectors});
			response.statusCode = 200;
			response.end(data);
			return;
		}else if(request.url.startsWith("/Movies/")){
				//extract the product ID
				//Find the product with that ID (if it exists)
				//Pass that product into our product template
				//Get the HTML back, send the response
			let pid = request.url.slice(10);
			try{
				pid = Number(pid);
				let found = products.find(element => element.id === pid);
				if(found){
					console.log("Found: " + found);
					let content = pug.renderFile("views/pages/product.pug", {product: found});
					response.statusCode = 200;
					response.end(content);
					return;
				}else{
					send404(response);
					return;
				}
			}catch(err){
				console.log(err);
				console.log("Exception casting pid");
				send404(response);
				return;
			}
		}else if(request.url === "/jsFile.js"){
			fs.readFile("./jsFile.js", function(err, data){
				if(err){
					send500(response);
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "application/json");
				response.end(data);
				return;
			});
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
		}else if(request.url === "/addproduct"){
			let content = pug.renderFile("views/pages/addproduct.pug", {});
			response.statusCode = 200;
			response.end(content);
			return;
		}else if(request.url === "/addproduct.js"){
			fs.readFile("addproduct.js", function(err, data){
				if(err){
					send500(response);
					return;
				}
				response.statusCode = 200;
				response.end(data);
				return;
			});
		}else{
			send404(response);
		}
	}else if(request.method === "POST"){
		if(request.url === "/products"){
			let body = "";
			request.on('data', (chunk) => {
				body += chunk;
			})
			request.on('end', () => {
				let newProduct = JSON.parse(body);
				if(newProduct.hasOwnProperty("name") && newProduct.hasOwnProperty("price")){
					newProduct.id = nextID;
					nextID++;
					newProduct.featured = false;
					products.push(newProduct);
					response.statusCode = 201;
					response.write(String(newProduct.id));
					response.end();
					return;
				}else{
					send404(response);
				}
			})
		}else{
			send404(response);
		}
	}else if(request.method === "PUT"){
		if(request.url.startsWith("/products/")){
			let pid = request.url.slice(10);
			try{
				pid = Number(pid);
				let found = products.find(element => element.id === pid);
				if(found){
					let body = ""
					request.on('data', (chunk) => {
						body += chunk;
					})
					request.on('end', () => {
						let result = JSON.parse(body);
						console.log(body);
						if(result.hasOwnProperty("featured")){
							found.featured = result.featured;
							console.log(found);
							response.statusCode = 200;
							response.write(String(found.id));
							response.end();
							return;
						}else{
							send404(response);
							return;
						}
					})
				}else{
					send404(response);
					return;
				}
			}catch(err){
				console.log(err);
				console.log("Exception casting pid");
				send404(response);
				return;
			}
		}else{
			send404(response);
			return;
		}
	}else{
		send404(response);
	}
});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
