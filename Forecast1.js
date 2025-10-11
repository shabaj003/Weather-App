async function loadWeeklyForecast() {
    const cityInput = document.getElementById("city");

    const params = new URLSearchParams(window.location.search);
    const city = cityInput.value.trim() || params.get("city") || "Mumbai";

    cityInput.value = city;

    const apiKey = "2175c3973832476a8c3121225251609"; 
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=yes&alerts=yes`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            document.getElementById("forecast").innerHTML = "❌ Forecast not found!";
        } else {
            let forecastHTML = `<h2>Weeks Forecast for ${data.location.name}, ${data.location.country}</h2>
                                <div class="forecast-container">`;

            data.forecast.forecastday.forEach(day => {
                forecastHTML += `
                    <div class="forecast-day">
                        <h4>${day.date}</h4>
                        <img src="https:${day.day.condition.icon}" alt="Weather icon">
                        <p>${day.day.condition.text}</p>
                        <p>🌡️ Max: ${day.day.maxtemp_c}°C / Min: ${day.day.mintemp_c}°C</p>
                        <p>💧 Humidity: ${day.day.avghumidity}%</p>
                    </div>
                `;
            });

            forecastHTML += `</div>`;
            document.getElementById("forecast").innerHTML = forecastHTML;
        }
    } catch (error) {
        document.getElementById("forecast").innerHTML = "⚠️ Error loading forecast.";
        console.error(error);
    }
}

window.onload = loadWeeklyForecast;
