import passport from "passport";
import GoogleUserModel from "../mongoose/schemas/googleUser";
import "../utils/types/extends/expressUser"
import UserModel  from "../mongoose/schemas/user";



import localStrategy from "./local";
import googleStrategy from "./google";




passport.serializeUser((user, done)=>{
    console.log(user)
    done(null,{
        id: user.id,
        type: user.type
    }) 
    
    })
    
    
    passport.deserializeUser(async (serialized: { id: string; type: string }, done)=>{
 
       if(serialized.type === "google") {
        
        try{const finduser   =await GoogleUserModel.findOne({id: serialized.id})
        if(!finduser) throw new Error("User not found!")
        done(null, finduser)   
   }catch(err){done(err, false)}

    }else{

            try{const finduser   =await UserModel.findOne({id: serialized.id})
            if(!finduser) throw new Error("User not found!!!")
            done(null, finduser)   
    }catch(err){done(err, false)}


    }

     
    
    })



    passport.use(localStrategy);
    passport.use(googleStrategy);
    


    export default passport;