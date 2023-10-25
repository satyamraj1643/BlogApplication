const {sign , verify} = require("jsonwebtoken");
const secret = "HavanaIsMyFavouriteSong";

function createToken(user){
    const payload = {
        firstName : user.firstName,
        lastName : user.lastName,
        _id : user._id,
        email: user.email,
        profileURL : user. profileImageURL,
        role: user.role,
    };

    const token = sign(payload, secret);
    return token;
}

function validateToken(token){
    const payload = verify(token, secret);
    return payload;
}

module.exports={
    createToken,
    validateToken,
}