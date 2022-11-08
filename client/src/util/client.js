import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
//import { HttpLink } from "@apollo/client";

import { setContext } from "apollo-link-context";
const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  // Additional options
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
