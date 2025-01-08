"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    phone_number: { type: String },
    avatar: { type: String, default: null },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    likes: { type: [mongoose_1.default.Schema.Types.ObjectId], ref: "Car", default: null },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("User", User);
