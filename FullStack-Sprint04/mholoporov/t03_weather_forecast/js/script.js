const apiKey = '156aaab7ecc747c09b6716655a9100a4'; // key
const city = 'Mannheim'; // city
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function fetchWeather() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const forecastContainer = document.getElementById('weather-forecast');
    forecastContainer.innerHTML = '';

    const forecastList = data.list.filter((item, index) => index % 8 === 0); // Get daily forecast (every 8th item)

    forecastList.forEach(day => {
        const date = new Date(day.dt * 1000);
        const formattedDate = formatDate(date);
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const description = day.weather[0].description;

        const weatherDay = document.createElement('div');
        weatherDay.classList.add('weather-day');

        weatherDay.innerHTML = `
            <h3>${formattedDate}</h3>
            <p>Temperature: ${temp}°C</p>
            <p>Description: ${description}</p>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
        `;

        forecastContainer.appendChild(weatherDay);
    });
}

function formatDate(date) {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

fetchWeather();