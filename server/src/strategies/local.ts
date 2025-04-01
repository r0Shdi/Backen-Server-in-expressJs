import passport  from "passport";
import { Strategy } from "passport-local";
import bcrypt from 'bcrypt';

import UserModel  from "../mongoose/schemas/user";
import { User } from "../utils/types/user";
import e from "express";





// passport.serializeUser((user, done)=>{
// done(null, user.id) 

// })


// passport.deserializeUser(async (id, done)=>{
//     try{const finduser   =await UserModel.findOne({id})
//         if(!finduser) throw new Error("User not found!!!")
//         done(null, finduser)   
//    }catch(err){done(err, false)}

// })


const localStrategy =new Strategy(async(username, password, done)=>{
        
     try{const finduser   =await UserModel.findOne({username})
     if(!finduser) throw new Error("User not found!!!!!!")
      if(!bcrypt.compareSync(password, finduser.password))throw new Error("Bad credentials")
     done(null, finduser)   
}catch(err){done(err, false)}

    })


export default localStrategy;    