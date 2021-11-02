import express from "express";

import fs from "fs";

import uniqid from "uniqid";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

import { parseFile, uploadFile } from "../../utils/upload/index.js";

// import {
//   checkBlogPostSchema,
//   checkCommentSchema,
//   checkSearchSchema,
//   checkValidationResult,
// } from "./validation.js";

import { productsFilePath } from "../../utils/upload/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const productsRouter = express.Router();


// post products
productsRouter.post(
  "/", async (req, res, next) => {
    try {
      const product = {
        id: uniqid(),
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const fileAsBuffer = fs.readFileSync(productsFilePath);

      const fileAsString = fileAsBuffer.toString();

      const fileAsJSONArray = JSON.parse(fileAsString);

      fileAsJSONArray.push(product);

      fs.writeFileSync(productsFilePath, JSON.stringify(fileAsJSONArray));

      res.send(product);
    } catch (error) {
      res.send({ message: error.message });
    }
  }
);

// get products

productsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(productsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// delete product

//  update media
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(productsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    const mediaIndex = fileAsJSONArray.findIndex(
      (media) => media.id === req.params.id
    );
    if (!mediaIndex == -1) {
      res
        .status(404)
        .send({ message: `media with ${req.params.id} is not found!` });
    }
    const previousmediaData = fileAsJSONArray[mediaIndex];
    const changedmedia = {
      ...previousmediaData,
      ...req.body,
      updatedAt: new Date(),
      id: req.params.id,
    };
    fileAsJSONArray[mediaIndex] = changedmedia;

    fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray));
    res.send(changedmedia);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});


export default productsRouter;