const {Schema, model, pre } = require("mongoose");
const {createHmac, randomBytes} = require("crypto");

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    salt:{
        type: String,
       // required: true,
    },
    password:{
        type: String,
        required:true,
        unique:true,

    },
    profileImageURL:{
        type : String,
        default:"/images/default.png"
    },
    role:{
     type: String,
     enum:["USER", "ADMIN"],
     default : "USER",
    }
}, {timestamps:true});

userSchema.pre("save", function (next){
    const user = this;

    if(!user.isModified('password'));
    // {
    //     this.salt = randomBytes(16).toString();
        
    // }

    const salt = randomBytes(16).toString();
    const hashedPassword  = createHmac('sha256', salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

 next();
})

userSchema.static("matchPassword", async function(email,password){
    const user = await User.findOne({email});
    let isPresent = false;
    let isValid = false;
    if(!user) return {isPresent: false, isValid: false};
    const salt = user.salt;
    const hashedPassword = user.password;

    const saltedpassword = createHmac('sha256', salt).update(password).digest("hex");
    if(hashedPassword === saltedpassword) return { ...user , isPresent: true, isValid: true};
    else if(user && hashedPassword!= saltedpassword) return {isPresent: true, isValid: false};
    
})
const User = model("user",userSchema); //Initialising a Schema

module.exports={
    User
}