import mongoose from "mongoose";

const tnumberSchema = new mongoose.Schema({
    tnumber: Number
})

const Tnumber = mongoose.model("Tnumber", tnumberSchema, "TableNumberList");

export default Tnumber;