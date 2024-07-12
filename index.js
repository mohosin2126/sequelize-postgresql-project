// require the express
const express = require('express');
const app=express()

// import the route
const authRouter=require("./route/authRoute")

// import the dotenv
require("dotenv").config({path:`${process.cwd()}/.env`})


app.get("/",(req,res)=>{
 res.send("Welcome to the server")
})

// app.use("/api/v1/auth",auth)


app.listen(process.env.APP_PORT,()=>{
    console.log("Server listening on port "+process.env.APP_PORT)
})