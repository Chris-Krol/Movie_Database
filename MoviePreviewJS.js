
const init = function(){
    const addReviewButton=document.getElementById("addReview");
    //const searchButton=document.getElementById("searchButton");
    const loadButton=document.getElementById("loadButton");
    const reviewStuff = document.getElementsByClassName("containertop");
    let x = reviewStuff.length;
    for(i = 0; i<x; i++){
        reviewStuff[i].setAttribute("onclick",`collapse(${reviewStuff[i].id})`);
    }
    let movieList = [];
    let prevSearched = [];
    let CurrentlyLoaded = '';

    let reviews = 0;
    let reviewList = [];
    addReviewButton.onclick=addReview;
}



//generate IDs, taken/inspired from https://bit.ly/3ahHLQN
const idGenerator = function(){
    const randomString = function(){
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return randomString() + randomString();
}

const render = function(movieIndex){
    CurrentlyLoaded = movieList[movieIndex].imdbID;
    const posterInHTML = document.getElementById("posterdiv");
    const reviewInHTML = document.getElementById("revdiv");
    const infoInHTML = document.getElementById("descriptor");
    const prevSearchedInHTML = document.getElementById("PrevSearched");
    // prevSearchedInHTML.innerHTML = '';
    // prevSearched.forEach(function (searched){
    //     const prevSearchedNode = document.createElement("option");
    //     prevSearchedNode.setAttribute("value",`${searched}`);
    //     prevSearchedNode.innerHTML=`${searched}`;
    //     prevSearchedInHTML.appendChild(prevSearchedNode);
    // });
    posterInHTML.innerHTML="";
    reviewInHTML.innerHTML="";
    infoInHTML.innerHTML="";
    const node = document.createElement("img");
    node.setAttribute(`id`,`poster`);
    node.setAttribute(`src`,`${movieList[movieIndex].Poster}`);
    node.setAttribute(`alt`,`${movieList[movieIndex].Title} Poster`);
    posterInHTML.append(node);
    infoInHTML.innerHTML=`
        <h1 class="Titles">${movieList[movieIndex].Title}</h1>
        <p id="Plot">${movieList[movieIndex].Plot}</p>
        <p id="RunAndRelease">Release Year: ${movieList[movieIndex].Year} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Runtime:${movieList[movieIndex].Runtime}</p>
        <div class="divider"></div>
        <h1 id="castTitle" class="Titles">Cast</h1>
        <p class="PlotAndCast" id="cast">${movieList[movieIndex].Actors}</p>
        
    `;
    let reviewsOfCurrentMovie = [];
    reviewsOfCurrentMovie = reviewList.filter(function(arrayhere){
        return arrayhere.imdbID === CurrentlyLoaded;
    });
    reviewsOfCurrentMovie.forEach(function (singularReviews){
      //create a new node 
      const containerNode = document.createElement("div");
      containerNode.setAttribute(`class`,`containertop hiddendropdown`); 
      containerNode.setAttribute(`id`,`${singularReviews.identifier}`);
      containerNode.setAttribute(`onclick`,`collapse(${singularReviews.identifier})`);
      containerNode.innerHTML=`
      <h1 class="containertoptext">Review by ${singularReviews.UserName} <span style="color:green"> Rating: ${singularReviews.Rating}/10 </span></h1>
      <h2 class="dropdowntext">${singularReviews.TheReview}</h2>
      `;
      reviewInHTML.appendChild(containerNode);
      console.log("finished rendering");
    });
}


//function from my tut1
const collapse = function(number){
    let div = document.getElementById(number);
    if (div.classList.contains('hiddendropdown') === true) {
        let height = div.scrollHeight;
        div.style.setProperty('max-height', height + 'px');
        div.classList.toggle("hiddendropdown");
    } else if (div.classList.contains('hiddendropdown') === false) {
        div.style.setProperty('max-height', '60px');
        div.classList.toggle("hiddendropdown");
    }
}


const addReview = function(){
    //get data
    const usernameInputed = document.getElementById('userNameID').value.trim();
    const reviewInputed = document.getElementById('NotesID').value.trim();
    const ratingChoosen = document.getElementById('ratingID').value;

    //validate data
    if(usernameInputed !== '' && reviewInputed !== ''){
        reviews +=1;
        const aNewReview = {
            UserName: `${usernameInputed}`,
            Rating: `${ratingChoosen}`,
            TheReview: `${reviewInputed}`,
            identifier: `${reviews}`,
            imdbID: `${CurrentlyLoaded}` //place holder
        };
        reviewList.push(aNewReview);
        document.getElementById('userNameID').value = '';
        document.getElementById('NotesID').value = '';
        document.getElementById('ratingID').value = "1";
    }else{alert("All fields must be filled, please try again")}
    //add to the list 
    //render again    
}

init();


