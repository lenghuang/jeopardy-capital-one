// Link JS to button in html
var btn = document.getElementById("btn");
var clueContainer = document.getElementById("clue-info");
btn.addEventListener("click", function(){
    var ourData;
    var ourRequest = new XMLHttpRequest();
    var offset = 0;
    ourRequest.open("GET","http://jservice.io/api/clues?=" + offset);
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
    var htmlString = "";
    for (i = 0; i <data.length; i++){
        htmlString += "<p>" + data[i]["question"] + " " + data[i]["answer"] + "</p>";
    }
    clueContainer.insertAdjacentHTML("beforeend",htmlString);
}

