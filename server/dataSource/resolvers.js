import Menu from "./menulist.js";
import Dish from "./dishes.js";
import Name from "./addName.js";
import Tnumber from "./addTNumber.js";
import Order from "./addOrder.js";
import User from "./userSchema.js";
import { hash,genSalt,compare } from "bcrypt";
import pkg from "jsonwebtoken";
const { sign } = pkg;

const handleError = (err) => {
    let error = { email:"", password:"" }

    if(err.code === 11000){
        error.email = "That email is already registered";
    }

    if (err.message.includes("User validation failed")){
        Object.values(err.errors).forEach(properties =>{
            error[properties.path] = properties.message;
        })
    }
    return error;
}

const resolvers = {

     Query: {
        menuForResturant: async () => {
            return await Menu.find().sort({ id: 1});  // fetches all menus from MongoDB
        },
        menu: async (_, { id }) => {
            return await Menu.findOne({ id })
        },
        orders: async (_,__,{ user }) => {
            if(!user){
                throw new Error("Not authenticated");
            }
            const name = await Name.find();
            const tnumber = await Tnumber.find();
            const orders = await Order.find();
            return[
                {
                    name: name,
                    number: tnumber,
                    order: orders
                }
            ]
        }
    },

    Menu: {
        dish: async ({ id }) => {
            return await Dish.find({ id })
        }
    },

    Mutation: {
        async addName (_, { name }) {
            try {
                const newName = await Name.create({ name });

                return{
                    code : 200,
                    success : true,
                    message : "Name loaded Successfully",
                    name : newName
                };
            } catch(err){
                return{
                    code : err.extensions.response.status,
                    success : false,
                    message : err.extensions.response.body,
                    name : null
                }
            }
        },
        async addTNumber (_, { tnumber }) {
            try {
                const newtnumber = await Tnumber.create({ tnumber });

                return{
                    code: 200,
                    success: true,
                    message: "Table Number Added Successfully",
                    tnumber: newtnumber
                };
            } catch(err){
                return{
                    code : err.extensions.response.status,
                    success : false,
                    message : err.extensions.response.body,
                    name : null
                };
            }
        },
        async addOrder (_, { ordish }) {
            try {
                const newOrder = await Order.create({ 
                    index: ordish.index,
                    dname: ordish.dname,
                    price: ordish.price,
                    count: ordish.count
                 });

                return{
                    code : 200,
                    success : true,
                    message : "Order of Dish placed successfully",
                    ordish : {
                        index: newOrder.index,
                        dname: newOrder.dname,
                        price: newOrder.price,
                        count: newOrder.count
                    }
                }
            } catch(err){
                return{
                    code : err.extensions.response.status,
                    success : false,
                    message : err.extensions.response.body,
                    ordish : null
                };
            }
        },
        async signup ( _, { email, password }) {

            try{

                if(password.length < 7){
                    return{
                        code: 400,
                        success: false,
                        message: {error:'',password:"password length must be greater than 7 charecters"},
                        user: null
                    }
                }

                const salt = await genSalt();
                const hashedPassword = await hash(password, salt);
                const newUser = await User.create({ email,password: hashedPassword })

                return{
                    code: 201,
                    success: true,
                    message: "User created successfully.",
                    user: newUser
                }
            }catch(err){
                const error = handleError(err);
                return{
                    code : 400,
                    success : false,
                    message : error,
                    user : null
                }
            }
        },
        async login ( _, { email,password }, { res }) {
            try {
                const foundUser = await User.findOne({ email });

                if(foundUser){
                    const PasswordMatch = await compare(password, foundUser.password)
                    
                    if(PasswordMatch){

                        const JWT_SEC = "Shashikant"
                        const token = sign({email: foundUser.email}, JWT_SEC, {
                            expiresIn:"1hr"
                        });

                    // res.setHeader(
                    // 'Set-Cookie',
                    // `token=${token}; Path=/; Max-Age=3600; SameSite=Lax`
                    // );

                        return {
                            code: 200,
                            success: true,
                            message: "login Successful",
                            token: token
                        }
                    } else {
                        return {
                            code: 401,
                            success: false,
                            message: "Incorrect Password",
                            token: null
                        }
                    }
                } else {
                    return {
                        code: 404,
                        success: false,
                        message: "User not found",
                        token: null
                    }
                }
            } catch (err) {
                return {
                    code: 500,
                    success: false,
                    message: "Internal Server Error!!",
                    token: null
                }
            }
        }
    }
};

export default resolvers;