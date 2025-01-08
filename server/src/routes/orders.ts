import express from "express";
import OrdersController from "../controllers/OrdersController";
import { verifyToken } from "../middlewares/verify-token";
const router = express.Router();
const ordersController = new OrdersController();

router
    .get("/", verifyToken(["user", "admin", "owner"]), (req, res) => ordersController.getOrders(req, res))
    .post("/create", verifyToken(["user","admin", "owner"]), (req, res) => ordersController.createOrder(req, res))
    .put("/:id", verifyToken(["user", "admin", "owner"]), (req, res) => ordersController.updateOrder(req, res))
    .get("/:id", verifyToken(["user", "admin", "owner"]), (req, res) => ordersController.getOrder(req, res))
    .delete("/:id", verifyToken(["user", "admin", "owner"]), (req, res) => ordersController.deleteOrder(req, res))

export default router