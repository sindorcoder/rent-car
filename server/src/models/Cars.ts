import mongoose from "mongoose";

const Car = new mongoose.Schema({
        name: { type: String, required: true },
        images: { type: [String], required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        status: { type: String, enum: ["active", "inactive", "rented"], default: "active" },
        rent_price: { type: Number, required: true },
        color: { type: String, required: true },
        model: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
        year: { type: Number, required: true },
        fuel: { type: String, required: true },
        transmission: { type: String, required: true },
        seats: { type: Number, required: true },
        colors: { type: [String], required: true },        
        user_id: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: null},
        thumbnail: { type: String, default: null },
        discount: { type: Number, default: 0 },
        capacity_fuel: { type: Number, required: true },
        usage_per_km: { type: Number, required: true },
    },
    {
        timestamps: true
    }
)

Car.index({ name: 'text', model: 'text' });

export default mongoose.model("Car", Car)