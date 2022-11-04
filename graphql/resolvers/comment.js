const Post = require("../../models/Post");
const checkAuth = require("../../util/check-auth");
const { UserInputError, AuthenticationError } = require("apollo-server");

//post, user 랑 다르게 arrow 펑션으로 짜볼거야
module.exports = {
  Mutation: {
    createComment: async (parent, { postId, body }, context) => {
      const { userName } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: {
            body: "Comment body must not empty",
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          userName,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },
    async deleteComment(parent, { postId, commentId }, context) {
      const { userName } = checkAuth(context);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].userName === userName) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action now allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};
