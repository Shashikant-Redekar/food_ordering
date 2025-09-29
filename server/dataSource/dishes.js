import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
    id: Number,
    dname: String,
    price: Number
});

const Dish = mongoose.model("Dish", dishSchema,"Dishes");

export default Dish;