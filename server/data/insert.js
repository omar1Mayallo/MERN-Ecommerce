import _ from "colors";
import connectToDB from "../config/db.js";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import users from "./users.js";
//Models
import Product from "../model/productModel.js";
import Category from "../model/categoryModel.js";
import Subcategory from "../model/subcategoryModel.js";
import User from "../model/userModel.js";
import Review from "../model/reviewModel.js";
import Banner from "../model/bannerModel.js";
import Order from "../model/orderModel.js";
import Coupon from "../model/couponModel.js";

dotenv.config();
connectToDB();

//To use __dirname in es module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);
const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, "utf-8")
);
const subcategories = JSON.parse(
  fs.readFileSync(`${__dirname}/subcategories.json`, "utf-8")
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);
const banners = JSON.parse(
  fs.readFileSync(`${__dirname}/banners.json`, "utf-8")
);

const insertData = async () => {
  try {
    //Clear all data before inserting
    await Product.deleteMany();
    await Category.deleteMany();
    await Subcategory.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Banner.deleteMany();
    await Order.deleteMany();
    await Coupon.deleteMany();

    await Category.insertMany(categories);
    await Subcategory.insertMany(subcategories);
    await Product.insertMany(products);
    await User.create(users, {validateBeforeSave: false});
    // await Review.insertMany(reviews);
    await Banner.insertMany(banners);

    console.log("🟢 Data Inserted 🟢".green.bold);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await Subcategory.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Banner.deleteMany();
    await Order.deleteMany();
    await Coupon.deleteMany();

    console.log("🔴 Data Destroyed 🔴".red.bold);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// node insert.js -d => destroy data
// node insert.js => insert data
if (process.argv[2] === "-d") {
  destroyData();
} else {
  insertData();
}
