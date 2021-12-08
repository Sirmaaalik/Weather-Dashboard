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

// 2 API calls 1 for current conditions and 1 for 5 day forecast
function APIcalls() {
    url= "https://api.openweathermap.org/data/2.5/forecast?q=";
    currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";

APIkey="&appid=8b668a5ffbcbc6cece2c6f9eb9ed67bf";
queryurl = url + city + APIkey;
currentWeatherUrl= currenturl + city + APIkey;

$("#city-name").text(`${city}`);

// 5 Day Display
$.ajax({
    url: queryurl,
    method: "GET",
}).then (function(response) {
    let dayNumber = 0;
    for(let i=0; i < response.list.length; i++) {
        if( response.list[i].dt_txt.split(" ")[1]== "12:00:00") {
            $("#" + dayNumber + "five-day-temp").text("Temperature: "+ Math.round((response.list[i].main.temp-273.15)*9/5 +32)+"F");
            $("#" + dayNumber + "five-day-humidity").text("Humidity: "+ response.list[i].main.humidity + "%");
            $("#" + dayNumber + "five-day-icon").attr("src", "http://openweathermap.org/img/w/"+response.list[i].weather[0].icon+".png");
            console.log(response.list[i].dt_txt.split("-"));
            console.log(dayNumber);
            console.log(response.list[i].main.temp);
            dayNumber++;
        }
    }
});

//Display Data in Main Div
$.ajax( {
    url: currentWeatherUrl,
    method: "GET",

}).then(function(current_data) {
        console.log(current_data);
        let temp = Math.round(((current_data.main.temp-273.15)*9/5 +32))
        console.log("The Temperature in " +city+ " is: " + temp);
        $("#today-temp").text("Temperature: " + temp + String.fromCharCode(176)+"F");
        $("#today-humidity").text("Humidity: "+ current_data.main.humidity);
        $("#today-wind").text(" Wind Speed:"+ current_data.wind.speed);
        $("today-uv-index").text("UV index:"+ current_data.uvI);
        $("#today-icon-div").attr({"src": "http://openweathermap.org/img/w/"+ current_data.weather[0].icon+ ".png",
    "height":"100px", "width": "100px"});
    })
}