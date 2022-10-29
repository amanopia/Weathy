// packages
const request = require('postman-request'); 

//global variables
const units = 'metric' // metric , imperial, standard
const appid = 'd6cb3f891806944d6df035d7343904db';


// here we are using a callback to log the error in case there is and data in case there is

const currentWeather = (cityName, callback) => {

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${appid}&units=${units}`;

    request({url: weatherUrl, json: true}, (error, {body}) => {

        if(error) {
            
            callback("Unable to connect", undefined);
            
        } else if(body.message) {
            
            callback("Unable to find location", undefined);
            
        } else {
            // This api call will only be executed in case the errors described above are not found
            
            const coordinates = {
                lon : body.coord.lon,
                lat : body.coord.lat
            }
            const pressure = body.main.pressure;
            const humidity = body.main.humidity;
            const icon = body.weather[0].icon;

            const temp = body.main.temp;
            const weatherDescription = body.weather[0].description;

            const speed = Number((body.wind.speed * 3.6).toFixed(2)); // Converting to km/hr (metric), truncating to two decimal places, then converting to number
            const feels_like = body.main.feels_like;
            const temp_max = body.main.temp_max;
            const temp_min = body.main.temp_min;
            
            // grammar check
            const vowels = ['a', 'e', 'i', 'o', 'u'];
            let article = "a";
            for(let i = 0; i<vowels.length; i++){
                if (weatherDescription.split(" ").length > 1) {
                    article = "";
                } else if(weatherDescription.charAt(0) == vowels[i]){
                    article = "an";
                }
            }
            
            const dataObj = {
                lon: coordinates.lon,
                lat: coordinates.lat,
                pressure,
                humidity,
                icon,
                temp,
                weatherDescription,
                article,
                cityName,
                speed,
                feels_like,
                temp_max,
                temp_min
            }
            callback(undefined, dataObj);
            // callback(undefined, `It is ${temp} degrees outside in ${cityName}, with ${article} ${weatherDescription}. ${coordinates.lat}, ${coordinates.lon}, ${pressure}, ${humidity}, ${icon}`);
        }
        })
}
// currentWeather('Brampton', (error,data) => {
//     console.log(error);
//     console.log(data);
// })
module.exports = currentWeather;