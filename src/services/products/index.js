import express from "express";
import models from "../../db/models/index.js";
import Review from "../../db/models/Review.js";
import { authors } from "../../data/authors.js";
const { Product, Review } = models;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({
        include: { model: Product, include: Review },
      });
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await Product.bulkCreate(products);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      delete req.body.email;
      delete req.body.id;
      const newProduct = await Product.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.send(newProduct[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const productRows = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ productRows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;