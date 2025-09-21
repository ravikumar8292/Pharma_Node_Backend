import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import routes from "./src/routes/index.js";
// import { errorHandler } from "./src/middlewares/errorHandler.js";
import setupSwagger from "./src/swagger.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);


export default app;