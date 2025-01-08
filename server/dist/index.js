"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const chalk_1 = __importDefault(require("chalk"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const cars_1 = __importDefault(require("./routes/cars"));
const category_1 = __importDefault(require("./routes/category"));
const config_1 = require("./config/config");
const server = (0, express_1.default)();
server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
server.use((0, cors_1.default)(config_1.corsConfig));
server.use(express_1.default.json());
server.use((0, morgan_1.default)("dev"));
server.use("/api/users", user_1.default);
server.use("/api/auth", auth_1.default);
server.use("/api/cars", cars_1.default);
server.use("/api/categories", category_1.default);
(0, config_1.dotEnvConfig)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose_1.default.connect(MONGODB_URI)
    .then((() => (0, config_1.log)(chalk_1.default.green("CONNECTION ESTABLISHED WITH MONGO DB "))))
    .catch((err) => (0, config_1.log)(chalk_1.default.red(err.message)));
server.listen(PORT, () => (0, config_1.log)(chalk_1.default.green(`Server is running on ${chalk_1.default.blue.underline.bold(`http://localhost:${PORT}`, MONGODB_URI)}`)));
