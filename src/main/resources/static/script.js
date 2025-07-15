function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    fetch(`http://localhost:8080/api/weather?city=${encodeURIComponent(city)}`)
        .then(res => {
            if (!res.ok) throw new Error("City not found or API error");
            return res.json();
        })
        .then(data => {
            document.getElementById("cityTitle").innerText = `Weather for ${data.name}`;
            document.getElementById("temperature").innerText = `${data.main.temp}°C`;
            document.getElementById("minTemp").innerText = `Min: ${data.main.temp_min}°C`;
            document.getElementById("maxTemp").innerText = `Max: ${data.main.temp_max}°C`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("windDegree").innerText = `Wind Degree: ${data.wind.deg}°`;
            document.getElementById("feelsLike").innerText = `Feels Like: ${data.main.feels_like}°C`;
            document.getElementById("windSpeed").innerText = `Speed: ${data.wind.speed} km/hr`;
            document.getElementById("sunrise").innerText = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
            document.getElementById("sunset").innerText = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
        })
        .catch(err => {
            alert("Unable to fetch weather data. Please check the city name or try again later.");
            console.error(err);
        });
}

function loadCommonCitiesWeather() {
    fetch(`http://localhost:8080/api/weather/common`)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch common cities weather");
            return res.json();
        })
        .then(dataList => {
            const table = document.getElementById("commonWeatherTable");
            table.innerHTML = ""; // Clear previous data
            dataList.forEach(data => {
                const row = `
                  <tr>
                    <td>${data.name}</td>
                    <td>${data.main.temp}°C</td>
                    <td>${data.main.feels_like}°C</td>
                    <td>${data.main.humidity}%</td>
                    <td>${data.main.temp_min}°C</td>
                    <td>${data.main.temp_max}°C</td>
                    <td>${data.wind.speed} km/hr</td>
                    <td>${data.wind.deg}°</td>
                  </tr>`;
                table.innerHTML += row;
            });
        })
        .catch(err => {
            console.error("Error loading common cities weather:", err);
            const table = document.getElementById("commonWeatherTable");
            table.innerHTML = "<tr><td colspan='8'>Failed to load common cities weather data.</td></tr>";
        });
}

// Load data on page load
window.onload = loadCommonCitiesWeather;
