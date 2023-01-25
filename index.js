require("dotenv").config();
const express = require("express");
const sequelize = require('./db.config');
const PORT = process.env.PORT;
const cors = require("cors");

const authRoute = require('./routes/auth');

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoute)

async function start (){
    try{
        await sequelize.authenticate()
        app.listen(PORT, ()=> console.log("Server start at " + PORT))
        await  sequelize.sync()
    }catch (err){
        console.log(err);
    }
}

start();
