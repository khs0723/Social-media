import { useMutation } from "@apollo/react-hooks";
import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { REGISTER_USER } from "../graphql/mutation/users";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function Register(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
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
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          name="userName"
          type="text"
          value={values.userName}
          error={errors.userName ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          //error={errors.email ? true : false}
          onChange={onChange}
        />

        <Form.Input
          label="Password"
          name="password"
          type="password"
          value={values.password}
          //error={errors.password ? true : false}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          //error={errors.confirmPassword ? true : false}
          onChange={onChange}
        />

        <Button type="submit">Register</Button>
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
