"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const user_validation_1 = require("../validations/user.validation");
const authController = new AuthController_1.default();
const router = express_1.default.Router();
router
    .post("/sign-in", (0, user_validation_1.userValidation)("check"), (req, res) => authController.signIn(req, res))
    .post("/sign-up", (0, user_validation_1.userValidation)("create"), (req, res) => authController.signUp(req, res));
exports.default = router;
