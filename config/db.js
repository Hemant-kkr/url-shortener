const mongoose = require('mongoose');

const connectDB = async()=>
{
  await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(()=>{
    console.log("MongoDB connected");
  })
  .catch((err)=>
  {
    console.log("Error",err);
  })
}

module.exports=connectDB;
