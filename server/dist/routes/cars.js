"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CarControler_1 = __importDefault(require("../controllers/CarControler"));
const car_validation_1 = require("../validations/car.validation");
const router = express_1.default.Router();
const carController = new CarControler_1.default();
router
    .get("/", (req, res) => carController.getCarsByQuery(req, res))
    .post("/create", car_validation_1.carValidation, (req, res) => carController.createCar(req, res))
    .get("/:id", (req, res) => carController.getCar(req, res))
    .delete("/:id", (req, res) => carController.deleteCar(req, res));
exports.default = router;
