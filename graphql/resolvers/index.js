const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentResolvers = require("./comment");

module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
