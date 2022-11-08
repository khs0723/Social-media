import { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../graphql/query/posts";
import { AuthContext } from "../context/auth";

import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_POSTS);
  if (loading) return <p>Loding...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <>
      <Grid columns={1}>
        <Grid.Row>
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm></PostForm>
            </Grid.Column>
          )}
          {data.getPosts.length > 0 ? (
            data.getPosts.map((post) => (
              <Grid.Column style={{ marginTop: "1em" }} key={post.id}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          ) : (
            <p>No Posts</p>
          )}
        </Grid.Row>
      </Grid>
      {/* <PostCard /> */}
    </>
  );
}
