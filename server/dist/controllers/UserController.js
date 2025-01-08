"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async getUsers(req, res) {
        try {
            const users = await User_1.default.find({});
            return res.json({ message: "Get Users", payload: users });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async getUser(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.isValidObjectId(id)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
            const user = await User_1.default.findById({ _id: req.params.id });
            if (!user)
                return res.status(404).json({ message: "User not found" });
            return res.json({ message: "Get User", payload: user });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async createUser(req, res) {
        try {
            let user = await User_1.default.findOne({ email: req.body.email }, 'email').lean();
            if (user)
                return res.status(400).json({ message: "User already exists", payload: user });
            const saltRounds = 10;
            const salt = bcrypt_1.default.genSaltSync(saltRounds);
            const hashPassword = bcrypt_1.default.hashSync(req.body.password, salt);
            user = await User_1.default.create({ ...req.body, password: hashPassword });
            return res.json({ message: "Successfully created new user", payload: user });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async deleteUser(req, res) {
        try {
            const user = await User_1.default.findByIdAndDelete({ _id: req.params.id });
            return res.json({ message: "Delete User", payload: user });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
exports.default = UserController;
