import express from "express";
import models from "../db/models/index.js";
const { Category } = models;

const categoryRouter = express.Router();


categoryRouter.route("/").get(async (req, res, next) => {
    try {
        const categories = await Category.findAll({ order: [['id', 'ASC']] });
        res.send(categories);
    } catch (error) {
        console.log(error);
        next(error);
    }
}).post(async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error);
        next(error);
    }
});

categoryRouter.route("/:id").get(async (req, res, next) => {
    try {
        const singleCategory = await Category.findAll({
            where: {
                id: `${req.params.id}`
            }
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}).put(async (req, res, next) => {
    const updatedCategory = await Category.update({ ...req.body }, {
        where: {
            id: `${req.params.id}`
        }
    });
    res.send(updatedCategory)
}).delete(async (req, res, next) => {
    try {
        const deteleCategory = await Category.destroy({
            where: {
                id: `${req.params.id}`
            }
        });
        res.send({ categoryDeletion })
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default categoryRouter;