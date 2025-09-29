import MainPage from "./Components/mainpage";
import Cart from "./Components/cart";
import Signup from "./Components/signup";
import Login from "./Components/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient ({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({ 
    typePolicies: {
      Dish: {
        keyFields:["_id"],
      }
    }
  }),
})

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
