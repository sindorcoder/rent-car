"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Car = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    rent_price: { type: Number, required: true },
    color: { type: String, required: true },
    model: { type: String, required: true },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category", required: true },
    year: { type: Number, required: true },
    fuel: { type: String, required: true },
    transmission: { type: String, required: true },
    seats: { type: Number, required: true },
    colors: { type: [String], required: true },
    user_id: { type: [mongoose_1.default.Schema.Types.ObjectId], ref: "User", default: null },
    // TODO: thumbnail and discount and capacity fuel
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("Car", Car);
