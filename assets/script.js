// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// 1. Need to fetch weather information from API
//      Input the correct information for weather right now into one card
// 2: Fetch 5 day forecast from API
//      Dynamically append those into a separate element

const cityInputEl = document.getElementById('city-input'); 
const submitBtn = document.getElementById('submit-btn'); 
const currentWeather = document.getElementById('current-weather'); 
const fiveDayContainer = document.getElementById('five-day'); 


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var city = cityInputEl.value.trim();
  
    if (city) {
      getWeather(city);
  
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a city.');
    }
  };

function getWeather () {
    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'; 

    fetch(requestURL)
        .then(function (response) {
            return response.json(); 
        })
        .then(function (data) {
            console.log(data); 
        }
    
}

submitBtn.addEventListener('submit', getWeather); 