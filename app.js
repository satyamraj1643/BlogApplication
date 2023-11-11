require("dotenv").config();
const express = require("express");

const {ejs} = require("ejs");
var cookieParser = require('cookie-parser')
// const bodyParser = require('body-parser')
const{checkForAuthenticationCookie} = require("./middleware/cookieAuthentication")
const {router} = require("./routes/user");
const {blogrouter} = require("./routes/blog");
const path = require("path");
const {handleDBConnection} = require("./dbconnection");
const { json } = require("express/lib/response");
const PORT =  process.env.PORT; // changed for cloud compatibility

//const url = "mongodb://127.0.0.1:27017/";
const flash = require("express-flash")
const sessions = require("express-session")
handleDBConnection(`${process.env.MONGO_URL}`);
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("./public"))
// app.use(bodyParser.urlencoded({ extended: true }));


const {Blog} = require('./models/blog');

app.get("/home", async (req,res)=>{
    const allblog = await Blog.find({}).sort('createdAt');

     res.render("home", {
        user:req.user,
        blogs: allblog,
     })
})

app.get('/goback', (req,res)=>{
    return res.redirect("/home");
})



app.use(sessions({
    secret : "MainNahiBataunga",
    saveUninitialized : true,
    resave : true
}))
app.use(flash());

app.use("/", router);
app.use("/", blogrouter);

app.listen(PORT, ()=>{
    console.log("Server connected to : ", PORT);
})


