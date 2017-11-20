export default`
  type Tweet {
    _id: ID!
    text: String!
  }

  type Query {
    getTweet(_id: ID!): Tweet
    getTweets: [Tweet]
  }
  
  type Mutation {
    
  }

  schema {
    query: Query
  }
`;
