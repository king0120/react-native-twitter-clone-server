import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.findById(_id);
    } catch (err) {
      throw err;
    }
  },
  getTweets: async (_, args, {user}) => {
    try {
      await requireAuth(user);
      return Tweet.find({}).sort({createdAt: -1});
    } catch (err) {
      throw err;
    }
  },
  createTweet: async (_, args, {user}) => {
    try {
      await requireAuth(user);
      return Tweet.create(args);
    } catch (err) {
      throw err;
    }
  },
  updateTweet: async (_, {_id, ...rest}, {user}) => {
    try {
      await requireAuth(user);
      return Tweet.findByIdAndUpdate(_id, rest, { new: true });
    } catch (error) {
      throw error;
    }
  },
  deleteTweet: async (_, {_id}, {user}) => {
    try {
      await requireAuth(user);
      await Tweet.findByIdAndRemove(_id);
      return {
        message: 'Delete Successful!'
      };
    } catch (err) {
      throw err;
    }
  }
};
