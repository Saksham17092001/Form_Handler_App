const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const folderRoutes = require("./routes/folder")
const formRoutes = require('./routes/form');
const shareRoutes = require('./routes/share')

const bodyParser = require("body-parser");
const cors = require("cors")
dotenv.config();
app.use(cors())
const PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth", userRoute);
app.use("/api/share",shareRoutes)
app.use("/api/folder", folderRoutes)
app.use('/api/form', formRoutes);

app.listen(PORT, ()=>{
    console.log("port is running on 3000");
    mongoose.connect((process.env.MONGODB_URI)
    
    ).then(()=>{
        console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
    })
    
})