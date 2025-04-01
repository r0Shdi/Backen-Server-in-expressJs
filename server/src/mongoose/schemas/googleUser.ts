import mongoose, { Model } from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
    id: { 
        type: Number,
        unique: true
    },
    displayName: String,
    email: {type: String, unique: true, required: true},
    type: {type: String, default: "google"},
    
})






const GoogleUserModel: Model<any> = mongoose.model("GoogleUser", GoogleUserSchema);
export default GoogleUserModel;


