const mongoose = require('mongoose')

const connectDB= async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/mydatabase',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB');
    }catch(err){
       console.log(err);
    }
}

module.exports=connectDB;