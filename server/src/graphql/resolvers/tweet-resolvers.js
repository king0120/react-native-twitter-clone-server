import Tweet from '../../models/Tweet'
import { requireAuth } from '../../services/auth'
import { pubsub } from '../../config/pubsub'

export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      return Tweet.findById(_id)
    } catch (err) {
      throw err
    }
  },
  getUserTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user)
      return Tweet.find({ user: user._id }).sort({ createdAt: -1 })
    } catch (err) {
      throw err
    }
  },
  getTweets: async (_, args, { user }) => {
    try {

      // await requireAuth(user)
      return Tweet.find({}).sort({ createdAt: -1 })
    } catch (err) {
      throw err
    }
  },
  createTweet: async (_, args, { user }) => {
    try {
      await requireAuth(user)
      const tweet = await Tweet.create({ ...args, user: user._id })

      pubsub.publish('TWEET_ADDED', { 'TWEET_ADDED': tweet })

      return tweet
    } catch (err) {
      throw err
    }
  },
  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      await requireAuth(user)
      const tweet = Tweet.findOne({ _id, user: user._id })
      if (!tweet) {
        throw new Error('Not Found!')
      }

      Object.entries(rest).forEach(([ key, value ]) => {
        tweet[ key ] = value
      })
      return tweet.save()
    } catch (error) {
      throw error
    }
  },
  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      const tweet = Tweet.findOne({ _id, user: user._id })
      if (!tweet) {
        throw new Error('Not Found!')
      }
      await tweet.remove()

      return {
        message: 'Delete Successful!'
      }
    } catch (err) {
      throw err
    }
  },
  tweetAdded: {
    subscribe: () => pubsub.asyncIterator('TWEET_ADDED')
  }
}
