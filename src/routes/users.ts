import express from "express";
import userController from "../controllers/usersController";
const routes = express.Router();

routes.get("/", userController.all);
routes.post("/auth", userController.validateAuth(), userController.auth);
routes.post("/", userController.validateRegister(), userController.register);

export default routes;
