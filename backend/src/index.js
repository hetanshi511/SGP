const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname,'../templates')
app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

const static_path=path.join(__dirname,"../public")

app.use(express.static(static_path))


app.get("/",(req,res)=>{
    res.render("login")
}) 

app.get("/login",(req,res)=>{
    res.render("login")
}) 

app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async(req,res)=>{

    const data={
        email:req.body.email,
        password:req.body.password   
    }

    await collection.insertMany([data])

  res.render("main")
})
app.post("/login",async (req,res)=>{

    try{
        const check= await collection.findOne({email:req.body.email})
        console.log("hii");
        if(check.password === req.body.password){
            res.render("main")
        }
        else{
            res.send("Your Password is wrong")
        }
    }
    catch{
        res.send("You are new user...SignUp First")
    }
    res.render("signup")

})

app.listen(3000,()=>{
    console.log("port connected");
})
