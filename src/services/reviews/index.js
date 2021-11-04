import express from "express";
import models from "../../db/models/index.js";
import { articles } from "../../data/articles.js";
const { Review, Product, ArticleCategory, Category } = models;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll({
        include: [{ model: Category, through: { attributes: [] } }, Product],
        //   order: [["createdAt", "DESC"]],
      });
      res.send(reviews);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { categories, ...rest } = req.body;
      const newReview = await Review.create(rest);

      //assign one category
      // await ArticleCategory.create({
      //   categoryId: req.body.categoryId,
      //   articleId: newArticle.id,
      // });

      //assign multiple
      const valuesToInsert = categories.map((category) => ({
        categoryId: category,
        reviewId: newReview.id, 
      }));
      console.log({ valuesToInsert });

      await ReviewCategory.bulkCreate(valuesToInsert);

      res.send(newReview);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/:reviewId/categories").post(async (req, res, next) => {
  try {
    const { categories } = req.body;
    const values = categories.map((category) => ({
      categoryId: category,
      reviewId: req.params.reviewId,
    }));
    console.log({ values });
    const data = await ArticleCategory.bulkCreate(values);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await Review.bulkCreate(reviews);
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
      const review = await Review.findByPk(req.params.id);
      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedReview = await Review.update(req.body, {
        where: {
          id: req.params.id,
        },
        returning: true,
      });
      res.send(updatedReview);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Review.destroy({  // use .destroy to remove from db
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;