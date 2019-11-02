var btn = document.getElementById("btn");
var clueContainer = document.getElementById("clue-info");

btn.addEventListener("click", function(){
    var search = document.getElementById("search").value;
    console.log(search);
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET","https://lenghuang.github.io/Capital_One_Data/titles.json");
    ourRequest.onload = function() { 
        // Search through compressed dataset
        if(safe_onload(ourRequest)){
            console.log("Unloaded ourRequest");
            var ourData = JSON.parse(ourRequest.responseText);
                for(var id = 0; id < 18418; id++){ //18418
                    console.log("For loop at id: " + (id+1));
                    // There is an error where the first key of politics is not being accessed
                    if(Object.keys(ourData).length > 2){
                        var title = ourData[id]["title"];
                        console.log(title);
                        var bool = (title === search);
                        //var bool = txtValue.toUpperCase().indexOf(title.toUpperCase()) > -1;
                        console.log("Comparison: " + bool);
                        if(bool){
                            get_category(id);
                        } else {
                            //clueContainer.insertAdjacentHTML("beforeend", "Not found at id: " + (id+1) + "<br></br>");
                        } 
                    } else {
                        clueContainer.insertAdjacentHTML("beforeend", "Null entry: " + (id+1) + "<br></br>") 
                    }
                } //end for loop
            } // end safe onload check
        };
    ourRequest.send();
    });

// https://www.w3schools.com/howto/howto_js_filter_lists.asp
// Function to write gathered data out to HTML
function renderHTML(data){
    var htmlString = "<h1> Category: " + data["title"] + "</h1>";
    for (i = 0; i < data["clues"].length; i++){
        htmlString += "<p>" + data["clues"][i]["question"] + " " + data["clues"][i]["answer"] + "</p>";
    }
    clueContainer.insertAdjacentHTML("beforeend",htmlString);
}
function safe_onload(xhr){
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        console.log("safe_unload");
        return true;
    } else {
        console.log("unsafe_load");
        return false;
    }
}

function get_category(id){
    // if title matches, call the api link of that id
    var target = new XMLHttpRequest();
    target.open("GET", "http://jservice.io/api/category?id=" + (id + 1));
    target.onload = function() {
        if(safe_onload(target)){
            console.log("target reached");
            console.log(target.responseText);
            var target_print = JSON.parse(target.responseText);
            renderHTML(target_print);
        }
    };
    target.send();
}