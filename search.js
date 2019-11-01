// Link JS to button in html
var btn = document.getElementById("btn");
var clueContainer = document.getElementById("clue-info");
btn.addEventListener("click", function(){
    var search = document.getElementById("search");
    console.log(search.value);
    var ourRequest = new XMLHttpRequest();
     //for(var id = 1; id < 14279; id++){
        //console.log("For loop at id: " + 1);
        ourRequest.open("GET","http://jservice.io/api/category?id=" + 2);
        ourRequest.onload = function() { 
            var ourData = JSON.parse(ourRequest.responseText);
            console.log(search.textContent);
            console.log(search.innerText);
            var txtValue = (search.value.textContent || search.value.innerText);
            console.log("txtvalue is: " + txtValue);
            var bool = txtValue.toString().toUpperCase().indexOf(ourData["title"].toUpperCase()) > -1;
            console.log(bool);
            if(bool){
                renderHTML(ourData);
            } else {
                clueContainer.insertAdjacentHTML("beforeend", "Not Found");
            } 
         }; ourRequest.send();
    //};
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