const request = require('request')

const geoCode = (city, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(city) + ".json?limit=1&autocomplete=false&access_token=pk.eyJ1Ijoia2ltaW5sZWUiLCJhIjoiY2sxZHhrdXBuMGQzYTNubW1xemVoMm9qdiJ9.PFxWbKaTlNMU-hj6n3RR2g"

    request({url, json: true}, (error, {body})=>{
        if(error){
            callback(error+"connection problem!", undefined)
        }else if(body.features.length == 0 || body.features.matching_text){
            callback("cannnot find the city!!")
        }else{
            callback(undefined, {latitude: body.features[0].center[1],
                                longitude: body.features[0].center[0],
                                location: body.features[0].place_name})
        }
    })
}

module.exports = geoCode