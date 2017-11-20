export default`
  scalar Date

  type Status {
    message: String!
  }

  type Auth {
    token: String!
  }

  type Tweet {
    _id: ID!
    text: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    _id: ID!
    email: String!
    username: String
    firstName: String
    lastName: String
    avatar: String
    createdAt: Date!
    updatedAt: Date!
  }

  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
  }
  
  type Mutation {
   createTweet(text: String!): Tweet 
   updateTweet(_id: ID!, text: String): Tweet
   deleteTweet(_id: ID!): Status
   signup(email: String!, fullName: String!, password: String!, avatar: String, username: String): Auth
   login(email: String!, password: String!): Auth
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
