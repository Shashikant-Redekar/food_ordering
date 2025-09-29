import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    index: String,
    dname: String,
    price: Number,
    count: Number
})

const Order = mongoose.model("Order", orderSchema, "OrderList");

export default Order;