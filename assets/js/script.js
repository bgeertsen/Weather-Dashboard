let searchInput = document.querySelector("#search");
let submitBtn = document.querySelector("#submit")
const apiKey = "ffe65789d16418b39e33722ce53e0bb8";


function getLatLon (city) {
    let geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(geocodeUrl)
    .then(function(response) {
        if (response.ok) {
            console.log(response.json())
        }
    })
 
  
}

let searchFormHandler = function(event) {
    event.preventDefault();
    searchCity = searchInput.value.trim();
    getLatLon(searchCity);
}

submitBtn.addEventListener("click", searchFormHandler)