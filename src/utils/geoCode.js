const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmxhY2tnaWsiLCJhIjoiY2tmM3JjcTlhMDV5azJzbzRnYmU2bDVtMyJ9.qOZYka2-Vow4pI2cf9N1nQ&limit=1'

    request({url, json: true}, (error, { body })=>{
        if (error){
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0) {
            callback('unable to discover your location', undefined)
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode