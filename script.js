const apiKey = "1be53a310d2eb4d422cdbd4a7e4db3e1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const loadingDiv = document.querySelector(".loading");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
  try {
    loadingDiv.style.display = "block";
    errorDiv.style.display = "none";
    weatherDiv.style.display = "none";

    const response = await fetch(apiUrl + city.trim() + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".feels_like").textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

    // Dynamically set weather icon using OpenWeatherMap's icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    weatherDiv.style.display = "block";
  } catch (error) {
    console.error(error);
    errorDiv.style.display = "block";
  } finally {
    loadingDiv.style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value;
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a location.");
  }
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});
