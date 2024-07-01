const express = require('express');

const app=express()
const port = 3000;

app.get("/",(req,res)=>{
 res.status(200).json({
     status:"success",
     message:"Welcome to the server",

 })
})

app.listen(port,()=>{
    console.log("Server listening on port "+port)
})