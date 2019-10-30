// Link JS to button in html
var btn = document.getElementById("btn");
var clueContainer = document.getElementById("clue-info");
btn.addEventListener("click", function(){
    var ourData;
    var ourRequest = new XMLHttpRequest();
    var id = 1;
    ourRequest.open("GET","http://jservice.io/api/category?id=" + id);
    // Function to load text as json object
    ourRequest.onload = function() {
        ourData = JSON.parse(ourRequest.responseText);
        console.log(ourData[0]);
        renderHTML(ourData);
    };
    ourRequest.send(ourData);
});

// Function to write gathered data out to HTML
function renderHTML(data){
    var htmlString = "<h1> Category: " + data["title"] + "</h1>";
    for (i = 0; i < data["clues"].length; i++){
        htmlString += "<p>" + data["clues"][i]["question"] + " " + data["clues"][i]["answer"] + "</p>";
    }
    clueContainer.insertAdjacentHTML("beforeend",htmlString);
}

