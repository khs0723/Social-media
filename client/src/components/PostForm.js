import React, { useState } from "react";
import { Button, Form, Card } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST } from "../graphql/mutation/posts";
import { GET_POSTS } from "../graphql/query/posts";

export default function PostForm() {
  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    body: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addPost, { loading }] = useMutation(CREATE_POST, {
    variables: values,
    // ToDO 게시글 올리면 바로 나오게 캐쉬 조작 아직 안함

    update(proxy, result) {
      console.log("result", result);
    },
    refetchQueries: [{ query: GET_POSTS }],
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.errors
          : {}
      );
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addPost();
  };

  return (
    <>
      <Card fluid>
        <Card.Content>
          <Form onSubmit={onSubmit}>
            <h2>Create a post</h2>
            <Form.Field>
              <Form.Input name="body" onChange={onChange} value={values.body} />
              <Card.Content extra>
                <Button type="submit" primary floated="right">
                  Post
                </Button>
              </Card.Content>
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    </>
  );
}
