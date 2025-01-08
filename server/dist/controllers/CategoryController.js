"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../models/Category"));
class CategoryController {
    async getCategories(req, res) {
        try {
            const categories = await Category_1.default.find();
            return res.json({ message: "Get All Categories", payload: categories });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async createCategory(req, res) {
        try {
            const category = await Category_1.default.create(req.body);
            return res.json({ message: "Successfully created new category", payload: category });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async deleteCategory(req, res) {
        try {
            const category = await Category_1.default.findByIdAndDelete({ _id: req.params.id });
            return res.json({ message: "Delete Category", payload: category });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
exports.default = CategoryController;
