import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from './scheme.js';
import resolvers from "./dataSource/resolvers.js";
import mongoose from "mongoose";
import pkg from "jsonwebtoken";
const { verify } = pkg;

const baseURL = "mongodb+srv://Shashikant:lGBjRbIT9zDooCUu@foodordering.ggxgsgt.mongodb.net/SukoonSagar?retryWrites=true&w=majority&appName=FoodOrdering";
const JWT_SECRET = "Shashikant";

mongoose.connect( baseURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then (() => console.log('DB Connected'))
    .catch((err) => console.log(`ERROR!${err.message}`));


async function startApolloServer() {
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
   });

   const corsOperations = {
    origin: "http://localhost:5173",
    credentials: true
   };

  const { url } = await startStandaloneServer(server, {

    context: async ({ req }) => {
      // Get token from headers
      const authHeader = req.headers.authorization || "";
      const token = authHeader.replace("Bearer ", "");

      if (!token) return { user: null };

      try {
        const user = verify(token, JWT_SECRET);
        return { user };
      } catch (err) {
        console.log("Invalid token:", err.message);
        return { user: null };
      }
    },
    cors: corsOperations,
} );

  console.log(`
    Server is running....
    Query at ${ url }
    `);
}

startApolloServer();