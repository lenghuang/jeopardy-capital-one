var btn = document.getElementById("btn");
var clueContainer = document.getElementById("clue-info");

var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});

btn.addEventListener("click", function(){
    clueContainer.innerHTML = "";
    var found = 0;
    var htmlString = "";
    var search = input.value;
    var compressed = new XMLHttpRequest();
    compressed.open("GET","https://lenghuang.github.io/Capital_One_Data/titles_new.json");
    compressed.onload = function() { 
        // Search through compressed dataset
        if(safe_onload(compressed)){
            var compJson = JSON.parse(compressed.responseText);
                for(var i = 0; i < compJson.length; i++){ //18418
                    if(i % 100 == 0) {
                        console.log(found);
                    }
                    if(compare(compJson[i]["title"], search)){
                        console.log("Compare true");
                        found++;
                        get_category(compJson[i]["id"], htmlString);
                    }
                } // End loop
            } // End onload safety check
            if(found == 0){
                clueContainer.insertAdjacentHTML("beforeend", "<center> Not Found :( </center>");
            }
        }; // End onload of compressed
    compressed.send();
    });

function renderHTML(data, htmlString){
    htmlString = "<br></br> <h2>" + data["title"].toUpperCase() + "</h2>";
    for (i = 0; i < data["clues"].length; i++){
        htmlString += "<p> <b> Answer: </b> " + data["clues"][i]["answer"] + "<br/> <b> Question: </b>" + data["clues"][i]["question"] + "</p>";
    }
    clueContainer.insertAdjacentHTML("beforeend", htmlString);
}

function safe_onload(xhr){
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        return true;
    } else {
        return false;
    }
}
function get_category(id, htmlString){
    // if title matches, call the api link of that id
    var category = new XMLHttpRequest();
    category.open("GET", "http://jservice.io/api/category?id=" + id);
    category.onload = function() {
        if(safe_onload(category)){
            var category_print = JSON.parse(category.responseText);
            renderHTML(category_print, htmlString);
        }
    };
    category.send();
}

function compare(title, search){
    var a = title.toUpperCase();
    var b = search.toUpperCase();
    return a.includes(b);
}