import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  id: Number,
  menuName: String,
});

const Menu = mongoose.model("Menu", menuSchema,"MenuList");

export default Menu;

// class mainmenu extends RESTDataSource {

//     getMenuList () {
//         return this.get("menu");
//     }
// }

// export default mainmenu;