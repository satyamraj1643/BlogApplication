const express = require("express");
const {ejs} = require("ejs");
var cookieParser = require('cookie-parser')
const{checkForAuthenticationCookie} = require("./middleware/cookieAuthentication")
const {router} = require("./routes/user");
const path = require("path");
const {handleDBConnection} = require("./dbconnection");
const { json } = require("express/lib/response");
const PORT = 8000;
const url = "mongodb://127.0.0.1:27017/";
const flash = require("express-flash")
const sessions = require("express-session")
handleDBConnection(url);
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("./public"))
app.get("/", (req,res)=>{
   return res.render("home");
})
app.use(sessions({
    secret : "MainNahiBataunga",
    saveUninitialized : true,
    resave : true
}))
app.use(flash());
app.use("/", router);


app.listen(PORT, ()=>{
    console.log("Server connected to : ", PORT);
})


