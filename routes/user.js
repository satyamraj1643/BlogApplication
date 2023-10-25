const { Router } = require("express");
const { path } = require("path");
const { User, matchPassword } = require("../models/user");
const { randomBytes, createHmac } = require("crypto");
const router = Router();



router.get('/signup', (req, res) => {   // Static GET request by browser to open signup page
    return res.render("signup", {message: "This is a message"})
})

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, cnfpaswd } = req.body;
    console.log(firstName, lastName, email, cnfpaswd);
    User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: cnfpaswd,
    }).then(() => {
        console.log("Data saved sucessfully");
        res.redirect("/home");
    }).catch((err) => {
        console.log(err);
        //window.alert("Please try again later");
        res.redirect("/signup");
    })
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const isMatched = await User.matchPassword(email, password);
    console.log(isMatched);

    if (isMatched.isPresent && isMatched.isValid) {
        res.redirect("/home");
        console.log("Login successful");
    } else if (isMatched.isPresent && !isMatched.isValid) {
        res.redirect("/login");
        console.log("Wrong password");
    } else {
        const message = "User not found, please create an account";
        res.render("signup", { message }); // Pass the message variable to the template
        console.log("User Not Found");
      
           
        
     
    }
});




router.get("/login", (req, res) => {   // Static GET request by browser to open login page
    return res.render("login");
})
router.get("/home", (req, res) => {
    res.render("home");
})



module.exports = {
    router
}
