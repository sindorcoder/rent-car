"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const category_validation_1 = require("../validations/category.validation");
const router = express_1.default.Router();
const categoryController = new CategoryController_1.default();
router
    .get("/", (req, res) => categoryController.getCategories(req, res))
    .post("/create", category_validation_1.categoryValidation, (req, res) => categoryController.createCategory(req, res))
    .delete("/:id", (req, res) => categoryController.deleteCategory(req, res));
exports.default = router;
