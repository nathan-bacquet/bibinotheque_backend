import express from "express";
import e = require("express");
import NextFunction = e.NextFunction;
import Request = e.Request;
import Response = e.Response;

let router = express.Router();

/* GET home page. */
//noinspection JSUnusedLocalSymbols
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json(["Hello Worldf"]);
});

export default router;
