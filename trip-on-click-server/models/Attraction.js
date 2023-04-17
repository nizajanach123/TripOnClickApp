const mongoose = require('mongoose');

const attractionSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,   
    Name : String,
    Address : {
        Street : String,
        Number : Number,
        City : String
    },
    location: {
        lat: Number,
        lng: Number
    },
    Area : String,
    Category: String,
    DestiPopulation : Number,
    Image: String,
    HoursNum: Number,
    OpeningHours : String,
    ClosingHours : String,
    Description: String,
    Url: String,
});

module.exports = mongoose.model('Attraction', attractionSchema)