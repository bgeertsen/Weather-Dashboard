let today = moment().format("MMM Do YYYY");
console.log(today)
let searchInput = document.querySelector("#search");
let submitBtn = document.querySelector("#submit")
const apiKey = "ffe65789d16418b39e33722ce53e0bb8";

let cityLat = "";
let cityLon = "";


function getLatLon (city) {
    let geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey;

    fetch(geocodeUrl)
    .then(function(response) {
        if (!response.ok) {
            console.log(response.json())
            alert("failed to fetch weather data")
        }
        return response.json();
    })
    .then(function(data) {
        console.log(data[0])
        cityLon = data[0].lon;
        cityLat = data[0].lat;
        console.log(city);
        console.log(`lat: ${cityLat}`)
        console.log(`long: ${cityLon}`)
        

        displayWeather();
    })
    .catch(function(error) {
        console.log(error);
    })
    }

    function displayWeather() {
        let cityName = document.querySelector("#city-title");
        

        let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${apiKey}`

        fetch(weatherApiUrl)
        .then(function(response){
            if(!response.ok) {
                console.log(response.json())
                alert("failed to fetch weather data")
            }
            return response.json();
        })
        .then(function(data) {
            console.log(weatherApiUrl)
            cityName.innerHTML = `City: ${searchInput.value} (${today}) <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="alternatetext">`
            document.querySelector("#currentTemp").textContent = `Temp: ${data.current.temp}`
            document.querySelector("#currentWind").textContent = `Wind: ${data.current.wind_speed} MPH`
            document.querySelector("#currnetHumidity").textContent = `Humidity: ${data.current.humidity}%`
            let uvIndex = data.current.uvi
            if (uvIndex <= 2) {
                document.querySelector("#currentUV").innerHTML = `UV Index: <span class="low">${uvIndex}</span>`
            } else if (uvIndex <= 5) {
                document.querySelector("#currentUV").innerHTML = `UV Index: <span class="moderate">${uvIndex}</span>`
            } else {
                document.querySelector("#currentUV").innerHTML = `UV Index: <span class="high">${uvIndex}</span>`
            }
            

        })
        .catch(function(error) {
            console.log(error)
        })
    }

let searchFormHandler = function(event) {
    event.preventDefault();
    searchCity = searchInput.value.trim();
    getLatLon(searchCity);

}

submitBtn.addEventListener("click", searchFormHandler)