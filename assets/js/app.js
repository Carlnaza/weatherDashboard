let date = moment().format('YYYY-MM-DD')
let cityHistory = JSON.parse(localStorage.getItem('city-history')) || []

const renderCitySidebar = _ => {
  cityHistory.push({
    city: document.getElementById('search-bar').value
  })
  document.getElementById('city-history').innerHTML = ' '
  for (let i = 0; i < cityHistory.length; i++) {
    let cityHistorySidebar = document.createElement('div')
    cityHistorySidebar.className = 'city-history-sb'
    cityHistorySidebar.innerHTML = `
    <a href="#" class="list-group-item list-group-item-action">${cityHistory[i].city}</a>
    `
    document.getElementById('city-history').append(cityHistorySidebar)
  }
}

document.getElementById('search-btn').addEventListener('click', event => {
  event.preventDefault()

  fetch(`http://api.weatherapi.com/v1/forecast.json?key=1494b6e914a84eb4aeb215103200502&q=${document.getElementById('search-bar').value}&days=5`)
  .then(r => r.json())
  .then(weather => {
    // City Weather Details
    document.getElementById('current-city-weather').innerHTML = ' '
    let cityWeather = document.createElement('div')
    cityWeather.className = ''
    cityWeather.id = ''
    cityWeather.innerHTML = `
    <h1 class="font-weight-bold">${weather.location.name} - ${weather.location.localtime}</h1>
    <p>Temparature: ${weather.current.temp_f}°</p>
    <p>Humidity: ${weather.current.humidity}</p>
    <p>Wind Speed: ${weather.current.wind_mph}</p>
    <p>UV Index: ${weather.current.uv}</p>
    `
    document.getElementById('current-city-weather').append(cityWeather)

  // Weather Cards
    document.getElementById('weather-cards').innerHTML = ' '
    for (let i = 0; i < weather.forecast.forecastday.length; i++) {
      let weatherCard = document.createElement('div')
      weatherCard.className = 'weather-cards col-lg-2 col-md-2 col-sm-6'
      weatherCard.id = 'weather-cards-rendered'
      weatherCard.innerHTML = `
      <div class="card">
      <div class="card-header">
        ${weather.forecast.forecastday[i].date}
      </div>
      <div class="card-body">
        <p>${weather.forecast.forecastday[i].day.condition.text}</p>
        <p><img src="https:${weather.forecast.forecastday[i].day.condition.icon}" height:"64" width:"64"></p>
        <p>Temp: ${weather.forecast.forecastday[i].day.maxtemp_f}°</p>
        <p>Humidity: ${weather.forecast.forecastday[i].day.avghumidity}</p>
      </div>
    </div>
      `
      localStorage.setItem('city', `${cityHistory}`)
      document.getElementById('weather-cards').append(weatherCard)
    }
  })
  .catch(e => console.error(e))
  renderCitySidebar()
})
renderCitySidebar()
