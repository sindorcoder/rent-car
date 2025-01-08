"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const user_validation_1 = require("../validations/user.validation");
const router = express_1.default.Router();
const userContoller = new UserController_1.default();
router
    .get("/", (req, res) => userContoller.getUsers(req, res))
    .post("/create", (0, user_validation_1.userValidation)("create"), (req, res) => userContoller.createUser(req, res))
    .get("/:id", (req, res) => userContoller.getUser(req, res))
    .delete("/:id", (req, res) => userContoller.deleteUser(req, res));
exports.default = router;
