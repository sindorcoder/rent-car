"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cars_1 = __importDefault(require("../models/Cars"));
const mongoose_1 = __importDefault(require("mongoose"));
class CarController {
    async getCarsByQuery(req, res) {
        try {
            let categoryIds = req.query.categories;
            const model = req.query.model;
            const seats = req.query.seats ? parseInt(req.query.seats) : undefined;
            if (typeof categoryIds === 'string') {
                categoryIds = [categoryIds];
            }
            const query = {};
            if (categoryIds) {
                if (!Array.isArray(categoryIds) || categoryIds.some(id => typeof id !== 'string')) {
                    return res.status(400).json({ message: 'Invalid category IDs provided' });
                }
                query.category = { $in: categoryIds };
            }
            if (model) {
                query.model = model;
            }
            if (seats || seats === 0) {
                if (isNaN(seats)) {
                    return res.status(400).json({ message: 'Invalid seats value provided' });
                }
                query.seats = seats;
            }
            const cars = await Cars_1.default.find(query);
            return res.json({ message: 'Get Cars by Categories, Model, and Seats', payload: cars });
        }
        catch (err) {
            console.error('Error fetching cars:', err); // Log the error for debugging
            return res.status(500).json({ message: err.message });
        }
    }
    async createCar(req, res) {
        try {
            const car = await Cars_1.default.create(req.body);
            return res.json({ message: "Successfully created new car", payload: car });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async getCar(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.isValidObjectId(id)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
            const car = await Cars_1.default.findById({ _id: req.params.id });
            if (!car)
                return res.status(404).json({ message: "Category not found" });
            return res.json({ message: "Get Car", payload: car });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    async deleteCar(req, res) {
        try {
            const car = await Cars_1.default.findByIdAndDelete({ _id: req.params.id });
            return res.json({ message: "Delete Car", payload: car });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
exports.default = CarController;
