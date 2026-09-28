const express = require("express");

const app = express();
app.get("/", (req, res)=>{
    res.send("hello master")
    
})

app.listen(5000, ()=>{
    console.log("server is running");
    console.log("http://localhost:5000");
    
})