document.getElementById('search').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const APIkey = '1c86a55ad041297a64544ba7c3f2d094';
  
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => {
        if (!response.ok) {
          throw new Error('Location not found');
        }
        return response.json();
      })
      .then(data => {


        
        // Clear the existing forecast
        document.getElementById('forecast').innerHTML = '';
  
        // Group the forecast by date
        let forecasts = {};
        for (let i = 0; i < data.list.length; i++) {
        let date = data.list[i].dt_txt.split(' ')[0];
        let time = data.list[i].dt_txt.split(' ')[1];
        if (!forecasts[date] && time >= '12:00:00') {
            forecasts[date] = data.list[i];
        }
        }

            // Display the 5-day forecast
        let forecastDiv = document.getElementById('forecast');
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (let date in forecasts) {
        let dayForecast = document.createElement('div');
        dayForecast.className = 'weather-box active'; // Add the 'active' class

        // Get the day of the week
        let dayOfWeek = new Date(date).getDay();
        let dayName = days[dayOfWeek];

        dayForecast.innerHTML = `
            <div class="box">
            <div class="info-weather">
                <p class="day">${dayName}</p>
                <div class="weather">
                <img src="http://openweathermap.org/img/wn/${forecasts[date].weather[0].icon}@4x.png" alt="Weather icon">
                <p class="temperature">${parseInt(forecasts[date].main.temp)}<span>°C</span></p>
                <p class="description">${forecasts[date].weather[0].description}</p>
                </div>
            </div>
            </div>
        `;
        forecastDiv.appendChild(dayForecast);
        }
      })
      .catch(err => {
        console.error('There has been a problem with your fetch operation:', err);
        // Display the error message
        document.getElementById('forecast').innerHTML = '<div class="error">Location not found</div>';
      });
});