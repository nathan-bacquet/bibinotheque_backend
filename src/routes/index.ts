import express from "express";
import usersRoutes from "./users";

const routes = express.Router();

routes.get("/", (req, res) => {
    res.status(200).json({ message: "Connected!"});
});
routes.use("/users", usersRoutes);

export default routes;
