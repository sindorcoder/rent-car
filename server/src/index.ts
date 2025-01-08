import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import chalk from 'chalk';
import User from "./routes/user";
import Auth from "./routes/auth";
import Cars from "./routes/cars";
import Category from "./routes/category";
import Upload from "./routes/upload";
import Orders from "./routes/orders";
import { corsConfig, dotEnvConfig, log } from "./config/config";


const server = express();


server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

dotEnvConfig();

server.use(cors(corsConfig));
server.use(express.json());
server.use(morgan("dev"));
server.use("/api/users", User);
server.use("/api/auth", Auth);
server.use("/api/cars", Cars)
server.use("/api/categories", Category)
server.use("/api/upload", Upload)
server.use("/api/orders", Orders)


const PORT = process.env.PORT || 8000 as number;
const MONGODB_URI = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI)
    .then((() => log(chalk.green("CONNECTION ESTABLISHED WITH MONGO DB "))))
    .catch((err) => log(chalk.red(err.message)));

server.listen(PORT, () => log(chalk.green(`Server is running on ${chalk.blue.underline.bold(`http://localhost:${PORT}`, MONGODB_URI)}`)));