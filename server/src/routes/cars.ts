import express from "express";
import CarController from "../controllers/CarControler";
import { carValidation, updateCarValidation } from "../validations/car.validation";
import { verifyToken } from "../middlewares/verify-token";
const router = express.Router();
const carController = new CarController();


router
    .get("/", (req, res) => carController.getCarsByQuery(req, res))
    .get("/search", (req, res) => carController.searchCars(req, res))
    .post("/create", verifyToken(["admin", "owner"]), carValidation, (req, res) => carController.createCar(req, res))
    .get("/:id", (req, res) => carController.getCar(req, res))
    .put("/:id", verifyToken(["admin", "owner"]), updateCarValidation, (req, res) => carController.updateCar(req, res))
    .delete("/:id", verifyToken(["admin", "owner"]), (req, res) => carController.deleteCar(req, res));


export default router