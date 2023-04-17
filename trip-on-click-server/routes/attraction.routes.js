const AttractionService = require('../services/attraction.service');
const express = require('express');
const router = express.Router();
//TEST
/* /attractions/ */
// router.get("/", async (request, res) => {
//   try {
//     res.json(await AttractionService.getAllAttractions());
//     // const attractions = await AttractionService.getAllAttractions();
//     // console.log(attractions)
//     // res.status(200).send(attractions);
//   } catch (e) {
//     console.log(e);
//   }
// });
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
    const attractions = await AttractionService.getAllAttractions();
    res.status(200).send(attractions);
  } catch (e) {
    console.log(e);
  }

  
  });

  router.get('/:id', async (req, res) => {
    // const trip = await Trip.findById(req.params.id).populate('attractions.attraction')
    // res.send(trip)
    try {
      await AttractionService.getAttractionById(req,res);
    } catch (e) {
      res.status(500).send(e);
    }
})

router.get("/delete/:id", async (req, res) => {
  try {
    await AttractionService.deleteAttraction(req, res);
  }
   catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;