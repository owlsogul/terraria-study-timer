const express = require("express")
const app = express()
const config = require("./config/config.json")

const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser(config.cookieKey));
app.use(express.json())


const cors = require('cors');
app.use(cors({
  preflightContinue: true,
  credentials: true,
})); // CORS 설정

app.use(session({
 secret: config.cookieKey,
 resave: false,
 saveUninitialized: true
}));

// db
var sequelize = require('./models').sequelize;
sequelize.sync({ force: true }).then(()=>{
    console.log("Successfully connect to server")
}).catch((err)=>{
    console.log(err)
});


// middleware
app.use("/student", require("./student"))
app.use("/admin", require("./admin"))

app.listen(config.port, ()=>{
    console.log(`timer is started at ${config.port}`)
})