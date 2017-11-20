import GraphQLDate from 'graphql-date';

import TweetResolver from './tweet-resolvers';

export default {
  Date: GraphQLDate,
  Query: {
    getTweet: TweetResolver.getTweet,
    getTweets: TweetResolver.getTweets
  },
  Mutation: {
    createTweet: TweetResolver.createTweet,
    updateTweet: TweetResolver.updateTweet,
    deleteTweet: TweetResolver.deleteTweet
  }
};
