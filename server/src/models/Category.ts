import mongoose from "mongoose";


const Category = new mongoose.Schema({
        name: { type: String, required: true },
        image: { type: String, required: true },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
    }, 
    {
        timestamps: true
    }
)

export default mongoose.model("Category", Category)