const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { MONGODB } = require("./config");

const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("mongodb connected");
    return server.listen({ port: 8080 });
  })
  .then((res) => {
    console.log("server running");
  });
