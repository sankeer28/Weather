const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBoX = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.water-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', () => {
    const APIkey = '1c86a55ad041297a64544ba7c3f2d094';
    const city = document.querySelector('.search-box input').value;

    if (city == "")
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response => response.json()).then(json => {

        if (json.cod == '404') {
            container.style.height = '400px';
            weatherBoX.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        

        container.style.height = '555px';
        weatherBoX.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature')
        const description = document.querySelector('.weather-box .description')
        const humidity = document.querySelector('.water-details .humidity span')
        const wind = document.querySelector('.water-details .wind span')

        // Get the main weather condition from the API response
let weatherDescription = json.weather[0].main;

switch (weatherDescription) {
  case 'Clear':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Clouds':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Rain':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1511634829096-045a111727eb?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Drizzle':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1541919329513-35f7af297129?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Mist':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1580193483760-d0ef2abaa348?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Thunderstorm':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Snow':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;
  case 'Fog':
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506452305024-9d3f02d1c9b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
    break;

  default:
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1682685797828-d3b2561deef4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
}

         // Get the icon code from the API response
        const iconCode = json.weather[0].icon;

        // Construct the URL for the icon
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

        // Set the image source to the icon URL
        image.src = iconUrl;

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    })
})

document.querySelector('.search-box input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      // Trigger search
      search.click();
    }
  });