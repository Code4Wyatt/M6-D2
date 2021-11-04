import Product from "./products.js";
import Review from "./reviews.js";
import User from "./user.js";
import Category from "./category.js";
import ProductJoinCategory from "./productCategory.js";

// Products hasMany reviews and reviews belong to products

Product.hasMany(Review, { onDelete: "CASCADE" });  // Will create a productId as the foreign keys for reviews, onDelete: "CASCADE" removes any linked entries to the deleted Product
Review.belongsTo(Product, { onDelete: "CASCADE" }); // Creates reviewId for products

Product.belongsToMany(Category, { through: { model: ProductJoinCategory } }); // Need to study the through function
Category.belongsToMany(Product, { through: { model: ProductJoinCategory, unique: false } });

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

export default { Product, Category, User, Review };