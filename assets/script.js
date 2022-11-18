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

const submitForm = document.getElementById('form'); 
const cityInputEl = document.getElementById('input'); 
const submitBtn = document.getElementById('submit-btn'); 
const currentWeather = document.getElementById('current-weather'); 
const fiveDayContainer = document.getElementById('five-day'); 

/**
 * SUBMIT BUTTON HANDLER
 * @param {*} event is click of submit button
 * This function takes the input of the form (i.e. city name) and trims it to be used in the fetch.
 */ 

function formSubmitHandler(event) {
    event.preventDefault();
  
    var city = input.value.trim();
    
    if (city) {
      console.log(city); 
      getWeather(city);
  
      currentWeather.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a city.');
    }
};


/**
 * PREVIOUS SEARCH HANDLER
 * @param {*} event is click of previously searched cities
 * This function regenerates weather of previously searched cities upon click. 
 */ 

// function previousSearchHandler(event) {

// }



// WEATHER FETCH FROM OPEN WEATHER 

function getWeather() {
    let city = input.value.trim();
    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e7f71632b8912e6ddef5440e9fe5e5fe'; 

    fetch(requestURL)
        .then(function (response) {
            return response.json(); 
        })
        .then(function (data) {
            console.log(data); 
        });
};


// function saveCityLocalStorage(){

// }

// function renderPreviousSearches() {

// }

// function displayWeather() {

// }

submitForm.addEventListener('submit', formSubmitHandler); 
