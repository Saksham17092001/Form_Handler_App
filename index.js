const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const bodyParser = require("body-parser");
const cors = require("cors")
dotenv.config();
app.use(cors())
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth", userRoute)

app.listen(PORT, ()=>{
    console.log("port is running on 3000");
    mongoose.connect((process.env.MONGODB_URI)
    
    ).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    })
    
})