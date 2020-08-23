// const domain = "https://lenghuang.github.io"
const domain = "https://lenhuang.me"


var clueContainer = document.getElementById("clue-info");

var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnOne").click();
    }
});

// MAIN EVENT LISTENERS
// Category button
btnOne.addEventListener("click", function(){
    clueContainer.innerHTML = "";
    var found = 0;
    var htmlString = "";
    var search = input.value;
    // Prevent case where 0 input is in everything
    if(search.length != 0){
        var compressed = new XMLHttpRequest();
        compressed.open("GET", domain + "/Capital_One_Data/comp.json");
        compressed.onload = function() { 
            // Search through compressed dataset
            if(safeLoad(compressed)){
                var compJson = JSON.parse(compressed.responseText);
                    for(var i = 0; i < compJson.length; i++){ //18418
                        if(compare(compJson[i]["title"], search)){
                            found++;
                            getCategory(compJson[i]["id"], htmlString);
                        }
                    } // End loop
                } // End onload safety check
                if(found == 0){
                    clueContainer.insertAdjacentHTML("beforeend", "<center> Not Found :( </center>");
                }
            }; // End onload of compressed
        compressed.send();
        }
    });
// Answer button
btnTwo.addEventListener("click", function(){
    clueContainer.innerHTML = "";
    var found = 0;
    var htmlString = "";
    var search = input.value;
    // Prevent case where 0 input is in everything
    if(search.length != 0){
        var compressed = new XMLHttpRequest();
        compressed.open("GET", domain + "/Capital_One_Data/answer.json");
        compressed.onload = function() { 
            // Search through compressed dataset
            if(safeLoad(compressed)){
                var compJson = JSON.parse(compressed.responseText);
                    for(var i = 0; i < compJson.length; i++){ //18418
                        if(compare(compJson[i]["answer"], search)){
                            found++;
                            getClue(compJson[i]["id"], compJson[i]["offset"], htmlString, "a");
                        }
                    } // End loop
                } // End onload safety check
                if(found == 0){
                    clueContainer.insertAdjacentHTML("beforeend", "<center> Not Found :( </center>");
                }
            }; // End onload of compressed
        compressed.send();
        } 
});
// Question button
btnThree.addEventListener("click", function(){
    clueContainer.innerHTML = "";
    var found = 0;
    var htmlString = "";
    var search = input.value;
    // Prevent case where 0 input is in everything
    if(search.length != 0){
        var compressed = new XMLHttpRequest();
        compressed.open("GET", domain + "/Capital_One_Data/question.json");
        compressed.onload = function() { 
            // Search through compressed dataset
            if(safeLoad(compressed)){
                var compJson = JSON.parse(compressed.responseText);
                    for(var i = 0; i < compJson.length; i++){ //18418
                        if(qcompare(compJson[i]["question"], search)){
                            found++;
                            getClue(compJson[i]["id"], compJson[i]["offset"], htmlString, "q");
                        }
                    } // End loop
                } // End onload safety check
                if(found == 0){
                    clueContainer.insertAdjacentHTML("beforeend", "<center> Not Found :( </center>");
                }
            }; // End onload of compressed
        compressed.send();
        } 
});
// Date button
btnFour.addEventListener("click", function(){
    clueContainer.innerHTML = "";
    var found = 0;
    var htmlString = "";
    var search = input.value;
    // Prevent case where 0 input is in everything
    if(search.length != 0){
        var compressed = new XMLHttpRequest();
        compressed.open("GET", domain + "/Capital_One_Data/dates.json");
        compressed.onload = function() { 
            // Search through compressed dataset
            if(safeLoad(compressed)){
                var compJson = JSON.parse(compressed.responseText);
                    for(var i = 0; i < compJson.length; i++){ //18418
                        if(dcompare(compJson[i]["airdate"], search)){
                            found++;
                            getClue(compJson[i]["id"], compJson[i]["offset"], htmlString, "d");
                        }
                    } // End loop
                } // End onload safety check
                if(found == 0){
                    clueContainer.insertAdjacentHTML("beforeend", "<center> Not Found :( </center>");
                }
            }; // End onload of compressed
        compressed.send();
        } 
});
// HELPER FUNCTIONS 
function safeLoad(xhr){
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        return true;
    } else {
        return false;
    }
}
function compare(title, search){
    var a = title.toUpperCase();
    var b = search.toUpperCase();
    return a.substr(0,b.length).includes(b); 
}
function qcompare(question, search){
    var a = question.toUpperCase();
    var b = search.toUpperCase();
    return a.includes(b); 
}
function dcompare(date, search){
    var month = search.substr(0,2);
    var day = search.substr(3,2);
    var year = search.substr(6,4);
    var a = date.substr(5,2);
    var b = date.substr(8,2);
    var c = date.substr(0,4);
    return (month == a && day == b && year == c);
}
function getDate(date){
    var year = date.substr(0,4);
    var month = date.substr(5,2);
    var day = date.substr(8,2);
    var sched = ["January ","February ","March ","April ","May ","June ","July ",
                 "August ","September ","October ","November ","December "];
    var format = sched[parseInt(month)-1] + day + ", " + year;
    return format;
}
function categoryHTML(data, htmlString){
    htmlString = "<br></br> <h2> Category: " + data["title"].toUpperCase() + "</h2>";
    for (i = 0; i < data["clues"].length; i++){
        htmlString += "<p> <b> Answer: </b> " + data["clues"][i]["answer"] + 
                      "<br/> <b> Question: </b>" + data["clues"][i]["question"] + 
                      "<br/> <b> Airdate: </b>" + getDate(data["clues"][i]["airdate"]) + "</p>";
    }
    clueContainer.insertAdjacentHTML("beforeend", htmlString);
}
function getCategory(id, htmlString){
    // if title matches, call the api link of that id
    var category = new XMLHttpRequest();
    category.open("GET", "http://jservice.io/api/category?id=" + id);
    category.onload = function() {
        if(safeLoad(category)){
            var category_print = JSON.parse(category.responseText);
            categoryHTML(category_print, htmlString);
        }
    };
    category.send();
}
function getClue(id, offset, htmlString, param){
    var cluePage= new XMLHttpRequest();
    cluePage.open("GET", "http://jservice.io/api/clues?offset=" + (offset));
    cluePage.onload = function() {
        if(safeLoad(cluePage)){
            var clues = JSON.parse(cluePage.responseText);
            if(param == "a"){
                for(var i = 0; i < clues.length; i++){
                    if(id == clues[i]["id"]){
                        answerHTML(clues[i], htmlString);
                    }
                }
            } else if(param == "q"){
                for(var i = 0; i < clues.length; i++){
                    if(id == clues[i]["id"]){
                        questionHTML(clues[i], htmlString);
                    }
                } 
            } else if(param == "d"){
                for(var i = 0; i < clues.length; i++){
                    if(id == clues[i]["id"]){
                        dateHTML(clues[i], htmlString);
                    }
                }
            }
        }
    };
    cluePage.send();
}
function answerHTML(data, htmlString){
    htmlString = "<br><br/> <h2> Answer: " + data["answer"].toUpperCase() + "</h2>";
    htmlString += "<p> <b> Category: </b> " + data["category"]["title"];
    htmlString += "<br/> <b> Question: </b>" + data["question"];
    htmlString += "<br/> <b> Airdate: </b>" + getDate(data["airdate"]) + "</p>";
    clueContainer.insertAdjacentHTML("beforeend", htmlString); 
}
function questionHTML(data, htmlString){
    htmlString = "<br><br/> <h2> Question: " + data["question"].toUpperCase() + "</h2>";
    htmlString += "<p> <b> Category: </b> " + data["category"]["title"];
    htmlString += "<br/> <b> Answer: </b>" + data["answer"];
    htmlString += "<br/> <b> Airdate: </b>" + getDate(data["airdate"]) + "</p>";
    clueContainer.insertAdjacentHTML("beforeend", htmlString); 
};
function dateHTML(data, htmlString){
    htmlString = "<br><br/> <h2> Date: " + getDate(data["airdate"]).toUpperCase() + "</h2>";
    htmlString += "<p> <b> Category: </b> " + data["category"]["title"];
    htmlString += "<br/> <b> Question: </b>" + data["question"];
    htmlString += "<br/> <b> Answer: </b>" + data["answer"] + "</p>";
    clueContainer.insertAdjacentHTML("beforeend", htmlString); 
};
