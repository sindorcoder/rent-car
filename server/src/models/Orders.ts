import mongoose from "mongoose";


const Order = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    quantity: { type: Number, required: true, default: 1 },
    total_price: { type: Number, required: true },
    driver_licence_number: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    payment_status: { type: String, enum: ["paid", "unpaid"], default: "paid" },
    payment_method: { type: String, enum: ["cash", "card"], default: "cash" },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, {
    timestamps: true
})


export default mongoose.model("Order", Order)