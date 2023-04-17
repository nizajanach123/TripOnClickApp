const Attraction = require('../models/Attraction');

const getAllAttractions = async () =>{
    const attractions = await Attraction.find({});
    return attractions;
};

const getAttractionById = async(req,res) => {

    Attraction.findById(req.params.id, function (err, attraction) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(attraction);
            res.status(200).json(attraction);
        }
    });
};
const deleteAttraction = async (req, res) => {
    console.log(req.params.id);
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if (!attraction) res.status(404).send("No item found");
        res.status(200).json(attraction);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllAttractions,getAttractionById,deleteAttraction };