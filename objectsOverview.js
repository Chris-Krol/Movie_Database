

// Movies Object. We are using the provided movie data but adding to it some ID and a review property. 
// In the future these will be using mongoDB but for now the IDs are added using a for loop :)
let ExampleMovieObject = [{
        Title:"The Ballad of Cable Hogue",
        Year:"1970",
        Rated:"R",
        Released:"18 Mar 1970",
        Runtime:"121 min",
        Genre:["Comedy","Drama","Romance","Western"],
        Director:["Sam Peckinpah"],
        Writer:["John Crawford","Edmund Penney"],
        Actors:["Jason Robards","Stella Stevens","David Warner","Strother Martin"],
        Plot:"A hobo accidentally stumbles onto a water spring, and creates a profitable way station in the middle of the desert.",
        Awards:"1 win & 1 nomination.",
        Poster:"https://m.media-amazon.com/images/M/MV5BMTQwMjkwNjE0Ml5BMl5BanBnXkFtZTgwOTU5ODIyMTE@._V1_SX300.jpg",
        mID: "7678",
        Reviews: [{
                uID: "235",
                Rating: "6", 
                mID: "7678", 
                Text: "We Love this movie!", 
                Name: "Alex"
                }], // this is only one review. but it would be an array of all the reviews of this movie! 
        
        AverageRating: "7.6" // this would be blank and at some frequency, the server calculates the avg based on the reviews in the previous property
    }
]; // this is just one movie, this would be an array of many movies. 


// A singular review is as follows: 
let OneReview = {
    uID: "235", //ID of user than made the review. This should be linked to the user id in users object. And this will be handled by mongoDB.
    mID: "7678", //ID of movie the review is for. might seem redundant since it is in the movie object, but this will be used to reference the movie link in the user page
    Rating: "6", //a score out of 10 
    Text: "We Love this movie!", // actual review text 
    Name: "Alex" // Name of reviewer. Not sure if we need this as we have user ID and we can link them togethor. The more we know about mongoDB the more this will become apparent. We don't want redundant items for no reason.     
};



//a single user is as follows:

let user = {userid: "Israel Adesanya", //this is the username 
            password: "Hello123", // password 
            uID: "235", //internal ID 
            contributor: true, 
            pfollow: [  
                {Name: "Dwayne Johnson", pID: "231"},
                {Name: "Kevin Hart", pID: "26345"},
                {Name: "Jack Black", pID: "6734"},
                {Name: "Karen Gillan", pID: "967"},
                {Name: "Nick Jonas", pID: "2342"}
            ],//people they are following                           
            ufollow: [  
                {Name: "Jan Blachowicz", uID: "1233"},
                {Name: "Amanda Nunes", uID: "345"},
                {Name: "Megan Anderson", uID: "645"},
            ], // users they are following 
            watched: [
                {Title: "Jumanji: Welcome to the Jungle", mID: "534"}, 
                {Title: "Jumanji: The Next Level", mID: "3457"}, 
                {Title: "Iron Man", mID: "756"}, 
                {Title: "Iron Man 2", mID: "456"}, 
                {Title: "Iron Man 3", mID: "6452"}
            ], // movies they watched
            recommended: [
                {Title: "Sherlock Holmes", mID:"453"},
                {Title: "Avengers: Infinity War", mID:"676"}, 
                {Title: "Fast & Furious", mID:"1267"}, 
                {Title: "Central Intelligence", mID:"756"}
            ], // recommended movies
            notifications: [
                            {title: "Jumanji: The Next Level", note: "Dwayne Johnson has come out with a new movie"},
                            {title: "Jumanji: The Next Level", note: "Kevin Hart has come out with a new movie"},
                            {title: "Jumanji: The Next Level", note: "Jack Black has come out with a new movie"},
                            {title: "Jumanji: The Next Level", note: "Karen Gillan has come out with a new movie"},
                            {title: "Jumanji: The Next Level", note: "Nick Jonas has come out with a new movie"},
                            {title: "Jumanji: The Next Level", note: "Amanda Nunes has added a new review"}
                            ],
            isLoggedIn: false, // this might not be necessary once we learn about sessions etc.
            Reviewed: [] //for now this would be an array of all their reviews. so an array of OneReview from above. This is most likely will change once we learn mongoDB and link things better.
        };


//people are stored in an array of objects, each object is as follows:
// again, people's IDs will be managed by mongo once we have a grasp on that 
let onePerson = {
    Name: "Ryan Reynolds",
    pID: "3412",
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



