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