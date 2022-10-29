
const temp = document.getElementById('temp');
const cityName = document.getElementById('cityName');
const article = document.getElementById('article');
const weatherDescription = document.getElementById('weatherDescription');
const lat = document.getElementById('latitude');
const lon = document.getElementById('longitude');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');
const weatherIcon = document.getElementById('icon');
const inputElement = document.querySelector('input');
const weatherForm = document.querySelector('form');
const feelsLike = document.getElementById('feels-like');
const windSpeed = document.getElementById('speed');
const tempMax = document.getElementById('temp-max');
const tempMin = document.getElementById('temp-min');

const content = document.querySelector('.content');
const container1 = document.getElementsByClassName('container1');
const container2 = document.getElementsByClassName('container2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Testing');
    const place = inputElement.value;
    console.log(place);

    fetch(`http://localhost:3000/currentWeather?location=${place}`).then((response) => {
    console.log(response)
    response.json().then((data) => {
        console.log(data);
        if(data.error) {
           return response.send({
            error
           })
        } else {
            temp.textContent = data.temp;
            cityName.textContent = data.cityName;
            article.textContent = data.article;
            weatherDescription.textContent = data.weatherDescription;
            lat.textContent = data.lat;
            lon.textContent = data.lon;
            pressure.textContent = data.pressure;
            humidity.textContent = data.humidity;
            feelsLike.textContent = data.feels_like;
            windSpeed.textContent = data.speed;
            tempMax.textContent = data.temp_max;
            tempMin.textContent = data.temp_min;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${encodeURIComponent(data.icon)}@2x.png`);
            // console.log(`http://openweathermap.org/img/wn/{{${data.icon}}}@2x.png`);
            content.classList.remove('hidden');


        }
    })
})
})

