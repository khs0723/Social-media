const { AuthenticationError, UserInputError } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");

const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");

const pubsub = new PubSub();

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },

    async getPost(parent, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(parent, { body }, context) {
      const user = checkAuth(context);
      const newPost = new Post({
        body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      pubsub.publish("NEW_POST", {
        newPost: post,
      });
      return post;
    },

    async deletePost(parent, { postId }, context) {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.userName === post.userName) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async likePost(parent, { postId }, context) {
      const { userName } = checkAuth(context);
      const post = await Post.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.userName === userName)) {
          // Post is already liked, unlike it
          post.likes = post.likes.filter((like) => like.userName !== userName);
          await post.save();
        } else {
          // not liked, like it
          post.likes.push({
            userName,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not fount");
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
