
const mongoose = require("mongoose");
const Trip = require("./models/Trip");

mongoose.connect('mongodb+srv://meytal106:5YLA9Q5yXnz7R5Z5@triponclickdb.kaks7p2.mongodb.net/TOCDB?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
});

mongoose.connection.on('connected', ()=>{
    console.log('mongoDB connected!');
});

var rawDocuments = [
   {
    startDate : "2014-01-22T14:56:59.301Z",
    finalDate : "2014-01-22T14:56:59.301Z",
    attractions : [
        {
            attraction : 
            {
                _id : "637564d0e1009f9a613cec93"
            }
        },
    ]
   }
];

Trip.insertMany(rawDocuments)
.then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});