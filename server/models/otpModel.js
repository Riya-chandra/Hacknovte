// // const { timeStamp } = require("console");
const mongoose=require("mongoose");

// // const otpSchema=new mongoose.Schema(
// //     {
// //         user_id:{
// //             type:mongoose.Schema.Types.ObjectId,
// //             required:true,
// //             ref:"user",
// //         },
// //         otp:{
// //             type:Number,
// //             required:true
// //         },
// //         timeStamp:{
// //             type:Date,
// //         default:Date.now,
// //         required:true,
// //         get:(timeStamp)=>timeStamp.getTime(),//agr gate use nhi krege toh directly date de dega
// //         set:(timeStamp)=>new Date(timeStamp),
// //         }
// //     },
// // )
// // module.exports=mongoose.model("Otp",otpSchema);


// const otpSchema=new mongoose.Schema({
//     userId:String,
//     otp:String,
//     createdAt:Date,
//     expiresAt:Date,
// })
// const OtpModel = new mongoose.model("Otp", otpSchema)
// module.exports = OtpModel;
const otpGenerator=require("otp-generator");
const generateOTP=()=>{
    const OTP=otpGenerator.generate(4,{
        upperCaseAlphabets:false,

    });
    return OTP;

}
module.exports=generateOTP();
