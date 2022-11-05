import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query {
    getPosts {
      id
      body
      createdAt
      userName
      commentCount
      likeCount
      comments {
        id
        body
      }
      likes {
        userName
      }
    }
  }
`;

export { GET_POSTS };
