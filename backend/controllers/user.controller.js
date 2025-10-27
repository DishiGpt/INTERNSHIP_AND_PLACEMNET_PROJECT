import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";  
export const register = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){  
            return res.status(400).json(
                {message:"All fields are required",
                success:false
                }
            );
        }  
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json(
                {message:"User already exists",
                success:false
                }
            );
        }   
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role     
        });

        return res.status(201).json({
            message:"User registered successfully",
            success:true
        });
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};
export const login = async (req, res) => {
    try{
        const {email, password,role} = req.body;
        if(!email || !password || !role){  
            return res.status(400).json(
                {message:"All fields are required",
                success:false
                }
            );
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(
                {message:"incorrect email or password",
                success:false
                }
            );
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json(
                {message:"incorrect email or password",
                success:false
                }
            );
        }
        if(role !== user.role){
            return res.status(400).json(
                {message:"Account with current role doesn't exist.",
                success:false
                }
            );
        }
        const tokenData={
            userID:user._id,
        }
        const token = jwt.sign(tokenData,process.env.SECRET_KEY ,{expiresIn:'1d'}); 

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,   
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile, 
        }

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:'strict'}).json({
            message:`Welcome back! ${user.fullname}`,
            success:true,
        })
    }
catch(error){
    console.log(error);
}
}

export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out successfully",
            success:true,
        })
    }
    catch(error){
        console.log(error);
    }
};
export const updateProfile = async (req, res) => {
    try{

    }
    catch (error){
        console.log(error);
    }
}