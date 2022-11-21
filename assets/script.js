const submitForm = document.getElementById('form'); 
const cityInputEl = document.getElementById('input'); 
const submitBtn = document.getElementById('submit-btn'); 
const previousSearches = document.getElementById('previous-searches'); 
const currentWeather = document.getElementById('current-weather'); 
const fiveDayContainer = document.getElementById('five-day'); 
const previousSearchBtns = document.getElementsByClassName('btn-info'); 


/**
 * SUBMIT BUTTON HANDLER
 * @param {*} event is click of submit button
 * This function takes the input of the form (i.e. city name) and trims it to be used in the fetch.
 */ 

function formSubmitHandler(event) {
    event.preventDefault();
  
    let city = input.value.trim();
    
    if (city) {
      getWeather(city);
      getFiveDay(city); 

      // Clears the previous information form HTML
      currentWeather.textContent = '';
      fiveDayContainer.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a city.');
    }
};



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
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=e7f71632b8912e6ddef5440e9fe5e5fe&units=imperial&per_page=5'; 

    fetch(requestURL)
        .then(function (response) {
            if (response.ok) {
                return response.json(); 
            }
        })
        .then(function (data) {
            displayFiveDay(data, city);  
        });
};



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

    // Dynamically adds containers and elements to display information for current conditions
    jumbotron.setAttribute('class', 'p-5 mb-4 bg-light rounded-3');
    container.setAttribute('class', 'container-fluid py-5');
    h1.setAttribute('class', 'display-5 fw-bold fs-3 text');
    temp.setAttribute('class', 'col-md-8 fs-5');
    humidity.setAttribute('class', 'col-md-8 fs-5');
    windSpeed.setAttribute('class', 'col-md-8 fs-5');
    iconEl.setAttribute('src', iconURL); 
    
    // Sets content for current weather conditions
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


/**
 * FUNCTION TO DISPLAY FIVE DAY FORECAST IN DOM
 * @param {*} fiveDayData refers to the fetched data from the Open Weather API
 * @param {*} city refers to the user city input
 * @returns 
 * I had some trouble with getting the API to display the five day weather forecast rather than the upcoming five hour. 
 * Because of this, I also had some issues getting the icon to display correctly. 
 */

function displayFiveDay(fiveDayData, city) {
    if (fiveDayData.length === 0) {
        currentWeather.textContent = "No five-day forecast for that city was found"; 
        return; 
    }

    const fiveDayRow = document.createElement('div'); 
    fiveDayRow.setAttribute('class', 'row g-4 py-5 row-cols-1 row-cols-sm-5');

    // Created a secondary function to loop through the five day details without adding rows each time. 
    function displayFiveDayDetails (data) {
        for (let i = 0; i < 5; i++) {
            const column = document.createElement('div')
            const contentBox = document.createElement('div'); 
            // const iconEl = document.createElement('img'); 
            // let iconURL = 'http://openweathermap.org/img/w/' + fiveDayData.list[i].weather[i].icon + '.png'
            const date = document.createElement('h3'); 
            const temp = document.createElement('p'); 
            const humidity = document.createElement('p'); 
            const windSpeed = document.createElement('p');
            // Need to find icon
            const dateFormatted = data.list[i].dt_txt; 
            
            // Dynamically adds containers and elements to display information for five-day conditions
            column.setAttribute('class', 'col d-flex align-items-center');
            contentBox.setAttribute('class', 'icon-square text-bg-light d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3')
            // iconEl.setAttribute('src', iconURL); 
            date.setAttribute('class', 'fs-4 px-4 py-5');
            temp.setAttribute('class', 'col-sm-2 fs-6 px-4 py-5');
            humidity.setAttribute('class', 'col-sm-2 fs-6 px-4 py-5');
            windSpeed.setAttribute('class', 'col-sm-2 fs-6 px-4 py-5');

            // Sets content for current weather conditions
            date.textContent = `${dateFormatted}`; 
            temp.textContent = `Temperature will be ${data.list[i].main.temp}°F`; 
            humidity.textContent = `Humidity is ${data.list[i].main.humidity}%`; 
            windSpeed.textContent = `Wind speed is ${data.list[i].wind.speed}mph`;

            // Appends elements into DOM
            contentBox.append(date, temp, humidity, windSpeed); 
            column.append(contentBox); 
            fiveDayContainer.append(column); 
        }
    }

    displayFiveDayDetails(fiveDayData);

}


/**
 * FUNCTION TO SAVE USER INPUT INTO LOCAL STORAGE
 * @param {*} city refers to user city input
 */

 function saveCityLocalStorage(city){
    let recentCities = localStorage.getItem('recentSearches'); 
    if (recentCities) {
        recentCities = JSON.parse(recentCities); 
        recentCities.push(city); 
        recentCities = JSON.stringify(recentCities); 
        localStorage.setItem('recentSearches', recentCities); 
    } else {
        recentCities = JSON.stringify([city]); 
        localStorage.setItem('recentSearches', recentCities);
    }
}


// FUNCTION RENDERS PREVIOUSLY SEARCHED CITIES
function renderPreviousSearches() {
    let recentCities = localStorage.getItem('recentSearches'); 

    if (recentCities) {
        let recentArray = JSON.parse(recentCities); 

        for (let i = 0; i < 5; i++) {
            let city = recentArray[i]; 

            const btn = document.createElement('button'); 
            btn.setAttribute('class', 'btn btn-info my-1 mx-2'); 
            btn.textContent = `${city}`; 
            previousSearches.append(btn); 

            // This event regenerates weather of previously searched cities upon click. 

            btn.addEventListener('click', function(event) {
                event.preventDefault; 

                if (city) {
                    // Request for current weather
                    let requestURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=e7f71632b8912e6ddef5440e9fe5e5fe&units=imperial'; 
                
                    fetch(requestURL)
                        .then(function (response) {
                            if (response.ok) {
                                return response.json(); 
                            }
                        })
                        .then(function (data) {
                            displayWeather(data, city); 
                        });

                    // Request for five day
                    let fiveDayURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=e7f71632b8912e6ddef5440e9fe5e5fe&units=imperial&per_page=5'; 

                    fetch(fiveDayURL)
                        .then(function (response) {
                            if (response.ok) {
                                return response.json(); 
                            }
                        })
                        .then(function (data) {
                            displayFiveDay(data, city);  
                        }); 
                }
            })
        }
    } else {
        previousSearches.textContent = `No previous searches`; 
    }

    
}


renderPreviousSearches(); 
submitForm.addEventListener('submit', formSubmitHandler);
