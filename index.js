const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express"); //
const { createServer } = require("http"); //
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");

const { MONGODB } = require("./config");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");

(async function () {
  const app = express();
  const httpServer = createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: "/graphql" }
  );

  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  const PORT = process.env.port || 8080;
  mongoose.connect(MONGODB, { useNewUrlParser: true });
  httpServer.listen(PORT, () => {
    console.log("server running " + PORT);
  });
})();

// const { ApolloServer } = require("apollo-server");
// const mongoose = require("mongoose");

// const typeDefs = require("./graphql/typeDefs");
// const resolvers = require("./graphql/resolvers");
// const { MONGODB } = require("./config.js");

// const PORT = process.env.port || 8080;

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req }),
// });

// mongoose
//   .connect(MONGODB, { useNewUrlParser: true })
//   .then(() => {
//     console.log("MongoDB Connected");
//     return server.listen({ port: PORT });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
