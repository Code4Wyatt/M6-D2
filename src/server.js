import express from "express";

import cors from "cors";

import listEndpoints from "express-list-endpoints";

import productsRouter from "../src/services/products/index.js";

import reviewsRouter from "../src/services/reviews/index.js";

import categoryRouter from "./services/categories/index.js";

import usersRouter from "./services/users/users.js";

import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

import { parseFile, uploadFile } from "../src/utils/upload/index.js";
import { connectDB, testConnection } from "../db/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");

const whitelist = [process.env.FE_LOCAL_URL, process.env.FE_PROD_URL];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Current origin: ", origin);
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error({ status: 500, message: "CORS ERROR" }));
    }
  },
};

const server = express();

const PORT = 5001;

server.use(cors(corsOptions));

server.use(express.json());

server.use(express.static(publicDirectory));

server.use("/products", productsRouter);

server.use("/reviews", reviewsRouter);

server.use("/category", categoryRouter);

server.use("/users", usersRouter);

server.use(notFound);

server.use(forbidden);

server.use(catchAllErrorHandler);

console.log(listEndpoints(server));

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  await testConnection();
  await connectDB();
});
  

server.on("error", (error) =>
  console.log(`Server is not running due to : ${error}`)
);
