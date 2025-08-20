let cityInput = document.getElementById("city-input");
let getWeatherBtn = document.getElementById("get-weather-btn");
let weatherResult = document.getElementById("weather-result");

getWeatherBtn.addEventListener("click", function() {
    console.log("Кнопка нажата!");
    let cityName = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=ru`;
    fetch(apiUrl)
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    const cityNameFromResponse = data.name;
    const temperature = Math.round(data.main.temp);
    const weatherDescription = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const weatherHTML = `
    <div class="weather-card">
    <h2>${cityNameFromResponse}</h2>
    <img src="${iconUrl}" alt="${weatherDescription}">
    <div class="temp">${temperature}°C</div>
    <p>${weatherDescription}</p>
    </div>
    `;

    cityInput.value = "";
    weatherResult.innerHTML = weatherHTML;

  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
});
