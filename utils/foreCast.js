const request = require('request')

const forecast = (lat, long, callback)=>{
    const url = 'https://api.darksky.net/forecast/14398332c29323901039a962d0f21667/' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) +'?units=si';

    request({url, json: true}, (error, {body})=>{
        const data = body;
        if(error){
            callback("cannot connect to the internet!" + error,undefined)
        }else if(body.error){
            callback("wrong lat and long!" + error,undefined)
        }else{
            callback(undefined,data.daily.data[0].summary + " It is currently " + data.currently.temperature + "`C degrees out. There is a " 
                     + data.currently.precipProbability + "% chance of rain. The highest temperature is " + data.daily.data[0].temperatureHigh + "`C. The lowest temperature is " + data.daily.data[0].temperatureLow + "`C." )
        }
    })   
}

module.exports = forecast