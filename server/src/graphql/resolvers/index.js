import TweetResolver from './tweet-resolvers';

export default {
  Query: {
    getTweets: TweetResolver.getTweets
  }
};
