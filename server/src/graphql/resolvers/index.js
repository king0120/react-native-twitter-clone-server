import GraphQLDate from 'graphql-date';

import TweetResolver from './tweet-resolvers';
import UserResolver from './user-resolver';
import User from '../../models/User';

export default {
  Date: GraphQLDate,
  Tweet: {
    user: ({user}) => User.findById(user)
  },
  Query: {
    getTweet: TweetResolver.getTweet,
    getUserTweets: TweetResolver.getUserTweets,
    getTweets: TweetResolver.getTweets,
    me: UserResolver.me
  },
  Mutation: {
    createTweet: TweetResolver.createTweet,
    updateTweet: TweetResolver.updateTweet,
    deleteTweet: TweetResolver.deleteTweet,
    signup: UserResolver.signup,
    login: UserResolver.login
  }
};
