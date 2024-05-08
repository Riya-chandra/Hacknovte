const mongoose=require("mongoose")
const usersData=require("./users.js")
const user=require("../models/users.js")
const MONGO_URL = "mongodb://127.0.0.1:27017/hackpro"
mongoose.connect(MONGO_URL).then(() => {

}).then(console.log(`Connection successful.`));

async function main(){
    await mongoose.connect(MONGO_URL);
}
const initDB=async()=>{
    await user.insertMany(usersData.data)
    console.log("data is intialised")
};
initDB();