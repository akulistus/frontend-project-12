import React from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../services/authApi";
import { setToken } from "../../slices/authSlice";

import { Formik } from 'formik';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isError }] = useLoginMutation();

  return (
    <div>
      <h1>LogIn</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values) => {
          const response = await login(values).unwrap();
          dispatch(setToken(response));
          navigate('/');
        }}
      > 
        {props => (
          <Form noValidate onSubmit={props.handleSubmit}>
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              name="username" 
              placeholder="Username"
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={isError}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              name="password" 
              placeholder="password"
              value={props.values.password}
              onChange={props.handleChange}
              isInvalid={isError}
            />
            <Form.Control.Feedback type="invalid">Неправильный логин или пароль</Form.Control.Feedback>
            <Button type="submit">LogIn</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;