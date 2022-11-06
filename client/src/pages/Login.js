import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { LOGIN_USER } from "../graphql/mutation/users";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function Login(props) {
  const navigate = useNavigate();

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const onChange = (e) => {
    console.log(values.userName);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      console.log(userData);
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(
        err && err.graphQLErrors[0]
          ? err.graphQLErrors[0].extensions.errors
          : {}
      );
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          name="userName"
          type="text"
          value={values.userName}
          error={errors.userName ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={onChange}
        />

        <Button type="submit">Login</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
