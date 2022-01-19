const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=8d22d89b5a10a53663921ec2296603c5&query=${longitude},${latitude}&units=f`;

    request({ url, json: true }, (error, { body: responseBody } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (responseBody.error) {
            callback('Unable to find location.', undefined);
        } else {
            let currentTemp = responseBody.current.temperature;
            let feelsLikeTemp = responseBody.current.feelslike;
            callback(undefined, `${responseBody.current.weather_descriptions[0]}. It is currently ${currentTemp} faranheit out. It feels like ${feelsLikeTemp} faranheit out. Humidity is ${responseBody.current.humidity}%.`);
        }
    })
}

module.exports = forecast;