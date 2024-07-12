const express = require('express');
const authRouter=require("./route/authRoute")
const app=express()
const port = 3000;

app.get("/",(req,res)=>{
 res.send("Welcome to the server")
})

app.use("/api/v1/auth",auth)


app.listen(port,()=>{
    console.log("Server listening on port "+port)
})