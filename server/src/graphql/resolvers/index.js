import TweetResolver from './tweet-resolvers';

export default {
  Query: {
    getTweet: TweetResolver.getTweet,
    getTweets: TweetResolver.getTweets
  }
};
