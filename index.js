function renderDate(){
    var today = moment().format('MM-DD-YYYY')
   $('#current-day').append(today); 
}
renderDate();

let city="";
let url="";
let APIkey="";
let queryurl="";
let currenturl="";
let citiesDiv= document.getElementById("searched-cities-container");
let cities= [];

listClicker();
searchClicker();
pullCities();
function pullCities() {
    let savedCities= JSON.parse(localStorage.getItem("cities"));
        if (savedCities !==null) {
            cities=savedCities
        }
        renderButtons();
}

function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));

}
//render buttons for each element
function  renderButtons() {
    citiesDiv.innerHTML = "";
    if(cities== null) {
        return;
    }

    let uniqueCities= [...new Set(cities)];
    for(let i=0; i< uniqueCities.length; i++) {
        let cityName = uniqueCities[i];

        let buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");
        citiesDiv.appendChild(buttonEl);
        listClicker();
    }
}

function listClicker() {
    $(".listbtn").on("click",function(event) {
        console.log("hello?")
        city = $(this).text().trim();
        APIcalls();
    })
}
function searchClicker() {
    $("#searchbtn").on ("click", function(event) {
        event.preventDefault();
        city = $(this).prev().val().trim()

        cities.push(city);
        if (cities.length > 8) {
            cities.shift()
        }
        if (city =="") {
            return;
        }
        APIcalls();
        storeCities();
        renderButtons();
    })
}