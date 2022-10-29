const express = require('express');
const path = require('path');
const hbs = require('hbs');

const currentWeather = require('./utils/currentWeather');
// From express we get a single function, which we bind to the variable
const app = express();

const port  = 3000;

// SETTING UP PATHS TO SERVE UP THE ASSETS TO THE BROWSER
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// SETTING UP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('views', viewPath);
app.set('view engine', 'hbs');

hbs.registerPartials(partialsPath);

// setting up paths to static folders
const publicCss = path.join(__dirname, "../public/css");
const publicJs = path.join(__dirname, "../public/js");

app.use('/js', express.static(publicJs));
app.use('/css', express.static(publicCss));

// SETTING UP ROUTES TO HANDLE THE INCOMING GET REQUEST
app.get('', (req, res) => {

    res.render('index', {});
    // res.render('index', {
    //     lon: dataObj.lon,
    //     lat: dataObj.lat,
    //     pressure: dataObj.pressure,
    //     humidity: dataObj.humidity,
    //     temp: dataObj.temp,
    //     weatherDescription: dataObj.weatherDescription,
    //     article: dataObj.article,
    //     icon: dataObj.icon,
    //     cityName: dataObj.cityName
    // });

    // if(!req.query.location) {
    //     return res.send({
    //         error: "Enter a string"
    //     })
    // }
    // console.log(req.query.location);
    // currentWeather(req.query.location, (error, dataObj) => {
        
    //     if(error) {
    //         return res.send(error);
    //     }
        

    // })
    // console.log(req);
    
})

app.get('/currentWeather', (req,res) => {
    if(!req.query.location) {
        return res.send({
            error: "Enter a string"
        })
    }
    console.log(req.query.location);
    currentWeather(req.query.location, (error, dataObj) => {
        if(error) {
            console.log(error)
            return res.send({
                error
            });
        } else {
            res.send({
                lon: dataObj.lon,
                lat: dataObj.lat,
                pressure: dataObj.pressure,
                humidity: dataObj.humidity,
                temp: dataObj.temp,
                weatherDescription: dataObj.weatherDescription,
                article: dataObj.article,
                icon: dataObj.icon,
                cityName: dataObj.cityName,
                speed: dataObj.speed,
                feels_like: dataObj.feels_like,
                temp_min: dataObj.temp_min,
                temp_max: dataObj.temp_max
            });
        }
    })
})

app.get('*', (req,res) => {
    res.render('404', {})
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

