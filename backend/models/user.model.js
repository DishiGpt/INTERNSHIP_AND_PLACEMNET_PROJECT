import mongoose, { Mongoose } from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,},
    PhoneNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["student","recruiter"],
        required:true,
    },
    profile:{
        bio:{type:String},
        skills:{type:String},
        resume:{type:String}, //url to resume file
        resumeOriginalName:{type:String},
        company:{type:Mongoose.Schema.Types.ObjectId, ref:"Company"}, //for recruiter
        profilePhoto:{type:String,
            default:""
        },
    }
},{timestamps:true});
export const User= mongoose.model("User",userSchema);