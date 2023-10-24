const express = require("express");
const {router} = require("./routes/user");
const path = require("path");
const PORT = 8000;


const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("./public"))
app.get("/", (req,res)=>{
   return res.render("home");
})
app.use("/", router);

app.listen(PORT, ()=>{
    console.log("Server connected to : ", PORT);
})


