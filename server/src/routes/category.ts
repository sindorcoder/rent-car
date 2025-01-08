import express from "express";
import CategoryController from "../controllers/CategoryController";
import { categoryValidation, updateCategoryValidation } from "../validations/category.validation";
import { verifyToken } from "../middlewares/verify-token";

const router = express.Router();
const categoryController = new CategoryController();


router
    .get("/", (req, res) => categoryController.getCategories(req, res))
    .post("/create", verifyToken(["admin", "owner"]), categoryValidation, (req, res) => categoryController.createCategory(req, res))
    .put("/:id", verifyToken(["admin", "owner"]), updateCategoryValidation, (req, res) => categoryController.updateCategory(req, res))
    .delete("/:id", verifyToken(["admin", "owner"]), (req, res) => categoryController.deleteCategory(req, res));


export default router