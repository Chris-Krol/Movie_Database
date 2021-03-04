const http = require('http');
const pug = require("pug");
const fs = require("fs");


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
        if(request.url === "/myprofile"){
            //put user profile page request here
            response.statusCode = 200;
            response.end(data);
            return;
        }else if(request.url === "/users/otheruser"){
            //put other user profile page request here
            response.statusCode = 200;
            response.end(data);
            return;
        }
    }

});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');