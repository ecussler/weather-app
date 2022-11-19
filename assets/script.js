// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history DONE
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed DONE
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



// CURRENT WEATHER FETCH FROM OPEN WEATHER 

function getWeather() {
    let city = input.value.trim();
    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e7f71632b8912e6ddef5440e9fe5e5fe&units=imperial'; 

    fetch(requestURL)
        .then(function (response) {
            if (response.ok) {
                return response.json(); 
            }
        })
        .then(function (data) {
            displayWeather(data, city); 
            saveCityLocalStorage(city);  
        });
};


// 5-DAY FORECAST FETCH FROM OPEN WEATHER

function getFiveDay() {
    let city = input.value.trim();
    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e7f71632b8912e6ddef5440e9fe5e5fe&units=imperial'; 

    fetch(requestURL)
        .then(function (response) {
            if (response.ok) {
                return response.json(); 
            }
        })
        .then(function (data) {
            displayWeather(data, city); 
            saveCityLocalStorage(city);  
        });
};

/**
 * FUNCTION TO SAVE USER INPUT INTO LOCAL STORAGE
 * @param {*} city refers to user city input
 */

function saveCityLocalStorage(city){
    let recentCites = localStorage.getItem('recentSearches'); 
    console.log(recentCites); 
    console.log(typeof recentCites); 
    if (recentCites) {
        recentCites = JSON.parse(recentCites); 
        recentCites.push(city); 
        recentCites = JSON.stringify(recentCites); 
        localStorage.setItem('recentSearches', recentCites); 
    } else {
        recentCites = JSON.stringify([city]); 
        localStorage.setItem('recentSearches', recentCites);
    }
}

// function renderPreviousSearches() {

// }

/**
 * FUNCTION TO DISPLAY WEATHER IN DOM
 * @param {*} weatherData refers to the fetched data from the Open Weather API
 * @param {*} city refers to the user city input
 * @returns 
 */

function displayWeather(weatherData, city) {
    if (weatherData.length === 0) {
        currentWeather.textContent = "No weather for that city was found"; 
        return; 
    }

    const jumbotron = document.createElement('div'); 
    const container = document.createElement('div'); 
    const h1 = document.createElement('h1'); 
    const temp = document.createElement('p'); 
    const humidity = document.createElement('p'); 
    const windSpeed = document.createElement('p'); 
    const iconEl = document.createElement('img'); 
    let iconURL = 'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png'
    const milliseconds = weatherData.dt * 1000; 
    const dateObj = new Date(milliseconds); 
    const standardDateForm = dateObj.toLocaleString()

    // Dynamically adds containers and elements to display information
    jumbotron.setAttribute('class', 'p-5 mb-4 bg-light rounded-3');
    container.setAttribute('class', 'container-fluid py-5');
    h1.setAttribute('class', 'display-5 fw-bold fs-3 text');
    temp.setAttribute('class', 'col-md-8 fs-5');
    humidity.setAttribute('class', 'col-md-8 fs-5');
    windSpeed.setAttribute('class', 'col-md-8 fs-5');
    iconEl.setAttribute('src', iconURL); 
    
    
    h1.textContent = `Weather in ${city} as of ${standardDateForm}`; 
    temp.textContent = `Temperature is ${weatherData.main.temp}°F`; 
    humidity.textContent = `Humidity is ${weatherData.main.humidity}%`; 
    windSpeed.textContent = `Wind speed is ${weatherData.wind.speed}mph`; 
    
    // Appends elements into DOM
    h1.append(iconEl); 
    container.append(h1, temp, humidity, windSpeed); 
    jumbotron.append(container); 
    currentWeather.append(jumbotron); 

}

submitForm.addEventListener('submit', formSubmitHandler); 
