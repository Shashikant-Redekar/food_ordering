import  gql from "graphql-tag";

const typeDefs = gql`

type Query {
    menuForResturant : [Menu!]!
    menu(id: Int!): Menu!
    orders: [Orders!]!
}

type Mutation {
    addName (name: String!) : addNameResponse
    addTNumber (tnumber: Int!) : addTnumberResponse
    addOrder ( ordish: OrDishin!) : addOrderResponse
    signup( email: String!, password: String!) : signUpResponse
    login( email: String!, password: String!) : loginResponse
    deleteOrder(index: String!, nameId: ID!, tnumberId: ID!) : deleteResponse
}

type addNameResponse {
    code : Int!
    success : Boolean!
    message : String!
    name : Name!
}

type Name {
    _id : ID!
    name : String!
}

type addTnumberResponse {
    code : Int!
    success : Boolean!
    message : String!
    tnumber : Tnumber!
}

type Tnumber {
    _id : ID!
    tnumber : Int!
}

type addOrderResponse {
    code : Int!
    success : Boolean!
    message : String!
    ordish : OrDish!
}

type OrDish {
    index: String!
    dname: String!
    price: Int!
    count: Int!
}

input OrDishin {
    index: String!
    dname: String!
    price: Int!
    count: Int!
}

type Menu {
    id : Int!
    menuName : String!
    dish: [Dish!]!
}

type Dish {
    _id: ID!
    id : Int!
    dname : String!
    dnameh : String!
    price : Int!
}

type signUpResponse {
    code: Int!
    success: Boolean!
    message: Error
    user: User
}

type loginResponse{
    code: Int!
    success: Boolean!
    message: String!
    token: String
}

type User {
    email: String!
    password: String!
}

type Error {
    email: String
    password: String
}

type Orders {
    name: [ Name!]!
    number: [Tnumber!]!
    order: [OrDish!]!
}

type deleteResponse{
    code: Int!
    success: Boolean!
    message: String!
}
`

export default typeDefs;