let today = moment().format("MMM Do YYYY");

let searchCityInput = document.querySelector("#searchCity");
let searchStateInput = document.querySelector("#searchState");
let searchCountryInput = document.querySelector("#searchCountry");
let submitBtn = document.querySelector("#submit")
let historyDiv = document.querySelector("#search-history")
const apiKey = "ffe65789d16418b39e33722ce53e0bb8";

let lat = "";
let lon = "";
let currentName = "";
let weatherApiUrl = "";


function getLatLon (city, state, country) {
    let geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&appid=${apiKey}`;

    fetch(geocodeUrl)
    .then(function(response) {
        if (!response.ok) {
            console.log(response.json())
            alert("failed to fetch weather data")
        }
        return response.json();
    })
    .then(function(data) {
        currentName = data[0].name;
        lon = data[0].lon;
        lat = data[0].lat;
        

        displayWeather();
    })
    .catch(function(error) {
        console.log(error);
    })
    }

    function displayWeather() {
        let cityName = document.querySelector("#city-title");
        

        weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

        fetch(weatherApiUrl)
        .then(function(response){
            if(!response.ok) {
                console.log(response.json())
                alert("failed to fetch weather data")
            }
            return response.json();
        })
        .then(function(data) {
            // console.log(weatherApiUrl)
            // Current Weather conditions
            cityName.innerHTML = `City: ${currentName} (${today}) <img src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png" alt="weather icon">`
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
            document.querySelector("#day1Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png" alt="weather icon"></img>`
            document.querySelector("#day1Info").innerHTML = `Temp: ${data.daily[1].temp.day}</br> Wind: ${data.daily[1].wind_speed} MPH</br> HUM: ${data.daily[1].humidity}%`
            
            // 5 day forcast day 2
            let day2Date = data.daily[2].dt;
            document.querySelector("#day2").textContent = moment.unix(day2Date).format("dddd MMM Do");
            document.querySelector("#day2Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png" alt="weather icon"></img>`
            document.querySelector("#day2Info").innerHTML = `Temp: ${data.daily[2].temp.day}</br> Wind: ${data.daily[2].wind_speed} MPH</br> HUM: ${data.daily[2].humidity}%`
            
            // 5 day forcast day 3
            let day3Date = data.daily[3].dt;
            document.querySelector("#day3").textContent = moment.unix(day3Date).format("dddd MMM Do");
            document.querySelector("#day3Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png" alt="weather icon"></img>`
            document.querySelector("#day3Info").innerHTML = `Temp: ${data.daily[3].temp.day}</br> Wind: ${data.daily[3].wind_speed} MPH</br> HUM: ${data.daily[3].humidity}%`
            
            //5 day forcast day 4
            let day4Date = data.daily[4].dt;
            document.querySelector("#day4").textContent = moment.unix(day4Date).format("dddd MMM Do");
            document.querySelector("#day4Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}@2x.png" alt="weather icon"></img>`
            document.querySelector("#day4Info").innerHTML = `Temp: ${data.daily[4].temp.day}</br> Wind: ${data.daily[4].wind_speed} MPH</br> HUM: ${data.daily[4].humidity}%`
            
            // 5 day forcast day 5
            let day5Date = data.daily[5].dt;
            document.querySelector("#day5").textContent = moment.unix(day5Date).format("dddd MMM Do");
            document.querySelector("#day5Icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}@2x.png" alt="weather icon"></img>`
            document.querySelector("#day5Info").innerHTML = `Temp: ${data.daily[5].temp.day}</br> Wind: ${data.daily[5].wind_speed} MPH</br> HUM: ${data.daily[5].humidity}%`

            return weatherApiUrl;

        })
        .catch(function(error) {
            console.log(error)
        })
    }
const searchHistory =function() {
    searchInfo = [searchCityInput.value, searchStateInput.value, searchCountryInput.value]
    console.log(searchCityInput.value, searchStateInput.value, searchCountryInput.value)

    localStorage.setItem(searchCityInput.value, JSON.stringify(searchInfo));
}

function loadHistory() {
    let keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
        console.log(keys[i])
        let historyBtn = document.createElement("button");
        historyBtn.classList.add("btn", "btn-secondary", "col-12", "my-1");
        historyBtn.id = `historyBtn${i}`
        historyBtn.textContent = keys[i];
        historyBtn.addEventListener("click", historyBtnHandler)
        historyDiv.appendChild(historyBtn);

    }    
}

function historyBtnHandler(event) {
    let key = JSON.parse(localStorage.getItem(event.target.innerHTML))

    let savedCity = key[0];
    let savedState = key[1];
    let savedCountry = key[2];
    getLatLon(savedCity, savedState, savedCountry)
}

function addBtn() {
    let historyBtn = document.createElement("button");
    historyBtn.classList.add("btn", "btn-secondary", "col-12", "my-1");

    historyBtn.textContent = searchCityInput.value;
    historyBtn.addEventListener("click", historyBtnHandler)
    historyDiv.appendChild(historyBtn);

    searchCityInput.value = "";
    searchStateInput.value = "";
    searchCountryInput.value = "";
  

}

let searchFormHandler = function(event) {
    event.preventDefault();
    let city = searchCityInput.value.trim();
    let state = searchStateInput.value.trim();
    let country = searchCountryInput.value.trim();
    getLatLon(city, state, country);
    searchHistory();
    addBtn();
    
    

}

loadHistory();

submitBtn.addEventListener("click", searchFormHandler)