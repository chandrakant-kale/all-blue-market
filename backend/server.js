const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors);

app.get("/", (req, res)=>{
    res.send("hello master")
    
})

app.listen(5000, ()=>{
    console.log("server is running");
    console.log("http://localhost:5000");
})