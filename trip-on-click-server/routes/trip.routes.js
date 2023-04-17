
const TripService = require('../services/trip.service');
const express = require('express');
const Trip = require('../models/Trip');
const Attraction = require('../models/Attraction');

const router = express.Router();


    //insert here all your Trips routes and calls the methods in the service
    //for example:

    //  router.get("/", async (req, res, next) => {
    // try {
    //     const trips = await TripService.getAllTrips();
    //     res.status(200).send(trips);
    //   } catch (e) {
    //     console.log(e);
    //     next(e);
    //   }
    // };

    //TEST
    /* /trips/ */
     router.get("/",  async (req, res, next) => {
    // try {
    //     res.status(200).json({
    //         Message : "all trips"
    //     });
    //   } catch (e) {
    //     console.log(e);
    //     next(e);
    //   }
    try {
      const trips = await TripService.getAllTrips();
      res.status(200).send(trips);
    } catch (e) {
      console.log(e);
    }
    });

    router.post("/",  (request, response) => {
      try {
        console.log('route to addtrip')
         TripService.addTrip(request, response);
      
        } catch (error) {
        response.status(500).send(error);
      }
    });
    router.get('/:id', async (req, res) => {
      console.log("get trip by id")
      const trip = await Trip.findById(req.params.id).populate('Attractions.AttractionDetails')
        .populate('AttractionsNotUsed');
    
      console.log(trip);
      res.send(trip)
    })
    
    router.post("/:id", async (request, response) => {

      try {
        console.log("insert")
        await TripService.updateTrip(request, response);
      }
      catch (error) {
        response.status(500).send(error);
      }
    });
  //   router.get('/:id', async (req, res) => {
  //     // const trip = await Trip.findById(req.params.id).c('attractions.attraction')
  //     // res.send(trip)
  //     try {
  //       // await TripService.getTripById(req,res);
  //          const trip = await Trip.findById(req.params.id).populate('attractions.attractionDetails')
  //          console.log('func');
  //          res.send(trip)
  //     } catch (e) {
  //       res.status(500).send(e);
  //     }
  // })

  router.get('/:id', async (req, res) => {
    const trip = await Trip.findById(req.params.id).populate('Attractions.AttractionDetails');
    // .populate('AttractionsNotUsed');
    console.log("in");
    res.send(trip);
})

  router.post("/delete/:id/:userid", async (req, res) => {
    try {
      console.log('start delete');
      await TripService.deleteTrip(req, res);
      
    }
     catch (error) {
      res.status(500).send(error);
    }
  });

  router.get("/:id/attractions",async (request, response) => {
    try {
      const trip = await Trip.findById(request.params.id).populate('Attractions');
      console.log(trip);
      // const trip = await Trip.findById('6379740a5a920fe00875cd20').populate('attractions.attraction')
      // user.trips.push(trip);
      // await user.save();
      response.send(trip.attractions);
  
    }

    
  
      // response.send(user.trips);
    catch (e) {
    response.status(500).send(e);
  }
  });

  
  
  //   router.get('/:id', async (req, res) => {
  //     const trip = await Trip.findById(req.params.id).populate('attractions.attraction')
  //     res.send(trip)
  // })


module.exports = router;