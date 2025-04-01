import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { OAuthClientId, OAuthClientSecret, CallbackUrl } from "../../envconfig";
import GoogleUserModel from "../mongoose/schemas/googleUser";
import "../utils/types/extends/expressUser"

// Define the User interface
interface User {
    id: string;
    displayName?: string;
    email?: string;
    type?: string;
}







 const  googleStrategy = new Strategy({
    clientID: OAuthClientId,
    clientSecret: OAuthClientSecret,
    callbackURL: CallbackUrl,
    
    
    scope: ['profile', 'email'],
}, async( accessToken, refreshToken, profile, done) => {
    
    const existingUser = await GoogleUserModel.findOne({ id: profile.id });
    if (existingUser) {
        
        done(null, existingUser); 
        return;
    }

    const user: User = {
        id: profile.id, // Keep as string
        displayName: profile.displayName || "Unknown",
        email: profile.emails?.[0]?.value
        
    };
   

    try{
        const sUser = new GoogleUserModel(user)
        const savedUser = await sUser.save();
       
        done(null, savedUser);
    }catch(error){

        return done(error, undefined)
    }
    
}
)




export default googleStrategy