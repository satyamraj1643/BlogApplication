const {Router} = require("express");
const {path} = require("path");
const router = Router();

router.get('/signin', (req,res)=>{
    return res.render("signin");
})



router.get('/signup', (req,res)=>{   // Static GET request by browser to open signup page
    return res.render("signup", {

    })
})

router.get("/login", (req,res)=>{   // Static GET request by browser to open login page
    return res.render("login");
})



module.exports = {
    router
}
