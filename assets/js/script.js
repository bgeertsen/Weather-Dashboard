let today = moment().format("MMM Do YYYY");
console.log(today)
let searchCityInput = document.querySelector("#searchCity");
let searchStateInput = document.querySelector("#searchState");
let searchCountryInput = document.querySelector("#searchCountry");
let submitBtn = document.querySelector("#submit")
const apiKey = "ffe65789d16418b39e33722ce53e0bb8";

let lat = "";
let lon = "";
let currentName = "";


function getLatLon (city, state, country) {
    let geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`;

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
        currentName = data[0].name;
        lon = data[0].lon;
        lat = data[0].lat;
        console.log(city);
        console.log(`lat: ${lat}`)
        console.log(`long: ${lon}`)
        

        displayWeather();
    })
    .catch(function(error) {
        console.log(error);
    })
    }

    function displayWeather() {
        let cityName = document.querySelector("#city-title");
        

        let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

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
            // Current Weather conditions
            cityName.innerHTML = `City: ${currentName} (${today}) <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="alternatetext">`
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
            
            // 5 day forcast day 1
            let day1Date = data.daily[1].dt;
            document.querySelector("#day1").textContent = moment.unix(day1Date).format("dddd MMM Do");
            console.log(data.daily[1].weather[0].icon)
            document.querySelector("#day1Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png" alt="alternatetext"></img>`
            document.querySelector("#day1Info").innerHTML = `Temp: ${data.daily[1].temp.day}</br> Wind: ${data.daily[1].wind_speed} MPH</br> HUM: ${data.daily[1].humidity}%`
            
            // 5 day forcast day 2
            let day2Date = data.daily[2].dt;
            document.querySelector("#day2").textContent = moment.unix(day2Date).format("dddd MMM Do");
            document.querySelector("#day2Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png" alt="alternatetext"></img>`
            document.querySelector("#day2Info").innerHTML = `Temp: ${data.daily[2].temp.day}</br> Wind: ${data.daily[2].wind_speed} MPH</br> HUM: ${data.daily[2].humidity}%`
            
            // 5 day forcast day 3
            let day3Date = data.daily[3].dt;
            document.querySelector("#day3").textContent = moment.unix(day3Date).format("dddd MMM Do");
            document.querySelector("#day3Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png" alt="alternatetext"></img>`
            document.querySelector("#day3Info").innerHTML = `Temp: ${data.daily[3].temp.day}</br> Wind: ${data.daily[3].wind_speed} MPH</br> HUM: ${data.daily[3].humidity}%`
            
            //5 day forcast day 4
            let day4Date = data.daily[4].dt;
            document.querySelector("#day4").textContent = moment.unix(day4Date).format("dddd MMM Do");
            document.querySelector("#day4Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png" alt="alternatetext"></img>`
            document.querySelector("#day4Info").innerHTML = `Temp: ${data.daily[4].temp.day}</br> Wind: ${data.daily[4].wind_speed} MPH</br> HUM: ${data.daily[4].humidity}%`
            
            // 5 day forcast day 5
            let day5Date = data.daily[5].dt;
            document.querySelector("#day5").textContent = moment.unix(day5Date).format("dddd MMM Do");
            document.querySelector("#day5Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png" alt="alternatetext"></img>`
            document.querySelector("#day5Info").innerHTML = `Temp: ${data.daily[5].temp.day}</br> Wind: ${data.daily[5].wind_speed} MPH</br> HUM: ${data.daily[5].humidity}%`

        })
        .catch(function(error) {
            console.log(error)
        })
    }

let searchFormHandler = function(event) {
    event.preventDefault();
    let city = searchCityInput.value.trim();
    let state = searchStateInput.value.trim();
    let country = searchCountryInput.value.trim();
    getLatLon(city, state, country);

}

submitBtn.addEventListener("click", searchFormHandler)