import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define(
    "product",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,  // url will be text datatype
            allowNull: false,
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
        
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });

export default Product;