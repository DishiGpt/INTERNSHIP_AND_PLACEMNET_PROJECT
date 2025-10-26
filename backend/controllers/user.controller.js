import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

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
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};