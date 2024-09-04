import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLoginMutation } from "../../services/authApi";

const Login = () => {

  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();
  return (
    <div>
      <h1>LogIn</h1>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values) => {
          login(values);
          if (isError) {
            console.log('yay');
          }
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Username" />
          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />
          <button type="submit">LogIn</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;