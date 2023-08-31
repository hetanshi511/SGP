const mongoose=require("mongoose")

mongoose.connect("mongodb://0.0.0.0/backend")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("fail to connect");
})

 const LogInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String, 
        required:true
    }
 })

 const collection=new mongoose.model("Collection1",LogInSchema)

 module.exports=collection