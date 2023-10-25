const {validateToken} = require("../services/auth")
function checkForAuthenticationCookie(cookieName){
    return(req,res,next)=>{
        const cookietokenValue = req.cookies[cookieName];
        if(!cookietokenValue){
            next();
            console.log("No cookie present");
        }
        
       try{
        const userpayload = validateToken(cookietokenValue);
        req.user = userpayload;
        console.log(userpayload);
        console.log("cookie is present");
        next()
       }
       catch(err){
        console.log("Error ocurred while fetching cookie");
         
       }
    }
}

module.exports= {
    checkForAuthenticationCookie,
}