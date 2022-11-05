import { useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
//import { REGISTER_USER } from "../graphql/mutation/users";
import { gql } from "@apollo/client";

export default function Register() {
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    console.log(values.userName);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          name="userName"
          type="text"
          value={values.userName}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />

        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $userName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      userName
      createdAt
      token
    }
  }
`;
