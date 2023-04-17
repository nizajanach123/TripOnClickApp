
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect('mongodb+srv://meytal106:5YLA9Q5yXnz7R5Z5@triponclickdb.kaks7p2.mongodb.net/TOCDB?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
 
});

mongoose.connection.on('connected', ()=>{
    console.log('mongoDB connected!');
});

var rawDocuments = [
    {
        id: new mongoose.Types.ObjectId(),
        username: "ori",
        password: "ori22",
        email: "njdnj@gmail.com"
      },
      {
        id: new mongoose.Types.ObjectId(),
        username: "shira15",
        password: "shira2012",
        email: "shira15@gmail.com"
      },
      {
        id: new mongoose.Types.ObjectId(),
        username: "roncohen",
        password: "ronco",
        email: "ronico@gmail.com"
      },
      {
        id: new mongoose.Types.ObjectId(),
        username: "israelho",
        password: "isra23",
        email: "israelh23@gmail.com"
      }

];

User.insertMany(rawDocuments)
.then(function(){
    console.log("Data inserted")  // Success
}).catch(function(error){
    console.log(error)      // Failure
});