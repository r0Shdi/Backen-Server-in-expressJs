import mongoose, { Document, Model } from "mongoose";
import { User } from "../../utils/types/user";


// Define schema with TypeScript typings
const UserSchema = new mongoose.Schema<User>({
    id: { 
        type: Number,
        unique: true
    },
    username: {type: String, unique: true},
    age: String,
    password: { 
        type: String,
        required: true
    },
    type: {type: String, default: "local"},
});

// Define model type
interface IUserModel extends Model<User> {}

// Create the model with proper typings
const UserModel: IUserModel = mongoose.model<User, IUserModel>("User", UserSchema);

export default UserModel;