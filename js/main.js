const APIKey = "";
const unsplashAPIKey = ""

const form = document.querySelector('#weatherSearchForm')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let city_name = document.querySelector('#city_name')
    let zip_code = document.querySelector('#zip_code')
})

const getData = async (city_name, zip_code) => {
    if (city_name) {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIKey}&units=imperial`)
        console.log(response.data)
        return response.data
    } else if (zip_code) {
        let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${APIKey}&units=imperial`)
        console.log(response.data)
        return response.data
    }
}

const loadData = async() => {
    clearData()
    const weather = await getData(city_name.value, zip_code.value)
    createList(weather.id, weather.name, weather.main.temp, weather.main.temp_max, weather.main.temp_min, weather.weather[0].description, weather.main.humidity)
}

const DOM_Elements = {
    weather_list: '.weather-list',
    weather_image: '.weather-image'
}

const createList = (id, city, current, high, low, forecast, humidity) => {
    const html = `<div class="card" id="${id}>
        <ul class="list-group list-group-flush">
        <li class="list-group-item"><h2>${city} ${Math.floor(current)}°F</h2></li>
        <li class="list-group-item"><b>High:</b> ${Math.floor(high)}°F // <b>Low:</b> ${Math.floor(low)}°F</li>
        <li class="list-group-item"><b>Forecast:</b> ${forecast}</li>
        <li class="list-group-item"><b>Humidity:</b> ${humidity}%</li>
        </ul>
    </div>
    <br>`

    document.querySelector(DOM_Elements.weather_list).insertAdjacentHTML('beforeend', html)
}

const clearData = () => {
    document.querySelector(DOM_Elements.weather_list).innerHTML="";
    document.querySelector(DOM_Elements.weather_image).innerHTML="";
}

const getImg = async (city) => {
    const response = await axios.get(`https://api.unsplash.com/photos/random?query=${city}-skyline&orientation=landscape&client_id=${unsplashAPIKey}`)
    return response.data
  }

  const loadImg = async () => {
    const img = await getImg(city_name.value)
    let img_url = img.urls.regular
    let img_alt = img.alt_description
    const img_html = `<br><img src=${img_url} alt=${img_alt} class="weather-image img-fluid">`

    document.querySelector(DOM_Elements.weather_image).insertAdjacentHTML('beforeend', img_html)
  }