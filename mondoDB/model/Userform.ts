import mongoose from "mongoose";

const UserformSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        twitchChannelId: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model("Userform", UserformSchema);