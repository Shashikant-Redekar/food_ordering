import MainPage from "./Components/mainpage";
import Cart from "./Components/cart";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Orders from "./Components/orders";
import ProtectedRoute from "./Components/protectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useState } from "react";

function App() {

const httpLink = createHttpLink ({
  uri : "http://localhost:4000"
});

const [ token, setToken ] = useState(localStorage.getItem("jwt")|| "");

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient ({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ 
    typePolicies: {
      Dish: {
        keyFields:["_id"],
      }
    }
  }),
})

  return (
    <ApolloProvider client={client}>
        <Router>
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setToken={ setToken }/>} />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App;
