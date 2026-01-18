
async function getWeather() {
    const city = document.getElementById("city").value.trim();
    const apiKey = "2175c3973832476a8c3121225251609"; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weather").innerHTML = "❌ City not found!";
        } else {
            document.getElementById("weather").innerHTML = `
                <h3>${data.location.name}, ${data.location.country}</h3>
                <p>🌡️ Temp: ${data.current.temp_c} °C</p>
                <p>☁️ Weather: ${data.current.condition.text}</p>
                <img src="https:${data.current.condition.icon}" alt="Weather icon">
                <p>💨 Wind: ${data.current.wind_kph} kph</p>
                <p>💧 Humidity: ${data.current.humidity}%</p>
                <br>
                <a href="Forecast1.html?city=${encodeURIComponent(city)}" class="forecast-link">
                  🔎 See 3 Days Forecast
                </a>
            `;
        }
    } catch (error) {
        document.getElementById("weather").innerHTML = "⚠️ Error fetching data.";
        console.error(error);
    }
}
