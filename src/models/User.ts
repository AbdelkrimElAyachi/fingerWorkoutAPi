import { Schema, model, Document, Types } from "mongoose"

interface IUser extends Document {
    _id: Types.ObjectId,
    name: string;
    email: string;
    picture: string;
    password: string;
    date: Date;
}

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255
    },
    picture: {
        type: String,
        required: false,
        max: 255
    },
    EmailVerified: {
        type: Boolean,
        required: false,
        default: false
    }
    ,
    password: {
        type: String,
        required: true,
        max: 1024, //store hashes
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
})



const User = model<IUser>('User', UserSchema)
export default User;