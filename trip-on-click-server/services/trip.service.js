const tripModel = require("../models/Trip");
const Attraction = require("../models/Attraction");
const Trip = require("../models/Trip");
const User= require("../models/User")
const userService= require("../services/user.service");
const { default: mongoose } = require("mongoose");

const getAllTrips = async () => {
    const trips = await tripModel.find({});
    return trips;
}


const getTripById = async(req,res) => {

        Trip.findById(req.params.id, function (err, trip) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(trip);
                res.status(200).json(trip);
            }
        });
    };

    const getAttractionByTripId = async(req,res) => {

        Trip.findById(req.params.id, function (err, trip) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(Attraction);
                res.status(200).json(Attraction);
            }
        });
    };


    const deleteTrip = async (req, res) => {
        console.log('insert delete function')
        console.log(req.params.id);
        try {
            const {id,userid}=req.params;
            
            await User.updateOne(
                { _id:userid },
                {
                    $pull: {
                       trips:id,
                    }
                })

            const trip = await Trip.findByIdAndDelete(req.params.id);
            
    
            if (!trip) res.status(404).send("No item found");
            res.status(200).json(trip);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    
    const addTrip = async (req, res) => {
        try {
            console.log(req.body);
            console.log('the user');
            console.log(req.body.user);
            const user = req.body.user;
            const { StartDate, FinalDate, Attractions, AttractionsNotUsed, Name, Image } = req.body;
            const trip = await Trip.create({ StartDate, FinalDate, Attractions, AttractionsNotUsed, Name, Image });
            const tripToClient = await Trip.findById(trip.id).populate('Attractions.AttractionDetails')
            .populate('AttractionsNotUsed');
            console.log("tripCreated");
            console.log(tripToClient)
            console.log(tripToClient._id)
            console.log(user.trips)
            user.trips.push(tripToClient._id);
            console.log(user.trips);
            const userUpdated = await User.findByIdAndUpdate(user._id, { $set: user }, { new: true });
            console.log(userUpdated);
            res.status(201).json({ trip: tripToClient, created: true });
        } catch (err) {
            console.log(err);
            res.json({  created: false });
        }
    }
    const addTripToUser = async (tripId,req) => {
        try{
        console.log("add trip to user'");
        console.log("the trip id is" +tripId);
        const userConnected= await userService.getUserConnected(req);
        console.log('finish');
        console.log(userConnected);
        }
        catch(error){
            console.log(error);
        }
        // userConnected.trips.push([...tripId]);
        // console.log("addTripToUser in server: "+userConnected);
        // const user = await User.findByIdAndUpdate(userConnected._id, { $set: userConnected }, { new: true });
        // console.log(user);

        
    }

    const updateTrip = async (request, response) => {
        try {
            console.log("insert update trip")
            console.log(request.body);
            console.log(request.params.id)
            const trip = await Trip.findByIdAndUpdate(request.params.id ,
                request.body
                , {
                    new: true,
                    // runValidators: true,
                    // context: 'query'
                }).populate('Attractions.AttractionDetails').populate('AttractionsNotUsed');
    
            console.log("after update");
            console.log(trip);
            if (!trip) {
                response.status(404).send("No item found to update");
            }
            response.status(200).json(trip);
        } catch (error) {
            console.log("error");
            response.status(500).send(error);
        }
    
    }
module.exports = { addTrip , getAllTrips, getAttractionByTripId, getTripById, deleteTrip, addTripToUser,updateTrip}