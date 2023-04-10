import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { usersRoutes, loginRoutes, propertiesRoutes } from "./routers";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("", propertiesRoutes);

app.use(handleErrors);

export default app;
