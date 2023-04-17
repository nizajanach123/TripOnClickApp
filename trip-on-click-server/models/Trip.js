const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    StartDate: Date,
    FinalDate: Date,
    Attractions: [{
            AttractionDetails: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Attraction"
            },
            Break: {
                HoursNum: Number,
                End: Date
            },
            Start: Date,
            TravelTimeFromPrev: Number, //duration
            DistanceFromPrev: Number, // distance

        }

    ],
    AttractionsNotUsed: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attraction"
        }

    ],
    Name: String,
    Image: String
});

module.exports = mongoose.model('Trip', tripSchema)