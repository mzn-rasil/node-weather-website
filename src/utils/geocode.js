const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFzaWxtem4iLCJhIjoiY2t4NjlnYTZjMnFiMzJ1cm52OGJqZXYxZiJ9.RkfJw5X2pXN-zx0NWfmvQQ&limit=1';

    request({ url, json: true }, (error, { body: responseBody } = {}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (responseBody.features.length === 0) {
            callback('Unable to find the location you desire. Please try something else', undefined);
        } else {
            callback(undefined, {
                latitude: responseBody.features[0].center[1],
                longitude: responseBody.features[0].center[0],
                location: responseBody.features[0].place_name,
            })
        }
    })
}

module.exports = geocode;