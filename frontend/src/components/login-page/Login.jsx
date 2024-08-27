import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Login = () => {
    return (
        <div>
            <h1>LogIn</h1>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                onSubmit={async (values) => {
                    console.log(values);
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