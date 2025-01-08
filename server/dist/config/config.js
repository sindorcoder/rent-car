"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.dotEnvConfig = exports.corsConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
  @configuring : This code is used to configure CORS options.
*/
const allowedOrigins = ["http://example.com", "http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:3001"]; // Add your allowed origins
const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
exports.corsConfig = corsConfig;
/**
    @configuring : This code is used to configure the environment variables .en.
*/
const { config } = dotenv_1.default;
const dotEnvConfig = () => {
    config({ path: '.env' });
};
exports.dotEnvConfig = dotEnvConfig;
/**
    @configuring : This code is used to configure logs
*/
const log = console.log;
exports.log = log;
