const { Client } = require('@googlemaps/google-maps-services-js');
const map = exppress;



const client = new Client();

//Return the Duration from adress1 to adrres2 in secends
async function duration(ori,des) {

  direction = await client.directions({
    params: {
      origin: ori,
      destination: des,
      key: 'AIzaSyBMGHCFgSdtpMTOGIFHiZrrE7YFayTEe08',
  }
  })

  return direction.data.routes[0].legs[0].duration.value;



}


//Return the Distance from adress1 to adrres2 in meters
async function distance(ori,des) {

  direction = await client.directions({
    params: {
      origin: ori,
      destination: des,
      key: 'AIzaSyBMGHCFgSdtpMTOGIFHiZrrE7YFayTEe08',
  }
  })

  return direction.data.routes[0].legs[0].distance.value;

}

//try
const addressOri = "קיבוץ חולתה" + 1 +  "רמת הגולן";
const addressDes = "קיבוץ חולתה" + 20 +  "רמת הגולן";
  
Promise.resolve(duration(addressOri,addressDes)).then(
  (value) => {
    console.log(value);
});


module.exports = map;

