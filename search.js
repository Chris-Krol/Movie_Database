
document.getElementById("search").addEventListener("click", getResults);

function getResults(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){

        }
    };

    xhttp.open("GET", "http://localhost:3000/search/results", true);
    xhttp.send();
}