import express from "express";
import models from "../db/models/index.js"
import multer from "multer";
import dotenv from 'dotenv/config';
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const { Product, Review, User, Category } = models;

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
})