import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from './scheme.js';
import resolvers from "./dataSource/resolvers.js";
import mongoose from "mongoose";

const baseURL = "mongodb+srv://Shashikant:lGBjRbIT9zDooCUu@foodordering.ggxgsgt.mongodb.net/SukoonSagar?retryWrites=true&w=majority&appName=FoodOrdering";

mongoose.connect( baseURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then (() => console.log('DB Connected'))
    .catch((err) => console.log(`ERROR!${err.message}`));


async function startApolloServer() {
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,

   });
  const { url } = await startStandaloneServer(server, { context: ({ req, res }) => ({ req, res }),
    listen: {port: 4000},
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }
} );
  console.log(`
    Server is running....
    Query at ${ url }
    `);
}

startApolloServer();