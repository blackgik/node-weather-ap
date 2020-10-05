const request = require("request");

const forecast = (longtitude, latitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a3dde912d206a43935b7e99bce5ae5fe&query=' + latitude +',' +longtitude + '&units=m';

    request({ url, json:true }, (error, { body })=>{
        if (error) {
            callback('unable to connect to the service provider', undefined);
        } else if (body.error) {
            callback('unKnown coordinate search', undefined);
        } else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                precipitation: body.current.precip

            })
        }
    })
}

module.exports = forecast;