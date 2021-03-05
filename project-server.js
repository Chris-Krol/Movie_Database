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
        }
    }

});

//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');