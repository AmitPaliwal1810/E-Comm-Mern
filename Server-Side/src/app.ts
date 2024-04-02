import bodyParser from "body-parser";
import { CustomeError } from "./commonInterfaces";
import { Request, Response, NextFunction } from "express";
import { authenticationRoutes, productOperationRoutes, userRoutes } from "./Routes";

const express = require("express");
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// unauthorized routes (don't need token)
app.use(authenticationRoutes);

// authorized routes (need token)
app.use(userRoutes);
app.use(productOperationRoutes)

app.use(
  (error: CustomeError, req: Request, res: Response, next: NextFunction) => {
    if (error.status && error.status !== 500) {
      res.status(error.status).send(error);
      return;
    }
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
);

app.listen(PORT, () => {
  console.log(`PORT is running on ${PORT}`);
});
