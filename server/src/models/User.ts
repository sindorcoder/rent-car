import mongoose from "mongoose";

const User = new mongoose.Schema({
        first_name: { type: String, required: true },
        last_name: { type: String },
        phone_number: { type: String },
        avatar: { type: String, default: null },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        role: {type: String, enum: ["admin", "user", "owner"], default: "user"},
        email: { type: String, required: true, index: true },
        email_verified: { type: Boolean, default: false },
        password: { type: String, required: true },
        balance: { type: Number, default: 0 },
        likes : { type: [mongoose.Schema.Types.ObjectId], ref: "Car", default: null },
    }, 
    {
        timestamps: true
    }
)

export default mongoose.model("User", User)