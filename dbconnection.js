const {mongoose} = require("mongoose");

async function handleDBConnection(url){
    mongoose.connect(url).then(()=>{
        console.log("Database connected sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
    

}

module.exports={
    handleDBConnection,
}